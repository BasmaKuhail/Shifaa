import Image from "next/image";
import { Dispatch } from "react";
import { useRouter } from "next/router";

import AttachmentProfileIcon from "@/components/AttachmentProfileIcon";
import profile from "@/public/icons/profile/profile.svg";
import logout from "@/public/icons/profile/logout.svg";
import medication from "@/public/icons/profile/medication.svg";
import settings from "@/public/icons/profile/settings.svg";
import switchTo from "@/public/icons/profile/switch.svg";
import createPharm from "@/public/icons/profile/createPharm.svg";
import Chatbot from "@/public/icons/chatbot";
import ArrowRight from "@/public/icons/profile/arrowRight.svg";
import { logout as logoutService } from "@/services/auth";
import { User } from "@/types/UserType";

type Props = {
  user: User;
  setIsSettingsOpen: Dispatch<React.SetStateAction<boolean>>;
  setIsChatOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function MainMenu({ user, setIsSettingsOpen, setIsChatOpen }: Props) {
  const router = useRouter();

  const dropDownItems = [
    {
      title: "حسابي",
      icon: profile,
      opened: true,
      arrow: ArrowRight,
      onclick: () => {
        router.push("/editProfile");
      },
    },
    {
      title: "تغيير كلمة المرور",
      icon: settings,
      opened: false,
      arrow: ArrowRight,
      onclick: () => setIsSettingsOpen(true),
    },
    {
      title: "انضمام كصيدلي",
      icon: switchTo,
      opened: false,
      arrow: ArrowRight,
      onclick: () => {
        router.push("/switch-to-pharmacist");
      },
    },
    {
      title: "إنشاء صيدلية",
      icon: createPharm,
      opened: false,
      arrow: ArrowRight,
      onclick: () => {
        router.push("/create-pharmacy");
      },
    },
    {
      title: "مساعدك الطبي الذكي",
      icon: Chatbot,
      isComponentIcon: true,
      opened: false,
      arrow: ArrowRight,
      onclick: () => {
        setIsChatOpen(true);
      },
    },
    {
      title: "طلب دواء",
      icon: medication,
      opened: false,
      arrow: ArrowRight,
      onclick: () => {
        router.push("/request-medication");
      },
    },
    {
      title: "تسجيل خروج",
      icon: logout,
      opened: false,
      onclick: async () => {
        try {
          await logoutService();
        } catch (e) {
          console.error(e);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("shifaa-medical-chat-messages");
        window.location.href = "/auth/login";
      },
    },
  ];

  const pharmaciesArr = dropDownItems.filter((item) => item.title !== "انضمام كصيدلي");
  const userArr = dropDownItems.filter((item) => item.title !== "إنشاء صيدلية");
  const adminArr = dropDownItems.filter(
    (item) =>
      item.title !== "انضمام كصيدلي" &&
      item.title !== "إنشاء صيدلية" &&
      item.title !== "طلب دواء"
  );

  const itemsToShow =
    user.role === "pharmacist" ? pharmaciesArr : user.role === "admin" ? adminArr : userArr;

  return (
    <div>
      <div className="flex w-full flex-row justify-between border-b border-b-black-200 pb-5">
        <div className="flex flex-row items-center gap-4">
          <AttachmentProfileIcon imageUrl={user.avatar?.url ?? null} width={40} isCircle={false} />

          <div dir="rtl" className="flex flex-col">
            <p className="text-sm font-semibold">{user.firstName}</p>
            <p className="text-sm text-black-500">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-5">
        {itemsToShow.map((item, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-row items-center justify-between p-2 px-6 hover:bg-black-100"
            onClick={item.onclick}
          >
            <div className="flex flex-row gap-4">
              {item.isComponentIcon ? (
                <item.icon className="h-6 w-6 text-black-800" />
              ) : (
                <Image src={item.icon} alt="icon" width={24} />
              )}
              <p className="text-sm font-[500]">{item.title}</p>
            </div>
            {item.arrow && <Image className="scale-x-[-1]" src={item.arrow} alt="arrow" />}
          </div>
        ))}
      </div>
    </div>
  );
}
