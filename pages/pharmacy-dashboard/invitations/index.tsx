import Invitations from "@/components/pharmacyDashboard/invitations/Invitations";
import DashboardLayout from "@/layouts/DashboardLayout";
import { pharmacytNav } from "@/config/navigations";
import Head from "next/head";

export default function InvitationsIndex() {

    
    return(
        <>
        <Head>
          <title>ادارة الدعوات | شفاء</title>
          <meta
            name="description"
            content="هنا تستطيع ادارة الدعوات."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <DashboardLayout sideNavArr={pharmacytNav}>
            <Invitations/>
        </DashboardLayout>
        </main></>
    )
}