import SideNav from "@/components/dashboard/SideNav";
import ProNotCont from "@/components/header/ProfileNotification/ProfileNotificationsContainer";
import { UserContext } from "@/contexts/UserContext";
import { useContext} from "react";
import ProNotContSkeleton from "@/components/header/ProfileNotification/ProNotContSkeleton";
import MobileNav from "@/components/dashboard/MobileNav";
import {NavItem} from "@/types/NavItemType"

export default function DashboardLayout({ children, sideNavArr }: { children: React.ReactNode, sideNavArr: NavItem[] }) {
    const {user, loading} = useContext(UserContext);

    if (loading) {
        return (
            <div className="bg-white p-2 flex flex-row gap-10 items-center border-b border-black-200 justify-between px-4 md:px-8 lg:px-20 xl:px-30">
                <ProNotContSkeleton />
            </div>
        );
    }
    return (
        <div dir="rtl" className="flex flex-col lg:flex-row bg-blue-70 h-screen overflow-hidden">
            <div className="xl:w-[25%] lg:w-[35%] hidden lg:flex h-screen">
                <SideNav sideNavArr={sideNavArr}/>
            </div>
            <div className="w-full flex lg:hidden">
                <MobileNav sideNavArr={sideNavArr}/>
            </div>
            <div  className="w-full flex flex-col pt-8 w-full overflow-y-auto pb-5 md:p-10 p-5">
                <div dir="ltr" className="lg:flex hidden w-full flex flex-row justify-between items-center">
                    {user && <ProNotCont user={user} bg="blue" /> }
                </div>
                {children}
                <div className="w-full flex flex-col items-center">
                    <p className="text-xs lg:text-inpt md:text-inpt">جميع الحقوق محفوظة لـ شِفاء © 2026.</p>
                </div>
            </div>                

        </div>
    );
}