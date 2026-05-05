import Image from "next/image";
import logo from "@/public/icons/logo.svg";

import Add from "@/public/icons/dashboard/add";
import Dash from "@/public/icons/dashboard/dashboard";
import Pharm from "@/public/icons/dashboard/pharmacy";
import Request from "@/public/icons/dashboard/request";
import Settings from "@/public/icons/dashboard/settings";
import Help from "@/public/icons/dashboard/help";

import NavItem from "./NavItem";
import { useRouter } from "next/router";

const navIcons = [
    {
        id: 1,
        icon: Dash,
        label: "لوحة التحكم",
        link: "/dashboard"
    },
    {
        id: 2,
        icon: Pharm,
        label: "معلومات الصيدلية",
        link: "/pharmInfo"
    },
    {
        id: 3,
        icon: Request,
        label: "الطلبات",
        link: "/medicine-requests"
    },
    {
        id: 4,
        icon: Add,
        label: "إضافة دواء",
        link: "/dashboard/add"
    }
];

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

export default function SideNav(){
    const router = useRouter();
    return(
        <div className="bg-white h-screen border-l border-l-black-200 flex flex-col gap-4 justify-between items-start p-5 "> 
            <div className="w-full flex flex-col gap-4">
                <Image src={logo} alt="Logo"  className=" m-[2px] cursor-pointer" onClick={() => router.push("/")}/>

                <div className="flex flex-col gap-3 mt-10 w-full">
                    {navIcons.map((item) => (
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