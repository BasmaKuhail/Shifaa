import DashboardLayout from "@/layouts/DashboardLayout";
import Requests from "@/components/adminDashboard/requests/PharmacistRequests";
import { adminNav } from "@/config/navigations";
import RequestDetails from "@/components/adminDashboard/requests/RequestDetails";
import { useContext, useEffect, useState } from "react";
import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";
import Head from "next/head";
export default function RequestsPage() {
    const { getRequestById } = useContext(AdminRequestContext);
    const [id, setId] = useState<string>("");

    useEffect(() => {   
        const urlParts = window.location.pathname.split("/");
        const requestId = urlParts[urlParts.length - 1];
        setId(requestId);
    }, []);
    return(
        <>
        <Head>
          <title>تفاصيل الطلب | شفاء</title>
          <meta
            name="description"
            content="تفقد تفاصيل طلب الصيدلي."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <DashboardLayout sideNavArr={adminNav}>
            <RequestDetails request={getRequestById(Number(id))} type="pharmacist"/>
        </DashboardLayout>
        </main></>
    )
}