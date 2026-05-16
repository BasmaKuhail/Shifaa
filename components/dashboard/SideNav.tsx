import Image from "next/image";
import logo from "@/public/icons/logo.svg";


import NavItem from "./NavItem";
import { useRouter } from "next/router";
import { label } from "framer-motion/client";

import Settings from "@/public/icons/dashboard/settings";
import Help from "@/public/icons/dashboard/help";

export default function SideNav({sideNavArr}: {sideNavArr: {id: number, icon: any, label: string, link: string}[]}) {
    
const otherIcons =[
    {
        id: 1,
        icon: Help,
        label: "مركز المساعدة",
        link: "/help"
    },
    {
        id: 2,
        icon: Settings,
        label: "الاعدادات",
        link: "/settings"
    },
]
    const router = useRouter();
    return(
        <div className="bg-white h-screen border-l border-l-black-200 flex flex-col gap-4 justify-between items-start p-5 "> 
            <div className="w-full flex flex-col gap-4">
                <Image src={logo} alt="Logo"  className=" m-[2px] cursor-pointer" onClick={() => router.push("/")}/>

                <div className="flex flex-col gap-3 mt-10 w-full">
                    {sideNavArr.map((item) => (
                        <NavItem key={item.id} icon={item.icon} label={item.label} link={item.link} />
                    ))}
                </div>
            </div>
            
            
            <div className="flex flex-col gap-3 mt-10 w-full border-t border-t-black-200 pt-5">
                {otherIcons.map((item) => (
                    <NavItem key={item.id} icon={item.icon} label={item.label} link={item.link} />
                ))}
            </div>
        </div>
    )
}