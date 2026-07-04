import Dashboard from "@/components/pharmacyDashboard/Dashboard";
import PharmInfo from "@/components/pharmacyDashboard/PharmacyInfo/PharmacyInfo";
import DashboardLayout from "@/layouts/DashboardLayout";

import Add from "@/public/icons/dashboard/add";
import Dash from "@/public/icons/dashboard/dashboard";
import Pharm from "@/public/icons/dashboard/pharmacy";
import Request from "@/public/icons/dashboard/request";
import Home from "@/public/icons/dashboard/home";
import { pharmacytNav } from "@/config/navigations";
export default function PharmInfoPage(){

    return(
        <DashboardLayout sideNavArr={pharmacytNav}>
            <PharmInfo/>
        </DashboardLayout>
        
    )
}
