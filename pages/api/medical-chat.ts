import type { NextApiRequest, NextApiResponse } from "next";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  answer?: string;
  error?: string;
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-4o-mini";

const systemPrompt = `
You are Shifaa's medical support AI assistant.
Answer only medical, medicine, pharmacy, symptoms, health, wellness, first-aid, and healthcare access questions.
Use the previous chat messages as context. Do not treat each message as a new conversation.
Reply in the same language as the user's latest message. If the latest message is in English, reply in clear English. If it is in Arabic, reply in Arabic.
If the user asks about anything outside the medical context, politely say in the user's language that you cannot answer that type of question because you only answer medical questions.
When answering a medical question:
- Be helpful, careful, and concise.
- Do not claim to diagnose, prescribe, or replace a clinician.
- Recommend urgent medical care for red-flag symptoms or emergencies.
- Always clearly mention in the response language that you are an AI assistant, your answer may contain errors, and it is best to contact a real medical specialist.
Do not store or request unnecessary personal information.
`.trim();

function normalizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const maybeMessage = message as Partial<ChatMessage>;
      return (
        (maybeMessage.role === "user" || maybeMessage.role === "assistant") &&
        typeof maybeMessage.content === "string" &&
        maybeMessage.content.trim().length > 0
      );
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 2000),
    }));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPEN_ROUTE_AI_KEY || process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "OpenRouter API key is not configured" });
  }

  const messages = normalizeMessages(req.body?.messages);

  if (!messages.some((message) => message.role === "user")) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": req.headers.origin || "http://localhost:3000",
        "X-Title": "Shifaa Medical Support",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
        temperature: 0.2,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", errorText);
      return res.status(502).json({ error: "Unable to get an AI response" });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content;

    if (typeof answer !== "string" || !answer.trim()) {
      return res.status(502).json({ error: "AI response was empty" });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
