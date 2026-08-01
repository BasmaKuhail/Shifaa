import Medicines from "@/components/pharmacyDashboard/Medicines/Medicines";
import { pharmacytNav } from "@/config/navigations";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";

export default function MedicinesIndex() {
    return(
        <>
        <Head>
          <title>أدوية صيدليتي  | شفاء</title>
          <meta
            name="description"
            content="هنا تجد مستودع الأدوية الخاص بصيدليتك."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <DashboardLayout sideNavArr={pharmacytNav}>
            <Medicines/>
        </DashboardLayout>
        </main></>
    )
}