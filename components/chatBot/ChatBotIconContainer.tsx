"use client";

import { UserContext } from "@/contexts/UserContext";
import Chatbot from "@/public/images/chatbot/chatbot.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import MedicalChatPanel from "./MedicalChatPanel";

const introMessageStorageKey = "shifaa-chatbot-icon-intro-shown";

type ChatIconContainerProps = {
  mobileCompact?: boolean;
};

export default function ChatIconContainer({
  mobileCompact = false,
}: ChatIconContainerProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [shouldShowIntroMessage, setShouldShowIntroMessage] = useState(
    () =>
      typeof window !== "undefined" &&
      !localStorage.getItem(introMessageStorageKey)
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!showMessage) return;

    const hideMessageTimer = window.setTimeout(() => {
      setShowMessage(false);
    }, 5200);

    return () => window.clearTimeout(hideMessageTimer);
  }, [showMessage]);

  useEffect(() => {
    if (!isChatOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isChatOpen]);

  return (
    <>
      {isChatOpen && (
        <button
          type="button"
          aria-label="إغلاق المحادثة"
          className="fixed inset-0 z-[60] cursor-default bg-black/45"
          onClick={() => setIsChatOpen(false)}
        />
      )}

      <div 
        ref={containerRef} 
        className={
          mobileCompact
            ? "relative z-[70] lg:fixed lg:bottom-6 lg:left-10"
            : "fixed bottom-6 left-10 z-[70]"
        }
        >
        {isChatOpen && user && (
            <motion.div
                initial={{
                opacity: 0,
                x: mobileCompact ? 24 : -24,
                y: 12,
                scale: 0.96,
                }}
                animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                }}
                exit={{
                opacity: 0,
                x: mobileCompact ? 24 : -24,
                y: 12,
                scale: 0.96,
                }}
                transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                }}
                className={`
                z-20 w-[min(calc(100vw-2rem),24rem)]

                ${
                    mobileCompact
                    ? "fixed bottom-20 right-4"
                    : "absolute bottom-full left-0 mb-3"
                }
                `}
            >
                <MedicalChatPanel
                user={user}
                onClose={() => setIsChatOpen(false)}
                />
            </motion.div>
            )}

        <motion.button
          aria-label="فتح المساعد الطبي"
          initial={{
            opacity: 0,
            x: -90,
            y: 170,
            rotate: -18,
            scale: 0.72,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.45,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.25,
          }}
          onAnimationComplete={() => {
            if (!shouldShowIntroMessage) return;

            localStorage.setItem(introMessageStorageKey, "true");
            setShouldShowIntroMessage(false);
            setShowMessage(true);
          }}
          onClick={() => {
            setIsChatOpen(true);
            setShowMessage(false);
          }}
          whileHover={{
            scale: 1.1,
            y: -3,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className={`
            relative z-10
            rounded-full
            p-3
            bg-gradient-to-r from-[#3E94B9] to-[#04B6FF]
            flex items-center justify-center
            cursor-pointer
            shadow-lg
            hover:shadow-xl
            transition-shadow
            overflow-visible
            chat-bot-rocket
            ${isChatOpen ? "pointer-events-none" : ""}
            ${
              mobileCompact
                ? "h-14 w-14 p-2 sm:h-14 sm:w-14 sm:p-3"
                : "p-3"
            }
          `}
        >
          <span className="chat-bot-fire" aria-hidden="true" />
          <Image className="relative z-10" src={Chatbot} alt="chatbot" />
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={
              showMessage && !isChatOpen
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    y: 10,
                    scale: 0.94,
                  }
            }
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              absolute bottom-full left-0 mb-3
              w-[260px] max-w-[calc(100vw-5rem)]
              rounded-normal bg-white px-4 py-3
              text-right text-inpt leading-6 text-blue-900
              shadow-[0_12px_30px_rgba(18,51,66,0.16)]
              before:absolute before:bottom-[-7px] before:left-6
              before:h-4 before:w-4 before:rotate-45 before:bg-white
            "
            dir="rtl"
          >
            مرحباً أنا مساعدك الذكي، لا تتردد بطرح أي سؤال طبي
          </motion.span>
        </motion.button>
      </div>
    </>
  );
}

