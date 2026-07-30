import DashboardLayout from "@/layouts/DashboardLayout";
import Requests from "@/components/adminDashboard/requests/PharmacistRequests";
import { adminNav } from "@/config/navigations";
import CreatePharmReq from "@/components/adminDashboard/requests/PharmacyRequests";
import Head from "next/head";

export default function RequestsPage() {

    return(
        <>
        <Head>
          <title>طلبات الصيدليات | شفاء</title>
          <meta
            name="description"
            content="تفقد طلبات انشاء صيدليات."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <DashboardLayout sideNavArr={adminNav}>
            <CreatePharmReq/>
        </DashboardLayout>
        </main>
        </>
    )
}