import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Chatbot from "@/public/icons/chatbot";
import cross from "@/public/icons/profile/cross.svg";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  onClose: () => void;
};

const chatStorageKey = "shifaa-medical-chat-messages";

const introMessage: ChatMessage = {
  role: "assistant",
  content:
    "مرحبا، أنا مساعد ذكاء اصطناعي للإجابة عن الأسئلة الطبية فقط. يمكنني فهم العربية والإنجليزية. قد تحتوي إجاباتي على أخطاء، لذلك من الأفضل التواصل مع مختص طبي حقيقي، خصوصا في الحالات العاجلة.",
};

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

function loadStoredMessages(): ChatMessage[] {
  if (typeof window === "undefined") {
    return [introMessage];
  }

  try {
    const storedMessages = JSON.parse(localStorage.getItem(chatStorageKey) || "[]");

    if (!Array.isArray(storedMessages)) {
      return [introMessage];
    }

    const validMessages = storedMessages.filter(isChatMessage);
    return validMessages.length > 0 ? validMessages : [introMessage];
  } catch {
    return [introMessage];
  }
}

function renderMessageContent(content: string) {
  return content.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export default function MedicalChatPanel({ onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadStoredMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(chatStorageKey, JSON.stringify(messages.slice(-30)));
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

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
          messages: nextMessages.filter(
            (message) => message.role !== introMessage.role || message.content !== introMessage.content
          ),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.answer) {
        throw new Error(data.error || "تعذر إرسال الرسالة");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-[32rem] max-h-[75vh] flex-col">
      <div className="flex items-center justify-between border-b border-b-black-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lightBlue">
            <Chatbot className="h-6 w-6 text-black-800" />
          </div>
          <div>
            <p className="text-sm font-semibold">محادثة الدعم</p>
            <p className="text-xs text-black-500">مساعد طبي ذكي</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black-200 hover:bg-black-500"
          aria-label="إغلاق المحادثة"
        >
          <Image src={cross} alt="" width={13} />
        </button>
      </div>

      <div className="custom-y-scrollbar flex-1 space-y-3 overflow-y-auto py-4 pl-1">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[86%] whitespace-pre-wrap rounded-[10px] px-3 py-2 text-sm leading-6 ${
                message.role === "user"
                  ? "bg-blue-1000 text-white"
                  : "bg-black-100 text-black-700"
              }`}
            >
              {renderMessageContent(message.content)}
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-end">
            <div className="rounded-[10px] bg-black-100 px-3 py-2 text-sm text-black-500">
              جاري كتابة الرد...
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {error && <p className="mb-2 text-xs text-red">{error}</p>}

      <form onSubmit={sendMessage} className="flex items-end gap-2 border-t border-t-black-200 pt-3">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="اكتب سؤالك الطبي..."
          className="min-h-11 max-h-28 flex-1 resize-none rounded-[10px] border border-black-200 px-3 py-2 text-sm outline-none focus:border-blue-1000"
          rows={1}
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="h-11 rounded-[10px] bg-blue-1000 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          إرسال
        </button>
      </form>
    </div>
  );
}
