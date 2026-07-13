import { RefObject } from "react";
import MedicalChatMessage from "./MedicalChatMessage";
import { ChatMessage } from "./types";

type Props = {
  messages: ChatMessage[];
  isSending: boolean;
  copiedMessageKey: string;
  scrollRef: RefObject<HTMLDivElement | null>;
  onCopyMessage: (content: string, messageKey: string) => void;
};

export default function MedicalChatMessageList({
  messages,
  isSending,
  copiedMessageKey,
  scrollRef,
  onCopyMessage,
}: Props) {
  return (
    <div className="custom-y-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-5">
      {messages.map((message, index) => {
        const messageKey = `${message.role}-${index}`;

        return (
          <MedicalChatMessage
            key={messageKey}
            message={message}
            messageKey={messageKey}
            isCopied={copiedMessageKey === messageKey}
            onCopy={onCopyMessage}
          />
        );
      })}

      {isSending && (
        <div className="flex justify-start">
          <div className="rounded-[10px] rounded-br-[2px] bg-[#DDE1E5] px-4 py-3 text-sm text-[#727272] shadow-sm">
            جاري كتابة الرد...
          </div>
        </div>
      )}

      <div ref={scrollRef} />
    </div>
  );
}

