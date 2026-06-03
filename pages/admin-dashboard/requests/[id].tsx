import DashboardLayout from "@/layouts/DashboardLayout";
import Requests from "@/components/adminDashboard/requests/Requests";
import { adminNav } from "@/config/navigations";
import RequestDetails from "@/components/adminDashboard/requests/RequestDetails";
import { useContext, useEffect, useState } from "react";
import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";
export default function RequestsPage() {
    const { getRequestById } = useContext(AdminRequestContext);
    const [id, setId] = useState<string>("");

    useEffect(() => {   
        const urlParts = window.location.pathname.split("/");
        const requestId = urlParts[urlParts.length - 1];
        setId(requestId);
    }, []);
    return(
        <DashboardLayout sideNavArr={adminNav}>
            <RequestDetails request={getRequestById(Number(id))}/>
        </DashboardLayout>
    )
}