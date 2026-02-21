import IconHolder from "./IconHolder";
import Profile from "./Profile";
import profile from "@/public/icons/profile.jpg"
import notification from "@/public/icons/notifications.svg"
import languge from "@/public/icons/languge.svg"

export default function Header(){
    return(
        <div className="bg-white p-2 flex flex-row gap-10 items-center border-b border-black-200 justify-between px-4 md:px-8 lg:px-30"> 
        <div className="flex flex-row gap-5 items-center justify-between ">
            <Profile imgUrl={profile} name="سبونجبوب" position="طباخ"/>
            <div className="w-[2px] h-[40px] bg-black-200"></div>
            <IconHolder icon={notification} isNotification={true} width={24} height={24}/>
        </div>
        <div className="flex flex-row-reverse gap-2 items-center">
            <IconHolder icon={languge} isNotification={false} width={17} height={17}/>
            <p className=" text-input font-bold">اللغة</p>
        </div>
        
        </div>
    )
}