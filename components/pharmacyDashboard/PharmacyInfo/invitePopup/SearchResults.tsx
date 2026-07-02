import Image, { StaticImageData } from "next/image";
import profile from "@/public/icons/phcyInfo/profile.svg";
import sendInv from "@/public/icons/phcyInfo/sendInv.svg";
import { send } from "process";
type resultProp = {
    avatar?: StaticImageData;
    name: string;
    contactNum: string;
}
export default function Result({avatar, name, contactNum}:resultProp){
    return(
        <div className="w-full flex flex-row items-center justify-between gap-3 bg-blue-100 rounded-[14px] p-3 px-8 ">
            <div className="flex flex-row items-center justify-start gap-5">
                <Image src={avatar ? avatar : profile} alt="" width={50} height={50}/>
                <div className="flex flex-col items-start justify-start gap-1">
                    <p className="font-[500] text-21px text-black-500">{name}</p>
                    <p className="text-black-500 text-sm">{contactNum}</p>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-3 bg-blue-1000 text-white font-[500] rounded-[14px] px-4 py-2 cursor-pointer hover:bg-blue-1000/80 transition-colors duration-200">
                <Image src={sendInv} alt=""/>
                <p>ارسال دعوة</p>
            </div>
        </div>
    )
}