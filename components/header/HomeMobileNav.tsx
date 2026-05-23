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
type mobileNavProps ={
    isMenuOpened:boolean,
    setIsMenuOpened:(isMenuOpened: boolean) => void
}
const headerItems = [
    {
        id: 1,
        title: "الصفحة الرئيسية",
        link: "/",
        bold: true,
    },
    {
        id: 2,
        title: "من نحن",
        link: "/whoAreWe",
        bold: false,
    },
    {
        id: 3,
        title: "الصيدليات",
        link: "/pharmacies",
        bold: false,
    },{
        id: 4,
        title: "مدونة التوعية الصحية",
        link: "/blog",
        bold: false,
    },{
        id: 5,
        title: "تواصل معنا",
        link: "/#contact",
        bold: false,
    },{
        id:6,
        title:"اللغة",
        link: "#",
        bold: false
    }
]
export default function HomeNav({isMenuOpened, setIsMenuOpened}:mobileNavProps){
    const {user, loading} = useContext(UserContext);
    const router = useRouter();
    const handleBtnRedirect = () => {
        if(user?.user_type === "user"){
            router.push("/request-medicen")
        }else if (user?.user_type === "pharmacist"){
            router.push("/dashboard")
        }else if (user?.user_type === "admin"){
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
                        text={user && (user?.user_type === "pharmacist" || user?.user_type === "admin") ? "لوحة التحكم" :"طلب دواء"}
                        onClick={() => {router.push("/dashboard")}} 
                        px={10} 
                        rounded="30"
                    />
                </div>

            </div>
        </div>
    )
}