import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import UpArrow from "@/components/home/UpArrow";
import { useEffect, useState } from "react";

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
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

      {children}
    </div>
  );
}