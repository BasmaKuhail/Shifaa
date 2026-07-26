import Invitations from "@/components/pharmacyDashboard/invitations/Invitations";
import DashboardLayout from "@/layouts/DashboardLayout";
import { pharmacytNav } from "@/config/navigations";

export default function InvitationsIndex() {

    
    return(
        <DashboardLayout sideNavArr={pharmacytNav}>
            <Invitations/>
        </DashboardLayout>
    )
}