import IconHolder from "./IconHolder";
import profile from "@/public/icons/profile.jpg"
import languge from "@/public/icons/languge.svg"
import ProNotCont from "./ProfileNotification/ProfileNotificationsContainer";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import ProNotContSkeleton from "./ProfileNotification/ProNotContSkeleton";

const dummUser = {
    name:"سبونج بوب",
    avatar:profile,
    position: "طباخ",
    email:"spongebob@gmail.com"
}
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
        <div dir="rtl" className="bg-white p-2 flex flex-row gap-10 items-center border-b border-black-200 justify-between px-4 md:px-8 lg:px-20 xl:px-30">
            
            <div dir="ltr" className="flex flex-row-reverse gap-2 items-center">
                <IconHolder icon={languge} isNotification={false} width={17} height={17} />
                <p className=" text-input font-bold">اللغة</p>
            </div>
            {localStorage.getItem("token") ? <ProNotCont user={user || dummUser} /> : <></>}
            {/* <p className="text-primary font-bold cursor-pointer" onClick={() => router.push("/auth/login")}>تسجيل الدخول</p>} */}

        </div>
    )
}