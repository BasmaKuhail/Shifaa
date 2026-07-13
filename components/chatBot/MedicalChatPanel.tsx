import { FormEvent, useEffect, useRef, useState } from "react";
import { User } from "@/types/UserType";
import MedicalChatComposer from "./medicalChatPanel/MedicalChatComposer";
import MedicalChatHeader from "./medicalChatPanel/MedicalChatHeader";
import MedicalChatMessageList from "./medicalChatPanel/MedicalChatMessageList";
import { getChatStorageKey, loadStoredMessages } from "./medicalChatPanel/chatStorage";
import { ChatMessage } from "./medicalChatPanel/types";

type Props = {
  user: User;
  onClose: () => void;
};

function getArabicErrorMessage(message: string, fallback: string) {
  const normalizedMessage = message.trim().toLowerCase();

  if (!normalizedMessage) {
    return fallback;
  }

  if (
    normalizedMessage.includes("api key") ||
    normalizedMessage.includes("configured")
  ) {
    return "خدمة المساعد الطبي غير مهيأة حالياً";
  }

  if (
    normalizedMessage.includes("message is required") ||
    normalizedMessage.includes("required")
  ) {
    return "يرجى كتابة رسالة قبل الإرسال";
  }

  if (
    normalizedMessage.includes("unable to get") ||
    normalizedMessage.includes("empty") ||
    normalizedMessage.includes("ai response")
  ) {
    return "تعذر الحصول على رد من المساعد الطبي";
  }

  if (
    normalizedMessage.includes("unexpected") ||
    normalizedMessage.includes("server")
  ) {
    return "حدث خطأ في الخادم، حاول مرة أخرى";
  }

  return /[\u0600-\u06FF]/.test(message) ? message : fallback;
}

function getMessagesForRequest(messages: ChatMessage[]) {
  const firstUserMessageIndex = messages.findIndex(
    (message) => message.role === "user"
  );

  if (firstUserMessageIndex === -1) {
    return [];
  }

  return messages.slice(firstUserMessageIndex);
}

export default function MedicalChatPanel({ user, onClose }: Props) {
  const chatStorageKey = getChatStorageKey(user.id);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    loadStoredMessages(chatStorageKey)
  );
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [copiedMessageKey, setCopiedMessageKey] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(chatStorageKey, JSON.stringify(messages.slice(-30)));
  }, [chatStorageKey, messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  useEffect(() => {
    if (!copiedMessageKey) return;

    const copiedTimer = window.setTimeout(() => {
      setCopiedMessageKey("");
    }, 1600);

    return () => window.clearTimeout(copiedTimer);
  }, [copiedMessageKey]);

  const copyMessage = async (content: string, messageKey: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageKey(messageKey);
    } catch {
      setError("تعذر نسخ الرسالة");
    }
  };

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = input.trim();

    if (!content || isSending) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/medical-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: getMessagesForRequest(nextMessages),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.answer) {
        throw new Error(
          getArabicErrorMessage(data.error || "", "تعذر إرسال الرسالة")
        );
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? getArabicErrorMessage(err.message, "حدث خطأ غير متوقع")
          : "حدث خطأ غير متوقع";

      setError(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className="flex h-[34rem] rounded-[30px] max-h-[78vh] flex-col overflow-hidden bg-[#F5F6F8] shadow-[0_16px_36px_rgba(18,51,66,0.16)]"
      dir="rtl"
    >
      <MedicalChatHeader onClose={onClose} />
      <MedicalChatMessageList
        messages={messages}
        isSending={isSending}
        copiedMessageKey={copiedMessageKey}
        scrollRef={scrollRef}
        onCopyMessage={copyMessage}
      />

      {error && <p className="px-5 pb-2 text-xs text-red">{error}</p>}

      <MedicalChatComposer
        input={input}
        isSending={isSending}
        onInputChange={setInput}
        onSubmit={sendMessage}
      />
    </div>
  );
}
