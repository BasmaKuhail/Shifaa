import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

import Icon from "../Icon"
import Link from "next/link"
import ArrowRight from "@/public/icons/error/arrowRight";


type sectionProps = {
    icon: StaticImageData,
    header:string,
    text: string,
    link: string
}
export default function ServiceCotainer ({icon, header, text, link}:sectionProps){
    const router = useRouter();
    return(
        <div 
            dir="rtl" 
            className="group hover:bg-gradient-to-r from-[#329CCB] to-[#668DCA] inline-block rounded-[5px] p-0.5 w-[97%] md:w-[32%] lg:w-[35%] lg:hover:w-[38%] hover:shadow-lg transition-all duration-500 ease-in-out">
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
                    group-hover:bg-gradient-to-r from-[#329CCB] to-[#668DCA]
                    group-hover:text-transparent">
                    <Link href={"#"}>{link}</Link>
                    <ArrowRight className="rotate-180 text-black-600 group-hover:text-[#3E94B9]" />
                </p>
            </div>
        </div>)
}
