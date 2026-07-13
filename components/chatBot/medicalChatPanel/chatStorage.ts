import { ChatMessage } from "./types";

const chatStorageKeyPrefix = "shifaa-medical-chat-v2";

export const introMessage: ChatMessage = {
  role: "assistant",
  content:
    "مرحباً، أنا مساعد ذكاء اصطناعي للإجابة عن الأسئلة الطبية فقط. يمكنني فهم العربية والإنجليزية. قد تحتوي إجاباتي على أخطاء، لذلك من الأفضل التواصل مع مختص طبي حقيقي، خصوصاً في الحالات العاجلة.",
};

export function getChatStorageKey(userId: number) {
  return `${chatStorageKeyPrefix}-${userId}`;
}

function isChatMessage(message: unknown): message is ChatMessage {
  if (!message || typeof message !== "object") {
    return false;
  }

  const maybeMessage = message as Partial<ChatMessage>;
  return (
    (maybeMessage.role === "user" || maybeMessage.role === "assistant") &&
    typeof maybeMessage.content === "string" &&
    maybeMessage.content.trim().length > 0
  );
}

export function loadStoredMessages(storageKey: string): ChatMessage[] {
  if (typeof window === "undefined") {
    return [introMessage];
  }

  try {
    const storedMessages = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (!Array.isArray(storedMessages)) {
      return [introMessage];
    }

    const validMessages = storedMessages.filter(isChatMessage);
    return validMessages.length > 0 ? validMessages : [introMessage];
  } catch {
    return [introMessage];
  }
}

