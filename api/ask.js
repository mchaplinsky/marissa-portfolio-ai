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
            content: portfolioContext,
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

    const answer =
  data.output?.[0]?.content?.[0]?.text ||
  "Sorry, I couldn't generate an answer.";

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("ASK_API_ERROR", error);
    return res.status(500).json({
      error: String(error),
    });
  }
}
