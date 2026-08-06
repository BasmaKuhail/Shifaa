import MedDetails from "@/components/pharmacyDashboard/Medicines/ViewMedDetails";
import { pharmacytNav } from "@/config/navigations";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";

export default function MedicinesDetails() {
    return(
        <>
            <Head>
                    <title>تفاصيل الدواء | شفاء</title>
                    <meta
                        name="description"
                        content="تفاصيل الدواء في مخزون صيدليتك."
                    />
                    <meta name="robots" content="index, nofollow" />
            </Head>
            <main>
            <DashboardLayout sideNavArr={pharmacytNav}>
                <MedDetails/>
            </DashboardLayout>
            </main>
        </>
    )
}
