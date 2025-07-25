// src/app/api/hint/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { message, code = "" } = await req.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Missing or invalid message" }, { status: 400 });
  }

  try {
    const prompt = `
You are a helpful JavaScript tutor. A user is working on the following code:

${code || "(No code provided)"}

They asked:
${message}

Give them a concise, clear explanation or a helpful hint.
`;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: "user", content: prompt }],
    });

    const reply = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn’t generate a helpful hint.";
    return NextResponse.json({ answer: reply });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: "Failed to fetch hint" }, { status: 500 });
  }
}
