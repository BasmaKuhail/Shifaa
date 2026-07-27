import DashboardLayout from "@/layouts/DashboardLayout";
import Requests from "@/components/adminDashboard/requests/PharmacistRequests";
import { adminNav } from "@/config/navigations";
import CreatePharmReq from "@/components/adminDashboard/requests/PharmacyRequests";

export default function RequestsPage() {

    return(
        <DashboardLayout sideNavArr={adminNav}>
            <CreatePharmReq/>
        </DashboardLayout>
    )
}