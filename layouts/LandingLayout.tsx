import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import UpArrow from "@/components/home/UpArrow";
import { useEffect, useState } from "react";
import SecondaryHeader from "@/components/home/secondaryHeader/SecondaryHeader";
import MobileHeader from "@/components/header/MobileHeader";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
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
      
      {showArrow && <UpArrow />}

      <div className="fixed top-0 left-0 w-full z-50 hidden lg:block">
        <Header />
      </div>
      <div className="bg-blue-100 relative inline-block ">
                {/* web view */}
                <div className="absolute inset-0 z-10 pt-[75px] hidden lg:block">
                    <div className="px-4 md:px-8 lg:px-20 xl:px-30 pt-4"><SecondaryHeader/></div>
                </div>
                {/* mobile view */}
                <div className="absolute inset-0 -top-full block lg:hidden w-full flex items-center justify-center">
                    <MobileHeader/>
                </div>
            </div>

      {children}

      <div className="grid bg-blue-100 w-full">
        <Footer />
      </div>
    </div>
  );
}