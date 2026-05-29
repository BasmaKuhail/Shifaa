import DashboardLayout from "@/layouts/DashboardLayout";
import AdminDashboard from "@/components/adminDashboard/AdminDashboard";

import {adminNav} from "@/config/navigations"



export default function AdminDashboardPage() {
    
    return(
        <DashboardLayout sideNavArr={adminNav}>
            <AdminDashboard/>
        </DashboardLayout>
    )
}