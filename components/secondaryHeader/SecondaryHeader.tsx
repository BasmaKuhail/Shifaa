import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import { link } from "fs";
import BtnEmpty from "./BtnEmpty"

const headerItems = [
    {
        id: 1,
        title: "الصفحة الرئيسية",
        link: "/"
    },
    {
        id: 2,
        title: "من نحن",
        link: "/about"
    },
    {
        id: 3,
        title: "الصيدليات",
        link: "/pharmacies"
    },{
        id: 4,
        title: "مدونة التوعية الصحية",
        link: "/blog"
    },{
        id: 5,
        title: "تواصل معنا",
        link: "/contact"
    }
]
export default function SecondaryHeader(){
    return(
        <div className="flex flex-row-reverse items-center justify-between w-full">
            <Image src={logo} alt="Logo"  className=" m-[2px]" />
            <div className="flex flex-row-reverse gap-8 items-center">
                {headerItems.map((item) => (
                    <p key={item.id} className="text-btn cursor-pointer hover:underline">{item.title}</p>
                ))}
            </div>
            <BtnEmpty>لوحة التحكم</BtnEmpty>
        </div>
    )
}