"use client";

import { memo, useEffect, useState } from "react";

import ChatIconContainer from "@/components/chatBot/ChatBotIconContainer";
import UpArrow from "@/components/home/UpArrow";
import { useOverlay } from "@/contexts/OverlayContext";

const ARROW_VISIBILITY_THRESHOLD = 90;

function ScrollControlsComponent() {
  const [showArrow, setShowArrow] = useState(false);
  const { headerMenuOpen } = useOverlay();

  useEffect(() => {
    const updateArrowVisibility = () => {
      const shouldShowArrow =
        window.scrollY > ARROW_VISIBILITY_THRESHOLD;

      setShowArrow((currentValue) =>
        currentValue === shouldShowArrow
          ? currentValue
          : shouldShowArrow,
      );
    };

    updateArrowVisibility();

    window.addEventListener("scroll", updateArrowVisibility, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateArrowVisibility);
    };
  }, []);

  if (headerMenuOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile controls */}
      <div className="fixed bottom-20 right-3 z-[120] flex flex-col items-center gap-3 lg:hidden">
        <ChatIconContainer mobileCompact />
        {showArrow && <UpArrow />}
      </div>

      {/* Desktop controls */}
      <div className="hidden lg:block">
        <ChatIconContainer />
      </div>

      {showArrow && (
        <div className="hidden lg:block">
          <UpArrow />
        </div>
      )}
    </>
  );
}

const ScrollControls = memo(ScrollControlsComponent);

export default ScrollControls;