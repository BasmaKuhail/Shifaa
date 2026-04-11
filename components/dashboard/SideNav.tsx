import Image from "next/image";
import logo from "@/public/icons/logo.svg";

import Add from "@/public/icons/dashboard/add";
import Dash from "@/public/icons/dashboard/dashboard";
import Pharm from "@/public/icons/dashboard/pharmacy";
import Request from "@/public/icons/dashboard/request";

import NavItem from "./NavItem";

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
        link: "/dashboard/pharmacies"
    },
    {
        id: 3,
        icon: Request,
        label: "الطلبات",
        link: "/dashboard/requests"
    },
    {
        id: 4,
        icon: Add,
        label: "إضافة دواء",
        link: "/dashboard/add"
    }
];

export default function SideNav(){
    return(
        <div className="flex flex-col gap-4 justify-start items-start p-5"> 
            <Image src={logo} alt="Logo"  className=" m-[2px]" />

            <div className="flex flex-col gap-3 mt-10">
                {navIcons.map((item) => (
                    <NavItem key={item.id} icon={item.icon} label={item.label} link={item.link} />
                ))}
            </div>
        </div>
    )
}