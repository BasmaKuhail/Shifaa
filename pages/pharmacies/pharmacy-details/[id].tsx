import PharmacyDetails from "@/components/pharmacies/PharmDetails";
import MainLayout from "@/layouts/MainLayout";
import Head from "next/head";

export default function PharmacyIndex() {
    return(
        <>
        <Head>
          <title>تفاصيل الصيدلية | شفاء</title>
          <meta
            name="description"
            content="تصفح معلومات الصيدلية."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <MainLayout>
            <PharmacyDetails/>
        </MainLayout>
        </main></>
    )
}