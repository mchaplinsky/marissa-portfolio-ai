import { portfolioContext } from "../portfolioContext.js";

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

    const openaiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: `
You are an AI assistant for Marissa Chaplinsky's portfolio.

Use only the portfolio context below to answer.
Then generate exactly 4 short follow-up questions that are specific to the user's question and your answer.

Return your output as valid JSON only in this format:
{
  "answer": "string",
  "followUpSuggestions": [
    "string",
    "string",
    "string",
    "string"
  ]
}

Rules:
- Do not invent facts.
- Keep the answer concise, polished, and recruiter-friendly.
- Make follow-up questions specific and useful.
- Follow-up questions should sound natural and help a recruiter explore relevant experience.
- Return JSON only. No markdown.

Portfolio context:
${portfolioContext}
            `,
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const raw = await openaiRes.text();

    if (!openaiRes.ok) {
      console.error("OPENAI_RAW_ERROR", raw);
      return res.status(openaiRes.status).json({
        error: raw,
      });
    }

    const data = JSON.parse(raw);
    const text = data.output_text || "";

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("JSON_PARSE_ERROR", text);
      return res.status(500).json({
        error: "Could not parse AI response JSON.",
      });
    }

    return res.status(200).json({
      answer: parsed.answer || "Sorry, I couldn't generate an answer.",
      followUpSuggestions: Array.isArray(parsed.followUpSuggestions)
        ? parsed.followUpSuggestions.slice(0, 4)
        : [],
    });
  } catch (error) {
    console.error("ASK_API_ERROR", error);
    return res.status(500).json({
      error: String(error),
    });
  }
}
