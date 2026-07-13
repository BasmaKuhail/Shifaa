import Image from "next/image";
import copyIcon from "@/public/icons/copy.svg";
import { getMessageDirection, renderMessageContent } from "./messageContent";
import { ChatMessage } from "./types";

type Props = {
  message: ChatMessage;
  messageKey: string;
  isCopied: boolean;
  onCopy: (content: string, messageKey: string) => void;
};

export default function MedicalChatMessage({
  message,
  messageKey,
  isCopied,
  onCopy,
}: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        dir={getMessageDirection(message.content)}
        className={`max-w-[82%] whitespace-pre-wrap rounded-[10px] px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser
            ? "rounded-bl-[2px] bg-[#1F6680] text-white"
            : "rounded-br-[2px] bg-[#DDE1E5] text-[#454545]"
        }`}
      >
        {renderMessageContent(message.content)}
      </div>

      <button
        type="button"
        onClick={() => onCopy(message.content, messageKey)}
        className={`mt-1.5 flex h-7 items-center gap-1 rounded-[8px] bg-[#31A8D9] px-2 text-xs text-white shadow-sm transition hover:bg-[#2A7A9D] ${
          isUser ? "ml-3" : "mr-3"
        }`}
        aria-label="نسخ الرسالة"
      >
        <Image src={copyIcon} alt="" width={14} height={14} />
        {isCopied && <span>تم النسخ</span>}
      </button>
    </div>
  );
}

