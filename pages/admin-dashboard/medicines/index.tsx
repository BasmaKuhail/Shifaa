import ImportMedicines from "@/components/adminDashboard/medicines/ImportMedicines";
import { adminNav } from "@/config/navigations";
import DashboardLayout from "@/layouts/DashboardLayout";
import Head from "next/head";

export default function medicinesExcel(){
    return(
        <>
            <Head>
                <title>اضافة أدوية | شفاء</title>
                <meta
                    name="description"
                    content="تستطيع اضافة الأدوية كملف اكسل."
                />
                <meta name="robots" content="index, nofollow" />
            </Head>
            <main>
                <DashboardLayout sideNavArr={adminNav}>
                    <ImportMedicines/>
                </DashboardLayout>
            </main>
    </>
    )
}