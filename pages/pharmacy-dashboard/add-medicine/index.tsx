import DashboardLayout from "@/layouts/DashboardLayout";
import { pharmacytNav } from "@/config/navigations";
import AddMed from "@/components/pharmacyDashboard/addMedicine/AddMed";

export default function AddMedicineIndex() {

    
    return(
        <DashboardLayout sideNavArr={pharmacytNav}>
            <AddMed/>
        </DashboardLayout>
    )
}