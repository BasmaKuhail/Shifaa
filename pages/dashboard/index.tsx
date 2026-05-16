import MainLayout from "@/layouts/MainLayout"
import Dashboard from "@/components/dashboard/Dashboard"
import DashboardLayout from "@/layouts/DashboardLayout"

import Add from "@/public/icons/dashboard/add";
import Dash from "@/public/icons/dashboard/dashboard";
import Pharm from "@/public/icons/dashboard/pharmacy";
import Request from "@/public/icons/dashboard/request";
import Home from "@/public/icons/dashboard/home";



export default function DashboardPage(){

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
        link: "/pharmInfo"
    },
    {
        id: 4,
        icon: Request,
        label: "الطلبات",
        link: "/medicine-requests"
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
        link: "/invitations"
    }
];

    return(
        <DashboardLayout sideNavArr={sideNavArr}>
            <Dashboard />
        </DashboardLayout>

    )
}