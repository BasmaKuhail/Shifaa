import SideNav from "@/components/dashboard/SideNav";
import ProNotCont from "@/components/header/ProfileNotification/ProfileNotificationsContainer";
import UpArrow from "@/components/home/UpArrow";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import ProNotContSkeleton from "@/components/header/ProfileNotification/ProNotContSkeleton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [showArrow, setShowArrow] = useState(false);
    const {user, loading} = useContext(UserContext);

    useEffect(() => {
        const handleScroll = () => {
          setShowArrow(window.scrollY > 90);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (loading) {
        return (
            <div className="bg-white p-2 flex flex-row gap-10 items-center border-b border-black-200 justify-between px-4 md:px-8 lg:px-20 xl:px-30">
                <ProNotContSkeleton />
            </div>
        );
    }
    return (
        <div dir="rtl" className="flex flex-row bg-blue-70 h-screen overflow-hidden">
            {showArrow && <UpArrow />}
            <div className="w-[25%] h-screen">
                <SideNav/>
            </div>
            <div  className="flex flex-col pt-8 pr-20 pl-4 md:pl-8 lg:pl-20 xl:pl-30 w-full overflow-y-auto">
                <div dir="ltr" className="w-full flex flex-row justify-between items-center">
                    {user &&<ProNotCont user={user} bg="blue" /> }
                </div>
                {children}
            </div>
            
        </div>
    );
}