import Image, { StaticImageData } from "next/image";
import ProNotCont from "./ProfileNotification/ProfileNotificationsContainer";
import x from "@/public/icons/header/x.svg"
import Link from "next/link";
type mobileNavProps ={
    user : {
        avatar: StaticImageData;
        name: string;
        position: string;
        email:string
    },
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
        link: "/about",
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
export default function HomeNav({user, isMenuOpened, setIsMenuOpened}:mobileNavProps){
    return(
        <div className="flex flex-col  p-6 rounded-r-[14px] gap-8 ">
            <div className="w-fit" onClick={() => setIsMenuOpened(!isMenuOpened)}>
                <Image src={x} alt="x" />
            </div>
            
            <ProNotCont user={user}/>
            <div className="flex flex-col gap-2">
                {headerItems.map((item) => (
                    <p key={item.id} className={`text-btn cursor-pointer hover:underline ${item.bold && "font-bold"} border-b border-b-black-200 pb-3`}><Link href={item.link}>{item.title}</Link></p>
                ))}
            </div>
        </div>
    )
}