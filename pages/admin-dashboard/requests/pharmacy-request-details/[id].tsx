import DashboardLayout from "@/layouts/DashboardLayout";
import Requests from "@/components/adminDashboard/requests/Requests";
import { adminNav } from "@/config/navigations";
import RequestDetails from "@/components/adminDashboard/requests/RequestDetails";
import { useContext, useEffect, useState } from "react";
import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";
import { AdminPharmacyRequestContext } from "@/contexts/AdminPharmcyRequestsContext";
export default function RequestsPage() {
    const { getPharmRequestById } = useContext(AdminPharmacyRequestContext);
    const [id, setId] = useState<string>("");

    useEffect(() => {   
        const urlParts = window.location.pathname.split("/");
        const requestId = urlParts[urlParts.length - 1];
        setId(requestId);
    }, []);
    return(
        <DashboardLayout sideNavArr={adminNav}>
            <RequestDetails request={getPharmRequestById(Number(id))} type="pharmacy"/>
        </DashboardLayout>
    )
}