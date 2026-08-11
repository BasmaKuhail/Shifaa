import type { NextApiRequest, NextApiResponse } from "next";

type SmartSearchResponse = {
  searchQuery?: string;
  error?: string;
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-4o-mini";

const systemPrompt = `
You convert medicine search input into the best English search term for a database.
The database contains English scientific and trade medicine names.

Return JSON only, with this exact shape: {"searchQuery":"..."}

Rules:
- Translate Arabic medicine names, brand names, and medicine-related phrases into English.
- Correct obvious spelling mistakes and Arabic/English transliteration mistakes.
- Preserve the medicine name and remove unrelated words such as "medicine", "drug", or "I want".
- If the input is already a valid English medicine name, keep it unchanged.
- Do not explain your answer and do not return markdown.
`.trim();

function getInput(body: unknown) {
  if (!body || typeof body !== "object") {
    return "";
  }

  const input = (body as { input?: unknown }).input;
  return typeof input === "string" ? input.trim().slice(0, 200) : "";
}

function extractSearchQuery(content: unknown) {
  if (typeof content !== "string") {
    return "";
  }

  const cleaned = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");

  try {
    const parsed = JSON.parse(cleaned) as { searchQuery?: unknown };
    return typeof parsed.searchQuery === "string"
      ? parsed.searchQuery.trim().slice(0, 200)
      : "";
  } catch {
    return "";
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SmartSearchResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const input = getInput(req.body);
  if (!input) {
    return res.status(400).json({ error: "Search input is required" });
  }

  const apiKey =
    process.env.SMART_SEARCH_OPERN_ROUTER_KEY 

  if (!apiKey) {
    return res.status(500).json({ error: "Smart search is not configured" });
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": req.headers.origin || "http://localhost:3000",
        "X-Title": "Shifaa Smart Medicine Search",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input },
        ],
      }),
    });

    if (!response.ok) {
      console.error("OpenRouter smart search error:", await response.text());
      return res.status(502).json({ error: "Smart search failed" });
    }

    const data = await response.json();
    const searchQuery = extractSearchQuery(data?.choices?.[0]?.message?.content);

    if (!searchQuery) {
      return res.status(502).json({ error: "Smart search returned no query" });
    }

    return res.status(200).json({ searchQuery });
  } catch (error) {
    console.error("Smart medicine search error:", error);
    return res.status(500).json({ error: "Smart search failed" });
  }
}
