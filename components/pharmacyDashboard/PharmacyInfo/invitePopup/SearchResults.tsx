import Image from "next/image";

import profileIcon from "@/public/icons/phcyInfo/profile.svg";
import sendInviteIcon from "@/public/icons/phcyInfo/sendInv.svg";

type ResultProps = {
  name: string;
  contactNumber?: string;
  email?: string;
  isInviting?: boolean;
  onInvite: () => void;
};

export default function Result({name, contactNumber, email, isInviting = false, onInvite,}: ResultProps) {

  const contactInformation = contactNumber || email || "لا توجد معلومات اتصال";
  return (
    <article
      dir="rtl"
      className="flex w-full items-center justify-between gap-3 rounded-[14px] bg-blue-100 px-4 py-3 sm:px-6"
    >
      <div className="flex min-w-0 items-center gap-3">

        <div className="min-w-0 text-right">
          <p className="truncate text-base font-medium text-black-500">{name || "صيدلي"}</p>

          <p dir="ltr" className="truncate text-right text-sm text-black-500/70">
            {contactInformation}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={isInviting}
        onClick={onInvite}
        className="
          flex shrink-0 items-center justify-center gap-2
          rounded-[12px] bg-blue-1000
          px-3 py-2 text-sm font-medium text-white
          transition-colors duration-200
          hover:bg-blue-1000/80
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <Image
          src={sendInviteIcon}
          alt=""
          width={17}
          height={17}
        />

        <span className="hidden sm:inline">
          {isInviting ? "جاري الإرسال..." : "إرسال دعوة"}
        </span>
      </button>
    </article>
  );
}