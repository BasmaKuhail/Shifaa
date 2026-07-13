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
Choose the response language from the user's latest message, not from earlier chat history.
If the user's latest message is clearly in English, reply in clear English.
Otherwise, reply in Arabic.
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

function getLatestUserMessage(messages: ChatMessage[]) {
  return [...messages].reverse().find((message) => message.role === "user");
}

function isClearlyEnglish(content: string) {
  const englishLetters = content.match(/[A-Za-z]/g)?.length ?? 0;
  const arabicLetters = content.match(/[\u0600-\u06FF]/g)?.length ?? 0;

  return englishLetters > 0 && englishLetters >= arabicLetters * 2;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "طريقة الطلب غير مسموحة" });
  }

  const apiKey = process.env.OPEN_ROUTE_AI_KEY || process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "خدمة المساعد الطبي غير مهيأة حالياً" });
  }

  const messages = normalizeMessages(req.body?.messages);
  const latestUserMessage = getLatestUserMessage(messages);

  if (!latestUserMessage) {
    return res.status(400).json({ error: "يرجى كتابة رسالة قبل الإرسال" });
  }

  const responseLanguagePrompt = isClearlyEnglish(latestUserMessage.content)
    ? "The user's latest message is in English. You must answer in English, even if previous messages are Arabic."
    : "The user's latest message is not clearly English. You must answer in Arabic.";

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
        messages: [
          { role: "system", content: systemPrompt },
          { role: "system", content: responseLanguagePrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", errorText);
      return res.status(502).json({ error: "تعذر الحصول على رد من المساعد الطبي" });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content;

    if (typeof answer !== "string" || !answer.trim()) {
      return res.status(502).json({ error: "لم يصل رد واضح من المساعد الطبي" });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "حدث خطأ في الخادم، حاول مرة أخرى" });
  }
}

