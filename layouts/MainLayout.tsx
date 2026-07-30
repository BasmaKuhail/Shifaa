import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import { useOverlay } from "@/contexts/OverlayContext";
import ScrollControls from "@/components/ScrollControls";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex flex-col overflow-x-hidden'>
      <ScrollControls />
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
