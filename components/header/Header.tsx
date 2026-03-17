import IconHolder from "./IconHolder";
import Profile from "./Profile";
import profile from "@/public/icons/profile.jpg"
import mrKrabs from "@/public/images/mrKrabs.jpg"
import notification from "@/public/icons/notifications.svg"
import languge from "@/public/icons/languge.svg"
import { useEffect, useState } from "react";
import DropDownMenu from "../home/search/DropDownMenu";
import HeaderDeopDown from "./DropDown";
import NotificationsDropDown from "./NotificationsDropDown";

const user ={
    name:"سبونج بوب",
    avatar:profile,
    position: "طباخ",
    email:"spongebob@gmail.com"
}
export default function Header(){
    const [profileOpened, setProfileOpened] = useState(false);
    const [notificationsOpened, setNotificationsOpened] = useState(false);

    const notifications = [
        {sender:{name:"سبونج بوب", avatar:profile}, msg: "تم تلبية طلب الدواء رقم ٣٤٣٢٢.عنوان الصيدلية:", date: new Date('2025-07-04T10:00:00')},
        {sender:{name:"شفيق حبار"}, msg: "تم تلبية طلب الدواء رقم ٣٤٣٢٢.عنوان الصيدلية:", date: new Date('2025-07-04T10:00:00')},
        {sender:{name:"مستر سلطع", avatar:mrKrabs}, msg: "يدعوكم إلى الإنضمام إلى مقرمشات سلطع", date: new Date, action:{title:"قبول الدعوة", onClick:() => console.log("accepted")}},
    ]
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
        <div dir="rtl" className="bg-white p-2 flex flex-row gap-10 items-center border-b border-black-200 justify-between px-4 md:px-8 lg:px-30">
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
        <div className="flex flex-row gap-5 items-center justify-between ">

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
                    {profileOpened && <HeaderDeopDown user={user} setProfileOpened={setProfileOpened}/>}
                </div>
            </div>
            
            
        </div>
        </div>
    )
}