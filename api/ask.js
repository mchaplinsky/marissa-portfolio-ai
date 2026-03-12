import OpenAI from "openai";
import { getPortfolioContext } from "../portfolioContext.js";
import { matchProjects } from "../matchProjects.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractJson(text) {
  if (!text || typeof text !== "string") return null;

  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch {}

  const fencedMatch = trimmed.match(/```json\s*([\s\S]*?)\s*```/i);
  if (fencedMatch?.[1]) {
    try {
      return JSON.parse(fencedMatch[1]);
    } catch {}
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    } catch {}
  }

  return null;
}

function normalizeFormat(format, fallbackAnswer = "") {
  if (!format || typeof format !== "object") {
    return {
      intro: fallbackAnswer || "",
      bullets: [],
      closing: "",
    };
  }

  return {
    intro:
      typeof format.intro === "string" ? format.intro : fallbackAnswer || "",
    bullets: Array.isArray(format.bullets)
      ? format.bullets.filter((item) => typeof item === "string").slice(0, 6)
      : [],
    closing: typeof format.closing === "string" ? format.closing : "",
  };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body ?? {};

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "A question is required." });
    }

    const portfolioContext = getPortfolioContext();
    const relatedProjects = matchProjects(question);

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: `
You are an AI assistant for Marissa Chaplinsky's portfolio.

Use only the portfolio knowledge below to answer.
If the answer is not clearly supported by the knowledge base, say that directly instead of guessing.

Keep answers:
- clear
- warm
- concise
- specific
- grounded in Marissa's actual work

Prioritize these themes when relevant:
- AI product design
- complex systems
- enterprise and operational platforms
- healthcare and government experience
- research-driven design
- cross-functional collaboration

Return ONLY valid JSON.
Do not use markdown.
Do not wrap in backticks.
Do not add any text before or after the JSON.

Use exactly this shape:
{
  "answer": "string",
  "format": {
    "intro": "string",
    "bullets": ["string", "string", "string"],
    "closing": "string"
  },
  "suggestedQuestions": ["string", "string", "string"]
}

Formatting rules:
- "answer" should be the full plain-language answer
- "format.intro" should be a short opening sentence when helpful
- "format.bullets" should contain the main scannable points when the answer has multiple ideas
- "format.closing" should be a short wrap-up sentence only if needed
- prefer bullets for experience, projects, skills, industries, strengths, process, and collaboration
- use a short paragraph only when the answer is naturally brief
- keep bullets concise and easy to scan
- do not invent facts outside the portfolio knowledge base

Rules:
- "suggestedQuestions" must contain exactly 3 short follow-up questions
- each suggested question should be relevant to the user's last question

Portfolio Knowledge Base:
${portfolioContext}
          `,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const rawText = response.output_text || "";
    const parsed = extractJson(rawText);

    if (!parsed) {
      const fallbackAnswer =
        rawText || "Sorry, I couldn't generate a response.";

      return res.status(200).json({
        answer: fallbackAnswer,
        format: {
          intro: fallbackAnswer,
          bullets: [],
          closing: "",
        },
        suggestedQuestions: [],
        relatedProjects,
      });
    }

    const safeAnswer =
      typeof parsed.answer === "string" && parsed.answer.trim()
        ? parsed.answer
        : "Sorry, I couldn't generate a response.";

    return res.status(200).json({
      answer: safeAnswer,
      format: normalizeFormat(parsed.format, safeAnswer),
      suggestedQuestions: Array.isArray(parsed.suggestedQuestions)
        ? parsed.suggestedQuestions
            .filter((item) => typeof item === "string")
            .slice(0, 3)
        : [],
      relatedProjects,
    });
  } catch (error) {
    console.error("Ask API error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
