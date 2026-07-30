import Pharmacies from "@/components/pharmacies/Pharmacies";
import MainLayout from "@/layouts/MainLayout";
import Head from "next/head";

export default function PharmaciesIndex() {
    return(
        <>
        <Head>
          <title> الصيدليات | شفاء</title>
          <meta
            name="description"
            content="صيدليات شفاء المعتمدة."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
            <MainLayout>
                <Pharmacies/>
            </MainLayout>
        </main>
        </>
        
    )
}