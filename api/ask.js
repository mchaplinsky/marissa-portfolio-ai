import OpenAI from "openai";
import { getPortfolioContext } from "../portfolioContext.js";

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
  "suggestedQuestions": ["string", "string", "string"]
}

Rules:
- "answer" must be a plain string
- "suggestedQuestions" must contain exactly 3 short follow-up questions
- each suggested question should be relevant to the user's last question
- do not invent facts outside the portfolio knowledge base

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

    const rawText =
      response.output_text || "";

    const parsed = extractJson(rawText);

    if (!parsed) {
      return res.status(200).json({
        answer: rawText || "Sorry, I couldn't generate a response.",
        suggestedQuestions: [],
      });
    }

    return res.status(200).json({
      answer:
        typeof parsed.answer === "string"
          ? parsed.answer
          : "Sorry, I couldn't generate a response.",
      suggestedQuestions: Array.isArray(parsed.suggestedQuestions)
        ? parsed.suggestedQuestions.slice(0, 3)
        : [],
    });
  } catch (error) {
    console.error("Ask API error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
