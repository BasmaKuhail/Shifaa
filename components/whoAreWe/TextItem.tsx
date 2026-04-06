import Image, { StaticImageData } from "next/image";

export default function Text({icon, title, text}: {icon:StaticImageData, title:string, text:string}){
    return(
        <div className="flex flex-col gap-2 items-center">
            <nav dir="rtl" className="flex flex-row gap-2 items-center justify-center">
                <Image src={icon} alt=""/>
                <p className="lg:font-semibold md:font-semibold text-inpt lg:text-21px md:text-21px bg-gradient-to-r from-[#3E94B9] to-[#04B6FF] bg-clip-text text-transparent">{title}</p>
            </nav>
            
            <p className="text-center text-btn font-[500]">{text}</p>
        </div>
    )
}