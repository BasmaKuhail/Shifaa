import Image, { StaticImageData } from 'next/image';
import cross from "@/public/icons/profile/cross.svg"

import profile from "@/public/icons/profile/profile.svg"
import logout from "@/public/icons/profile/logout.svg"
import medication from "@/public/icons/profile/medication.svg"
import notification from "@/public/icons/profile/notifications.svg"
import saved from "@/public/icons/profile/saved.svg"
import settings from "@/public/icons/profile/settings.svg"
import switchTo from "@/public/icons/profile/switch.svg"
import createPharm from "@/public/icons/profile/createPharm.svg"
import ArrowRight from "@/public/icons/profile/arrowRight.svg"
import { Dispatch } from 'react';
import { logout as logoutService } from '@/services/auth';
import { useRouter } from 'next/router';
import ProfileIcon from '../ProfileIcon';
import { User } from '@/types/UserType';
type headerProps = {
    user: User
    profileOpened:boolean,
    setProfileOpened:Dispatch<React.SetStateAction<boolean>>,
}

export default function HeaderDropDown({user, profileOpened, setProfileOpened}:headerProps){
    const router = useRouter();

    const dropDownItems =[
        {title: "حسابي", icon: profile, opened:true, arrow: ArrowRight, onclick: () => {router.push("/editProfile")}},
        {title: "الإعدادات", icon: settings, opened:false, arrow: ArrowRight, onclick: () => {router.push("/settings")}},
        {title: "الإشعارات", icon: notification, allowed:false, onclick: () => {router.push("/notifications")}},
        {title: "انضمام كصيدلي", icon: switchTo, opened:false, arrow: ArrowRight, onclick: () => {router.push("/switch-to-pharmacist")}},
        {title: "إنشاء صيدلية", icon: createPharm, opened:false, arrow: ArrowRight, onclick: () => {router.push("/create-pharmacy")}},
        {title: "طلب دواء", icon:medication , opened:false, arrow: ArrowRight, onclick: () => {router.push("/request-medication")}},
        {title: "العناصر المحفوظة", icon: saved, opened:false, arrow: ArrowRight, onclick: () => {router.push("/saved-items")}},
        {
            title: "تسجيل خروج", 
            icon:logout , 
            opened:false, 
            onclick: async () => {
                try {
                    await logoutService(); // call API FIRST
                } catch (e) {
                    console.error(e);
                } 
                localStorage.removeItem("token"); 
                localStorage.removeItem("user"); 
                window.location.href = "/auth/login"; 
            }
        } ,
    ]
    const pharmaciesArr = dropDownItems.filter(item => !(user.user_type === "pharmacist" && item.title === "انضمام كصيدلي"))
    const userArr = dropDownItems.filter(item => !(user.user_type === "user" && item.title === "إنشاء صيدلية"))
    return(
        <div dir="rtl" className="bg-white rounded-[12px] py-4 p-3 w-[21.75rem]">
            <div className='flex flex-row justify-between  w-full border-b border-b-black-200 pb-5'>
                <div className='flex flex-row items-center gap-4'>
                    <ProfileIcon imageUrl={user.avatar} width={40} isCircle={false}/>

                    <div dir="rtl" className='flex flex-col'>
                        <p className='font-semibold text-sm'>{user.firstName}</p>
                        <p className='text-sm text-black-500'>{user.email}</p>
                    </div>
                </div>
                <div  onClick={() => {setProfileOpened(!profileOpened); console.log(profileOpened)}} className='bg-red p-2 rounded-[10px] w-fit h-fit hover:bg-[#c73030]'>
                    <Image src={cross} alt="x" width={13}/>
                </div>
            </div>   
            <div className='flex flex-col gap-2 pt-5'>
                {(user.user_type === "pharmacist" ? pharmaciesArr: userArr).map((item, index) =>
                    <div 
                        key={index} 
                        className='flex flex-row justify-between items-center cursor-pointer hover:bg-black-100 p-2 px-6'
                        onClick={item.onclick}
                    >
                        <div className='flex flex-row gap-4'>
                            <Image  src={item.icon} alt='icon' width={24}/>
                            <p className='font-[500] text-sm'>{item.title}</p>
                        </div>
                        {item.arrow && <Image className="scale-x-[-1]" src={item.arrow} alt="arrow"/>}
                        {item.allowed == true || item.allowed == false && <p className='text-12px text-black-400'>{(item.allowed) ? "مُفعَل" : "مكتوم"}</p>}
                    </div>
                )} 
                     
            </div>
            
        </div>
    )
}