import DashboardLayout from "@/layouts/DashboardLayout";
import MedicineReq from "@/components/pharmacyDashboard/MedicineRequests/MedReq";
import { pharmacytNav } from "@/config/navigations";

export default function MedicineRequests(){
    return(
        <DashboardLayout sideNavArr={pharmacytNav}>
            <MedicineReq/>
        </DashboardLayout>
    )
}