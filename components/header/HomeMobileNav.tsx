import Image, { StaticImageData } from "next/image";
import ProNotCont from "./ProfileNotification/ProfileNotificationsContainer";
import x from "@/public/icons/header/x.svg"
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import ProNotContSkeleton from "./ProfileNotification/ProNotContSkeleton";
import BtnEmpty from "../home/secondaryHeader/BtnEmpty";
import GradientBtn from "../home/GradiantBtn";

import { headerItems } from "@/config/navigations";
type mobileNavProps ={
    isMenuOpened:boolean,
    setIsMenuOpened:(isMenuOpened: boolean) => void
}

export default function HomeNav({isMenuOpened, setIsMenuOpened}:mobileNavProps){
    const {user, loading} = useContext(UserContext);
    const router = useRouter();
    const handleBtnRedirect = () => {
        if(user?.role === "user"){
            router.push("/request-medicen")
        }else if (user?.role === "pharmacist"){
            router.push("/pharmacy-dashboard/pharmInfo")
        }else if (user?.role === "admin"){
            router.push("/admin-dashboard")
        }
    }
    return(
        <div className="flex flex-col  p-6 rounded-r-[14px] gap-8">
            <div className="w-fit" onClick={() => setIsMenuOpened(!isMenuOpened)}>
                <Image src={x} alt="x" />
            </div>
            {loading && 
                <div className="bg-white p-2 flex flex-row gap-10 items-center border-b border-black-200 justify-between px-4 md:px-8 lg:px-20 xl:px-30">
                    <ProNotContSkeleton />
                </div>
            }
            {user && <ProNotCont user={user}/>}
            <div className="flex flex-col gap-2">
                {headerItems.map((item) => (
                    <p key={item.id} className={`text-btn cursor-pointer hover:underline ${router.pathname === item.link ? "font-bold" : ""} border-b border-b-black-200 pb-3`}><Link href={item.link}>{item.title}</Link></p>
                ))}
                {!user && <p className={`text-btn cursor-pointer hover:underline ${router.pathname === "/auth/login" ? "font-bold" : ""} border-b border-b-black-200 pb-3`}><Link href={"/auth/login"}>تسجيل الدخول</Link></p>}

                <div 
                    className={`w-full mt-10 flex items-center justify-center `}
                >
                    <GradientBtn 
                        w="full" 
                        text={user && (user?.role === "pharmacist" || user?.role === "admin") ? "لوحة التحكم" :"طلب دواء"}
                        onClick={handleBtnRedirect} 
                        px={10} 
                        rounded="30"
                    />
                </div>

            </div>
        </div>
    )
}