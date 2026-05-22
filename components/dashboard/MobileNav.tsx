import Image from "next/image";
import { useState } from "react";
import logo from "@/public/icons/logo.svg";
import menu from "@/public/icons/header/burgerMenu.svg";
import notification from "@/public/icons/notifications.svg"
import IconHolder from "../header/IconHolder";
import HomeNav from "../header/HomeMobileNav";
import DashNav from "./DashNav";
import NavItem from "./NavItem";


export default function MobileNav({sideNavArr}: {sideNavArr: {id: number, icon: any, label: string, link: string}[]}){
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    return(
        <div dir="rtl" className="w-full flex flex-row md:hidden w-full justify-between items-center p-5">
            <Image src={logo} alt="Logo" width={106} />
            <div className="flex flex-row gap-4 items-center">
                <IconHolder icon={notification} width={25} height={25} isNotification={true} notiCount={3} bg="white"/>
                <div className="bg-white p-2 rounded-[10px] aspect-square flex items-center justify-center cursor-pointer" onClick={() => setIsMenuOpened(!isMenuOpened)}>
                    <Image src={menu} alt="menu" />
                </div>
            </div> 
            {isMenuOpened && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setIsMenuOpened(false)}
                    />

                    <div className="w-[60%] h-full md:w-[40%] fixed top-0 left-0 h-screen bg-white z-50 rounded-r-[14px]">
                        <DashNav isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened}>
                            <div className="flex flex-col gap-3 w-full">
                                {sideNavArr.map((item) => (
                                    <NavItem key={item.id} icon={item.icon} label={item.label} link={item.link} />
                                ))}
                            </div>
                        </DashNav>
                    </div>
                </>
                )}
        </div>
    )
}