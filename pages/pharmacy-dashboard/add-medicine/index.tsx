import DashboardLayout from "@/layouts/DashboardLayout";
import { pharmacytNav } from "@/config/navigations";
import AddMed from "@/components/pharmacyDashboard/addMedicine/AddMed";
import Head from "next/head";

export default function AddMedicineIndex() {

    
    return(
        <>
        <Head>
          <title>اضافة دواء | شفاء</title>
          <meta
            name="description"
            content="قم باضافة دواء الى مخزون صيدليتك."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <DashboardLayout sideNavArr={pharmacytNav}>
            <AddMed/>
        </DashboardLayout>
        </main>
        </>
    )
}