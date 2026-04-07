import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import BtnEmpty from "./BtnEmpty"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

type secHeaderProps = {
    headerItems:  {id:number, title:string, link: string, bold:boolean}[]
}

export default function SecondaryHeader(){
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
        <div dir="rtl" className="flex flex-row items-center justify-between w-full px-4 md:px-8 lg:px-20 xl:px-30 pt-4 gap-8 ">
            <Image src={logo} alt="Logo"  className=" m-[2px]" />
            <div className="flex flex-row gap-8 items-center">
                {headerItems.map((item) => (
                    <p key={item.id} className={`text-btn cursor-pointer hover:underline text-center ${router.pathname === item.link ? "font-bold" : ""}`}><Link href={item.link}>{item.title}</Link></p>
                ))}
            </div>
            <BtnEmpty>لوحة التحكم</BtnEmpty>
        </div>
    )
}