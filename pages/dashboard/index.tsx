import Dashboard from "@/components/pharmacyDashboard/Dashboard"
import DashboardLayout from "@/layouts/DashboardLayout"
import {pharmacistNav} from "@/config/navigations"

export default function DashboardPage(){

    return(
        <DashboardLayout sideNavArr={pharmacistNav}>
            <Dashboard />
        </DashboardLayout>

    )
}