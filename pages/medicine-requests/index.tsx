import DashboardLayout from "@/layouts/DashboardLayout";
import MedicineReq from "@/components/dashboard/MedicineRequests/MedReq";
export default function MedicineRequests(){
    return(
        <DashboardLayout>
            <MedicineReq/>
        </DashboardLayout>
    )
}