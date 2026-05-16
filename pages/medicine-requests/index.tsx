import DashboardLayout from "@/layouts/DashboardLayout";
import MedicineReq from "@/components/dashboard/MedicineRequests/MedReq";

import Add from "@/public/icons/dashboard/add";
import Dash from "@/public/icons/dashboard/dashboard";
import Pharm from "@/public/icons/dashboard/pharmacy";
import Request from "@/public/icons/dashboard/request";
import Home from "@/public/icons/dashboard/home";

export default function MedicineRequests(){
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
            <MedicineReq/>
        </DashboardLayout>
    )
}