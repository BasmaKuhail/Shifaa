import { StaticImageData } from "next/image";

import { useEffect, useState } from "react";
import notification from "@/public/icons/notifications.svg"
import profile from "@/public/icons/profile.jpg"
import mrKrabs from "@/public/images/mrKrabs.jpg"
import IconHolder from "./IconHolder";
import NotificationsDropDown from "./NotificationsDropDown";
import Profile from "./Profile";
import HeaderDeopDown from "./DropDown";
type ProNotContProps ={
    user : {
        avatar: StaticImageData;
        name: string;
        position: string;
        email:string
    }
}
const notifications = [
    {sender:{name:"سبونج بوب", avatar:profile}, msg: "تم تلبية طلب الدواء رقم ٣٤٣٢٢.عنوان الصيدلية:", date: new Date('2025-07-04T10:00:00')},
    {sender:{name:"شفيق حبار"}, msg: "تم تلبية طلب الدواء رقم ٣٤٣٢٢.عنوان الصيدلية:", date: new Date('2025-07-04T10:00:00')},
    {sender:{name:"مستر سلطع", avatar:mrKrabs}, msg: "يدعوكم إلى الإنضمام إلى مقرمشات سلطع", date: new Date, action:{title:"قبول الدعوة", onClick:() => console.log("accepted")}},
]
export default function ProNotCont({user}:ProNotContProps){
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
        <div className="flex flex-row gap-5 items-center justify-between bg-white">
            {(profileOpened || notificationsOpened) && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => {setProfileOpened(false); setNotificationsOpened(false); console.log(true)}}
                />
            )}
                {/* notifications */}
                <div className="relative" onClick={() => setNotificationsOpened(true)}>
                    <IconHolder icon={notification} isNotification={true} width={24} height={24} notiCount={notifications.length}/>
                    <div className="absolute top-full left-0 z-50">
                        {notificationsOpened && <NotificationsDropDown notifications={notifications}/>}
                    </div>
                </div>
                

                {/* vr line */}
                <div className="w-[1px] h-[35px] bg-black-200"></div>

                {/* profile */}
                <div className="relative" onClick={() => setProfileOpened(true)}>
                    <Profile imgUrl={user.avatar} name={user.name} position={user.position}/>
                    <div className="absolute top-full left-0 z-50">
                        {profileOpened && <HeaderDeopDown user={user} profileOpened={profileOpened} setProfileOpened={setProfileOpened}/>}
                    </div>
                </div>
                
                
            </div>
    )
}