import DashboardLayout from "@/layouts/DashboardLayout";
import { adminNav } from "@/config/navigations";
import PharmacistRequests from "@/components/adminDashboard/requests/PharmacistRequests";
import Head from "next/head";

export default function RequestsPage() {

    return(
        <>
        <Head>
          <title>طلبات الصيدلي | شفاء</title>
          <meta
            name="description"
            content="تفقد طلبات الانضمام كصيدلي."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <DashboardLayout sideNavArr={adminNav}>
            <PharmacistRequests/>
        </DashboardLayout>
    </main>
    </>
    )
}