import { User } from "@/types/UserType";
import AttachmentProfileIcon from "../AttachmentProfileIcon";
import Image from "next/image";
import downArrow from "@/public/icons/profile/downArrowHead.svg"
type ProfileProps = {
    user : User
}

export default function Profile({user}:ProfileProps){
    return(
        <div dir="rtl" className="flex flex-row items-center  gap-5 mr-[12px]">
            <div className="flex flex-row items-center gap-2">
                <div className="relative">
                    <div className="flex flex-col cursor-pointer">
                        <AttachmentProfileIcon imageUrl={user.avatar?.url ?? null} width={40} isCircle={false}/>
                    </div>
                    <div className="bg-online p-1 w-[11px] h-[11px] rounded-full absolute right-0 bottom-0"></div>
                </div>
                <div className="flex flex-col gap-0">
                    <p className="text-input">{user.firstName}</p>
                    <p className="text-12px text-black-500">{user.role}</p>
                </div>
            </div>
            <Image src={downArrow} alt="" className="cursor-pointer"/>
            
        </div>
    )
}
