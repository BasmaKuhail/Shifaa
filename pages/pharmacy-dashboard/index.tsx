import Dashboard from "@/components/pharmacyDashboard/Dashboard"
import DashboardLayout from "@/layouts/DashboardLayout"
import {pharmacytNav} from "@/config/navigations"

export default function DashboardPage(){

    return(
        <DashboardLayout sideNavArr={pharmacytNav}>
            <Dashboard />
        </DashboardLayout>

    )
}