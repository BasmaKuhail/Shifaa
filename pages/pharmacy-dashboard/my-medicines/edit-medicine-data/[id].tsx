import DashboardLayout from "@/layouts/DashboardLayout";
import { pharmacytNav } from "@/config/navigations";
import AddMed from "@/components/pharmacyDashboard/addMedicine/AddMed";
import Head from "next/head";

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
                <AddMed edit/>
            </DashboardLayout>
            </main>
        </>
    )
}