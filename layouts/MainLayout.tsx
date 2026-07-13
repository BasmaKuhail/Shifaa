import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import UpArrow from "@/components/home/UpArrow";
import { useEffect, useState } from "react";
import ChatIconContainer from "@/components/chatBot/ChatBotIconContainer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [showArrow, setShowArrow] = useState(false);

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
      <div className="fixed bottom-20 right-3 z-[70] flex flex-col items-center gap-3 lg:hidden">
        <ChatIconContainer mobileCompact />
        {showArrow && <UpArrow />}
      </div>

      <div className="hidden lg:block">
        <ChatIconContainer />
      </div>
      {showArrow && (
        <div className="hidden lg:block">
          <UpArrow />
        </div>
      )}
      <div className="fixed top-0 left-0 w-full z-50 hidden lg:block">
        <Header />
      </div>

      {children}

      <div className="grid bg-blue-100 w-full">
        <Footer />
      </div>
    </div>
  );
}