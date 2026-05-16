import Dashboard from "@/components/dashboard/Dashboard";
import PharmInfo from "@/components/dashboard/PharmacyInfo/PharmacyInfo";
import DashboardLayout from "@/layouts/DashboardLayout";

import Add from "@/public/icons/dashboard/add";
import Dash from "@/public/icons/dashboard/dashboard";
import Pharm from "@/public/icons/dashboard/pharmacy";
import Request from "@/public/icons/dashboard/request";
import Home from "@/public/icons/dashboard/home";
export default function PharmInfoPage(){
    const sideNavArr = [
    {
        id:1,
        icon:Home,
        label:"الرئيسية",
        link:"/"
    },
    {
        id: 2,
        icon: Dash,
        label: "لوحة التحكم",
        link: "/dashboard"
    },
    {
        id: 3,
        icon: Pharm,
        label: "معلومات الصيدلية",
        link: "/dashboard/pharmInfo"
    },
    {
        id: 4,
        icon: Request,
        label: "الطلبات",
        link: "/dashboard/medicine-requests"
    },
    {
        id: 5,
        icon: Add,
        label: "إضافة دواء",
        link: "/dashboard/add"
    },
    {
        id: 6,
        icon: Request,
        label:"الدعوات",
        link: "/dashboard/invitations"
    }
];
    return(
        <DashboardLayout sideNavArr={sideNavArr}>
            <PharmInfo/>
        </DashboardLayout>
        
    )
}
