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
        <div dir="rtl" className="flex flex-col md:flex-row bg-blue-70 h-screen overflow-hidden">
            <div className="xl:w-[25%] lg:w-[35%] md:w-[40%] hidden md:flex h-screen">
                <SideNav sideNavArr={sideNavArr}/>
            </div>
            <div className="w-full w-full flex md:hidden">
                <MobileNav sideNavArr={sideNavArr}/>
            </div>
            <div  className="w-full flex flex-col pt-8 w-full overflow-y-auto md:p-10 p-5">
                <div dir="ltr" className="md:flex hidden w-full flex flex-row justify-between items-center">
                    {user && <ProNotCont user={user} bg="blue" /> }
                </div>
                {children}
            </div>
        </div>
    );
}