import DashboardLayout from "@/layouts/DashboardLayout";
import MedicineReq from "@/components/pharmacyDashboard/MedicineRequests/MedReq";
import { pharmacytNav } from "@/config/navigations";
import Head from "next/head";

export default function MedicineRequests(){
    return(
        <>
        <Head>
          <title> طلبات الأدوية | شفاء</title>
          <meta
            name="description"
            content="هنا تجد طلبات الادوية."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <DashboardLayout sideNavArr={pharmacytNav}>
            <MedicineReq/>
        </DashboardLayout>
        </main>
        </>
    )
}