import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import UpArrow from "@/components/home/UpArrow";
import { useEffect, useState } from "react";
import ChatIconContainer from "@/components/chatBot/ChatBotIconContainer";
import { useOverlay } from "@/contexts/OverlayContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [showArrow, setShowArrow] = useState(false);
  const { headerMenuOpen } = useOverlay();

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 90);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='w-full flex flex-col overflow-x-hidden'>

      {/* Mobile controls */}
      <div className="fixed bottom-20 right-3 z-[120] flex flex-col items-center gap-3 lg:hidden">
        {!headerMenuOpen && <ChatIconContainer mobileCompact />}
        {showArrow && !headerMenuOpen && <UpArrow />}
      </div>

      <div className="hidden lg:block">
        {!headerMenuOpen && <ChatIconContainer />}
      </div>
      {showArrow && (
        <div className="hidden lg:block">
          {!headerMenuOpen && <UpArrow />}
        </div>
      )}
      <div className="fixed top-0 left-0 w-full z-[90] hidden lg:block">
        <Header />
      </div>

      {children}

      <div className="grid bg-blue-100 w-full">
        <Footer />
      </div>
    </div>
  );
}
