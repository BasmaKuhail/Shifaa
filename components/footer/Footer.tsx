import logo from "@/public/icons/logo.svg";
import Image from "next/image";

import Link from "next/link";

import phone from "@/public/icons/footer/phone.svg"
import msg from "@/public/icons/footer/message.svg"

import instegram from "@/public/icons/footer/instegram.svg"
import facebook from "@/public/icons/footer/facebook.svg"
import linkedin from "@/public/icons/footer/linkedin.svg"



export default function Footer(){
    return(
        <div dir="rtl" className="flex flex-col gap-20 bg-white w-full p-15 px-4 md:px-8 lg:px-30">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-6 w-[26%]">
                    <Image src={logo} alt="Logo"   />
                    <p className="text-btn">تربط منصة شِفاء المرضى بالصيدليات في جميع أنحاء قطاع غزة، لتجعل عملية البحث عن الدواء أسرع، أسهل، وأكثر موثوقية.</p>
                </div>
                <div className="flex flex-col gap-6 ">
                    <nav className="flex flex-row gap-6">
                        <Image src={phone} alt="phone" />
                        <p className="text-btn">+97233000445</p>
                    </nav>
                    <nav className="flex flex-row gap-6">
                        <Image src={msg} alt="msg" />
                        <p className="text-btn">Shifaaweb@gmail.com</p>
                    </nav>
                </div>
                <div className="flex flex-col gap-6 w-[26%]">
                    <p className="text-btn font-bold">اشترك معنا</p>
                    <p className="text-inpt text-black-500 "> اشترك للحصول على تحديثات فورية للمدونة.</p>
                    <div className="relative border border-blue-1100 rounded-[6px] p-4">
                        <input className="w-full focus:outline-none" placeholder="ادخل عنوان بريدك الالكتروني" />
                        <button className="absolute left-0 top-0 h-full rounded-l-[5px] px-4 bg-blue-1000 text-white  flex items-center justify-center cursor-pointer hover:bg-blue-900 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between border-t border-t-black-50 pt-2 text-inpt items-center">
                <nav className="flex flex-row gap-5">
                    <div className="flex border border-black-50 rounded-full p-3 aspect-square justify-center items-center hover:bg-black-50">
                        <Image src={facebook} alt="facebook" className="w-4 h-4 object-contain"/>
                    </div>
                    <div className="flex border border-black-50 rounded-full p-3 aspect-square justify-center items-center hover:bg-black-50">
                        <Image src={instegram} alt="instegram" className="w-4 h-4 object-contain"/>
                    </div>
                    <div className="flex border border-black-50 rounded-full p-3 aspect-square justify-center items-center hover:bg-black-50">
                        <Image src={linkedin} alt="linkedin" className="w-4 h-4 object-contain"/>
                    </div>
                    
                </nav>
                <p>جميع الحقوق محفوظة لـ شِفاء © 2026.</p>
                <Link className="hover:text-underline " href="#"><p>سياسة الخصوصية</p></Link>
            </div>
        </div>
    )
}