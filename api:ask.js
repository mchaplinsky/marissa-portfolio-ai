import OpenAI from "openai";
import { getPortfolioContext } from "../portfolioContext.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const answer =
      response.output_text || "Sorry, I couldn't generate a response.";

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Ask API error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
