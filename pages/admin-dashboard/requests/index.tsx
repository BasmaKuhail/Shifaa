import DashboardLayout from "@/layouts/DashboardLayout";
import Requests from "@/components/adminDashboard/requests/Requests";
import { adminNav } from "@/config/navigations";

export default function RequestsPage() {

    return(
        <DashboardLayout sideNavArr={adminNav}>
            <Requests/>
        </DashboardLayout>
    )
}