import IconHolder from "./IconHolder";
import profile from "@/public/icons/profile.jpg"
import mrKrabs from "@/public/images/mrKrabs.jpg"
import languge from "@/public/icons/languge.svg"
import { useEffect, useState } from "react";
import ProNotCont from "../home/ProfileNotificationsContainer";

const user ={
    name:"سبونج بوب",
    avatar:profile,
    position: "طباخ",
    email:"spongebob@gmail.com"
}
export default function Header(){
    const [profileOpened, setProfileOpened] = useState(false);
    const [notificationsOpened, setNotificationsOpened] = useState(false);


    useEffect(() => {
        if (profileOpened || notificationsOpened) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [profileOpened, notificationsOpened]);

    return(
        <div dir="rtl" className="bg-white p-2 flex flex-row gap-10 items-center border-b border-black-200 justify-between px-4 md:px-8 lg:px-20 xl:px-30">
            {(profileOpened || notificationsOpened) && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => {setProfileOpened(false); setNotificationsOpened(false)}}
                />
            )} 
            <div dir="ltr" className="flex flex-row-reverse gap-2 items-center">
                <IconHolder icon={languge} isNotification={false} width={17} height={17} />
                <p className=" text-input font-bold">اللغة</p>
            </div>
            <ProNotCont user={user}/>
        </div>
    )
}