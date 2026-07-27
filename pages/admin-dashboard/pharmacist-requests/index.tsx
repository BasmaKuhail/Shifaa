import DashboardLayout from "@/layouts/DashboardLayout";
import { adminNav } from "@/config/navigations";
import PharmacistRequests from "@/components/adminDashboard/requests/PharmacistRequests";

export default function RequestsPage() {

    return(
        <DashboardLayout sideNavArr={adminNav}>
            <PharmacistRequests/>
        </DashboardLayout>
    )
}