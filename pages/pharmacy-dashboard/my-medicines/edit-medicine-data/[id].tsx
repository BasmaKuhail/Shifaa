import DashboardLayout from "@/layouts/DashboardLayout";
import { pharmacytNav } from "@/config/navigations";
import AddMed from "@/components/pharmacyDashboard/addMedicine/AddMed";
import Head from "next/head";
import EditMed from "@/components/pharmacyDashboard/EditMed/EditMed";

export default function EditMedicineIndex() {
    return(
        <>
            <Head>
                    <title>تعديل دواء | شفاء</title>
                    <meta
                        name="description"
                        content="قم بتعديل بيانات الدواء في مخزون صيدليتك."
                    />
                    <meta name="robots" content="index, nofollow" />
            </Head>
            <main>
            <DashboardLayout sideNavArr={pharmacytNav}>
                <EditMed/>
            </DashboardLayout>
            </main>
        </>
    )
}