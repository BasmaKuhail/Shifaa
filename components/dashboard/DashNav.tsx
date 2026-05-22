import Image from "next/image"
import x from "@/public/icons/dashboard/x.svg"
import { ReactNode, useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import ProNotContSkeleton from "../header/ProfileNotification/ProNotContSkeleton";
import ProNotCont from "../header/ProfileNotification/ProfileNotificationsContainer";
import Profile from "../header/Profile";
import HeaderDeopDown from "@/components/header/DropDown"

type mobileNavProps ={
    children:ReactNode,
    isMenuOpened:boolean,
    setIsMenuOpened:(isMenuOpened: boolean) => void
}
export default function DashNav({children, isMenuOpened, setIsMenuOpened}:mobileNavProps){
    const {user, loading} = useContext(UserContext);
    const [profileOpened, setProfileOpened] = useState(false);
    
    return(
        <div className="flex flex-col py-6 pr-4 gap-8">
            <div className="w-fit bg-black-10 p-2 rounded-full" onClick={() => setIsMenuOpened(!isMenuOpened)}>
                <Image src={x} alt="x" width={10}/>
            </div>
            {loading && 
                <div className="bg-white p-2 flex flex-row gap-10 items-center border-b border-black-200 justify-between px-4 md:px-8 lg:px-20 xl:px-30">
                    <ProNotContSkeleton/>
                </div>
            }
            {user && 
                <div className="relative" onClick={() => setProfileOpened(true)}>
                    <Profile user={user} />
                        <div className="absolute top-full left-0 z-50">
                            {profileOpened && <HeaderDeopDown user={user} profileOpened={profileOpened} setProfileOpened={setProfileOpened}/>}
                        </div>
                    </div>
            }
            {children}
        </div>
    )
}