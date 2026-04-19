import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import menu from "@/public/icons/header/burgerMenu.svg";
import { useContext, useState } from "react";
import HomeNav from "./HomeMobileNav";
import profile from "@/public/icons/profile.jpg"
import { UserContext } from "@/contexts/UserContext";


export default function MobileHeader (){
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    
    return(
        <div dir="rtl" className="flex flex-row justify-between items-center w-[90%] mt-25 flex items-center">
            <Image src={logo} alt="Logo" width={106} />
            <div className="bg-white p-2 rounded-[10px] aspect-square flex items-center justify-center cursor-pointer" onClick={() => setIsMenuOpened(!isMenuOpened)}>
                <Image src={menu} alt="menu" />
            </div>
            {isMenuOpened && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setIsMenuOpened(false)}
                    />

                    <div className="fixed top-0 left-0 h-screen bg-white z-50">
                        <HomeNav isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened}/>
                    </div>
                </>
                )}
        </div>
    )
}