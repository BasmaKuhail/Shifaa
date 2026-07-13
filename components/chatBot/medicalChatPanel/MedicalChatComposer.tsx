import { FormEvent } from "react";
import Image from "next/image";

type Props = {
  input: string;
  isSending: boolean;
  onInputChange: (input: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function MedicalChatComposer({
  input,
  isSending,
  onInputChange,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="bg-white px-4 pb-4 pt-3">
      <div className="flex items-end gap-2 rounded-[14px] bg-[#EEF1F5] px-4 py-3">
        <textarea
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder="اكتب سؤالك الطبي..."
          className="max-h-24 min-h-8 flex-1 resize-none bg-transparent text-sm text-[#454545] outline-none placeholder:text-[#727272]"
          rows={1}
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#31A8D9] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45 rotate-180"
          aria-label="إرسال"
        >
          <Image
            className="pointer-events-none"
            src="/icons/send.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>
    </form>
  );
}

