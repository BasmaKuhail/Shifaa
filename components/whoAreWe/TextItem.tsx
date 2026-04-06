import Image, { StaticImageData } from "next/image";

export default function Text({icon, title, text}: {icon:StaticImageData, title:string, text:string}){
    return(
        <div className="flex flex-col gap-5 lg:gap-2 md:gap-2 items-center">
            <nav dir="rtl" className="flex flex-col lg:flex-row md:flex-row gap-2 items-center justify-center">
                <Image src={icon} alt=""/>
                <p className="font-semibold text-btn lg:text-21px md:text-21px bg-gradient-to-r from-[#3E94B9] to-[#04B6FF] bg-clip-text text-transparent">{title}</p>
            </nav>
            
            <p className="text-center text-btn font-[500]">{text}</p>
        </div>
    )
}