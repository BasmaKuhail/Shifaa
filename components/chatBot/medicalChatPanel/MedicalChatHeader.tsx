import Image from "next/image";
import chatbotIcon from "@/public/images/chatbot/chatbot.png";

type Props = {
  onClose: () => void;
};

export default function MedicalChatHeader({ onClose }: Props) {
  return (
    <div className="shadow-b-[0_16px_36px_rgba(18,51,66,0.16)] flex items-center justify-between bg-gradient-to-r from-[#329CCB] to-[#668DCA] px-6 py-5 text-white rounded-t-[30px]">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center">
          <Image src={chatbotIcon} alt="" width={40} height={40} />
        </div>
        <div>
          <p className="text-lg font-semibold leading-6">مساعدك الذكي</p>
        </div>
      </div>

      {/* <button
        type="button"
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 text-xl leading-none text-white transition hover:bg-white/15"
        aria-label="إغلاق المحادثة"
      >
        ×
      </button> */}
    </div>
  );
}

