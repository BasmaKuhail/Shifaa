import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import BtnEmpty from "./BtnEmpty"
import Link from "next/link";

type secHeaderProps = {
    headerItems:  {id:number, title:string, link: string, bold:boolean}[]
}

export default function SecondaryHeader({headerItems}:secHeaderProps){
    return(
        <div dir="rtl" className="flex flex-row items-center justify-between w-full px-4 md:px-8 lg:px-20 xl:px-30 pt-4 gap-8 ">
            <Image src={logo} alt="Logo"  className=" m-[2px]" />
            <div className="flex flex-row gap-8 items-center">
                {headerItems.map((item) => (
                    <p key={item.id} className={`text-btn cursor-pointer hover:underline ${item.bold && "font-bold"}`}><Link href={item.link}>{item.title}</Link></p>
                ))}
            </div>
            <BtnEmpty>لوحة التحكم</BtnEmpty>
        </div>
    )
}