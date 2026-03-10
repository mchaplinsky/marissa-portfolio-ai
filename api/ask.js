{\rtf1\ansi\ansicpg1252\cocoartf2758
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww17500\viewh15540\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import OpenAI from "openai";\
import \{ portfolioContext \} from "../portfolioContext.js";\
\
const openai = new OpenAI(\{\
  apiKey: process.env.OPENAI_API_KEY,\
\});\
\
export default async function handler(req, res) \{\
  if (req.method !== "POST") \{\
    return res.status(405).json(\{ error: "Method not allowed" \});\
  \}\
\
  try \{\
    const \{ question \} = req.body ?? \{\};\
\
    if (!question || typeof question !== "string") \{\
      return res.status(400).json(\{ error: "A question is required." \});\
    \}\
\
    const completion = await openai.chat.completions.create(\{\
      model: "gpt-4o-mini",\
      temperature: 0.4,\
      messages: [\
        \{\
          role: "system",\
          content: portfolioContext,\
        \},\
        \{\
          role: "user",\
          content: question,\
        \},\
      ],\
    \});\
\
    const answer =\
      completion.choices?.[0]?.message?.content?.trim() ||\
      "Sorry, I couldn't generate an answer.";\
\
    return res.status(200).json(\{ answer \});\
  \} catch (error) \{\
    console.error("ASK_API_ERROR", error);\
    return res.status(500).json(\{\
      error: "Something went wrong while generating the answer.",\
    \});\
  \}\
\}}
