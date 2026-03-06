import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

import Icon from "../Icon"
import Link from "next/link"
import arrowLeft from "@/public/icons/arrowLeft.svg";


type sectionProps = {
    icon: StaticImageData,
    header:string,
    text: string,
    link: string
}
const ArrowLeft = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.7" stroke="currentColor" className={`size-6 ${className}`}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
    </svg>
);
export default function ServiceCotainer ({icon, header, text, link}:sectionProps){
    const router = useRouter();
    return(
        <div 
            dir="rtl" 
            className="group hover:bg-gradient-to-r from-[#3E94B9] to-[#04B6FF] inline-block rounded-[5px] p-0.5 w-[97%] md:w-[32%] lg:w-[35%] lg:hover:w-[38%] hover:shadow-lg transition-all duration-500 ease-in-out">
            <div 
                className="
                    flex flex-col items-center gap-5
                    justify-center
                    bg-blue-100 
                    py-[40px]
                    w-full
                    rounded-[5px]
                    cursor-pointer
                    group-hover:bg-white
                    "
                onClick={()=> {router.push("#")}}
            >
                <Icon icon={icon} width={46} />
                <p className="font-bold text-21px lg:text-21px md:text-btn">{header}</p>
                <p className="text-btn w-[25ch] md:w-[15ch] lg:w-[25ch] text-center">{text}</p>
                <p className="
                    flex flex-row gap-2 items-center justify-center 
                    text-btn lg:text-btn md:text-inpt font-[450] text-black-600 
                    bg-clip-text
                    group-hover:bg-gradient-to-r from-[#3E94B9] to-[#04B6FF] 
                    group-hover:text-transparent">
                    <Link href={"#"}>{link}</Link>
                    <ArrowLeft className="text-black-600 group-hover:text-[#3E94B9]" />
                </p>
            </div>
        </div>)
}