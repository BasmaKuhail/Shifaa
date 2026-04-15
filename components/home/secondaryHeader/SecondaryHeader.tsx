import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import BtnEmpty from "./BtnEmpty"
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/contexts/UserContext";

type secHeaderProps = {
    headerItems:  {id:number, title:string, link: string, bold:boolean, includeLogo:boolean}[]
}

export default function SecondaryHeader({includeLogo=true}){
    const {user, loading} = useContext(UserContext);

    const headerItems = [
        {
            id: 1,
            title: "الصفحة الرئيسية",
            link: "/",
            bold: true,
        },
        {
            id: 2,
            title: "من نحن",
            link: "/whoAreWe",
            bold: false,
        },
        {
            id: 3,
            title: "الصيدليات",
            link: "/pharmacies",
            bold: false,
        },{
            id: 4,
            title: "مدونة التوعية الصحية",
            link: "/blog",
            bold: false,
        },{
            id: 5,
            title: "تواصل معنا",
            link: "/#contact",
            bold: false,
        }
    ]


    const router = useRouter();
    return(
        <div dir="rtl" className="flex flex-row items-center justify-between w-full gap-8 ">
            {includeLogo &&<Image src={logo} alt="Logo"  className=" m-[2px]" />}
            <div className="flex flex-row gap-8 items-center">
                {headerItems.map((item) => (
                    <p key={item.id} className={`text-btn cursor-pointer hover:underline text-center ${router.pathname === item.link ? "font-bold" : ""}`}><Link href={item.link}>{item.title}</Link></p>
                ))}
            </div>
            {<div className={`${!user ? "invisible" : "block"}`}><BtnEmpty onClick={() => {router.push("/dashboard")}}>لوحة التحكم</BtnEmpty></div>}
        </div>
    )
}