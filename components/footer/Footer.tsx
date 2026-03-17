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
        <div 
            dir="rtl" 
            className="
                lg:bg-white md:bg-white 
                w-full lg:p-15 
                md:p-15 p-5 px-4 md:px-8 lg:px-30">
            <div className="
                    grid grid-cols-2 grid-rows-2 gap-8 items-center justify-center
                    md:flex md:flex-row md:justify-between md:items-center
                    lg:flex lg:flex-row lg:justify-between lg:items-center"
            >
                <div className="col-start-1 row-start-1
                        lg:flex lg:flex-col lg:gap-6 lg:w-[26%]
                        md:flex md:flex-col md:gap-6 md:w-[26%]"
                >
                    <Image src={logo} alt="Logo"   />
                    <p className="lg:text-btn md:text-btn text-xs">
                        تربط منصة شِفاء المرضى بالصيدليات في جميع أنحاء قطاع غزة، لتجعل عملية البحث عن الدواء أسرع، أسهل، وأكثر موثوقية.
                    </p>
                </div>
                <div className="
                        col-start-2 row-start-1
                        lg:flex lg:flex-col lg:gap-6
                        md:flex md:flex-col md:gap-6"
                >
                    <nav className="flex flex-row gap-6">
                        <Image src={phone} alt="phone" />
                        <p className="lg:text-btn md:text-btn text-xs">+97233000445</p>
                    </nav>
                    <nav className="flex flex-row gap-6">
                        <Image src={msg} alt="msg" />
                        <p className="lg:text-btn md:text-btn text-xs">Shifaaweb@gmail.com</p>
                    </nav>
                </div>

                <div className="
                        col-start-1 row-start-2  w-full
                        lg:flex lg:flex-col gap-6 w-[26%]
                        md:w-[26%]"
                >
                    <p className="lg:text-btn md:text-btn text-sm font-bold">اشترك معنا</p>
                    <p className="lg:text-btn md:text-btn text-xs text-black-500 "> 
                        اشترك للحصول على تحديثات فورية للمدونة.
                    </p>
                    <div 
                        className="
                        bg-white p-2
                        rounded-[10px]
                        relative 
                        text-xs
                        lg:text-inpt md:text-inpt
                        border border-blue-1100 
                        lg:rounded-[6px]
                        lg:p-4">
                        <input 
                            className="w-full focus:outline-none" 
                            placeholder="ادخل عنوان بريدك الالكتروني" 
                        />
                        <button 
                            className="
                            px-2 rounded-l-[9px]
                                absolute left-0 top-0 h-full
                                lg:rounded-l-[5px] lg:px-4 
                                bg-blue-1000 text-white 
                                flex items-center justify-center 
                                cursor-pointer 
                                hover:bg-blue-900 transition"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                className=" size-4 lg:size-6"
                            >
                                <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" 
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <nav className="col-start-2 row-start-2 w-full gap-5 justify-center lg:hidden md:hidden">
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <div className="flex border border-black-50 rounded-full p-3 aspect-square justify-center items-center hover:bg-black-50">
                            <Image 
                                src={facebook} 
                                alt="facebook" 
                                className="w-3 h-3 object-contain"
                            />
                        </div>
                        <div className="flex border border-black-50 rounded-full p-3 aspect-square justify-center items-center hover:bg-black-50">
                            <Image 
                                src={instegram} 
                                alt="instegram" 
                                className="w-3 h-3 object-contain"
                            />
                        </div>
                        <div className="flex border border-black-50 rounded-full p-3 aspect-square justify-center items-center hover:bg-black-50">
                            <Image 
                                src={linkedin} 
                                alt="linkedin" 
                                className="w-3 h-3 object-contain"
                            />
                        </div>
                    </div>
                    
                </nav>
            </div>
            <div className="flex flex-row justify-between border-t border-t-black-50 pt-2 text-inpt items-center lg:mt-15 md:mt-15">
                <nav className="hidden lg:flex md:flex flex-row gap-5 justify-center">
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
                <p className="text-xs lg:text-inpt md:text-inpt">جميع الحقوق محفوظة لـ شِفاء © 2026.</p>
                <Link className="text-xs lg:text-inpt md:text-inpt" href="#"><p className="hover:underline">سياسة الخصوصية</p></Link>
            </div>
        </div>
    )
}