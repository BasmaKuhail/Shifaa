import MainLayout from "@/layouts/MainLayout"
import Dashboard from "@/components/dashboard/Dashboard"
import DashboardLayout from "@/layouts/DashboardLayout"
export default function DashboardPage(){
    return(
        <DashboardLayout>
            <Dashboard/>
        </DashboardLayout>

    )
}