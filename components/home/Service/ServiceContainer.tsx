import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

import Icon from "../Icon"
import Link from "next/link"
import arrowLeft from "@/public/icons/arrowLeft.svg"


type sectionProps = {
    icon: StaticImageData,
    header:string,
    text: string,
    link: string
}
export default function ServiceCotainer ({icon, header, text, link}:sectionProps){
    const router = useRouter();
    return(<div 
                dir="rtl" 
                className="flex flex-col bg-blue-100 py-[40px] px-[55px] rounded-[5px] items-center gap-5 cursor-pointer"
                onClick={()=> {router.push("#")}}
            >
        <Icon icon={icon} width={46} />
        <p className="font-bold text-21px">{header}</p>
        <p className="text-btn w-[25ch] text-center">{text}</p>
        <p className="flex flex-row gap-2  items-center justify-center text-btn font-[450]">
            <Link href={"#"}>{link}</Link>
            <Image src={arrowLeft} alt="Icon" width={14}/>
        </p>
    </div>)
}