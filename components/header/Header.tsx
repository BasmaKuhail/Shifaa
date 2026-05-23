import IconHolder from "./IconHolder";

import loggout from "@/public/icons/profile/logout.svg"
import languge from "@/public/icons/languge.svg"
import ProNotCont from "./ProfileNotification/ProfileNotificationsContainer";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import ProNotContSkeleton from "./ProfileNotification/ProNotContSkeleton";


export default function Header(){
    const router = useRouter();
    const {user, loading} = useContext(UserContext);
    
    console.log("header user", user)
    if (loading) {
        return (
            <div className="bg-white p-2 flex flex-row gap-10 items-center border-b border-black-200 justify-between px-4 md:px-8 lg:px-20 xl:px-30">
                <ProNotContSkeleton />
            </div>
        );
    }
        
    return(
        <div dir="ltr" className="bg-white p-2 flex flex-row gap-10 items-center border-b border-black-200 justify-between px-4 md:px-8 lg:px-20 xl:px-30">
            
            {/* <div dir="ltr" className="flex flex-row-reverse gap-2 items-center">
                <IconHolder icon={languge} isNotification={false} width={17} height={17} />
                <p className=" text-input font-bold">اللغة</p>
            </div> */}
            {user ? <ProNotCont user={user} /> : 
            <div dir="ltr" className="flex flex-row-reverse gap-2 items-center" onClick={() => router.push("/auth/login")}>
                {localStorage.getItem('token') 
                    ?
                        <p className="text-inpt font-semibold text-red">يتعذر تحميل المستخدم</p> 
                    : 
                        <>
                            <IconHolder icon={loggout} isNotification={false} width={17} height={17}/> 
                            <p className="text-inpt font-bold cursor-pointer hover:underline">تسجيل الدخول</p>
                        </>
                }
            </div>

            }

        </div>
    )
}