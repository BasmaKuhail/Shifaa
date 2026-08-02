import { User } from "@/types/UserType";
import AttachmentProfileIcon from "../AttachmentProfileIcon";
import Image from "next/image";
import downArrow from "@/public/icons/profile/downArrowHead.svg"
import ProfileIconContainer from "./ProfileIconContainer";
type ProfileProps = {
    user : User
}

export default function Profile({user}:ProfileProps){
    return(
        <div dir="ltr" className="flex flex-row items-center  gap-5 mr-[12px]">
            <div className="flex flex-row items-center gap-2">
                <ProfileIconContainer width={40} isCircle={false}/>
                <div className="flex flex-col gap-0">
                    <p className="text-input">{user.firstName}</p>
                    <p className="text-12px text-black-500">{user.role}</p>
                </div>
            </div>
            <Image src={downArrow} alt="" className="cursor-pointer"/>
            
        </div>
    )
}
