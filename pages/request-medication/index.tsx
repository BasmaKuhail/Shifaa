import RequestMedication from "@/components/RequestMed/RequestMed";
import FormLayout from "@/layouts/FormsLayout";
import Head from "next/head";

export default function RequestMed(){
    return(
        <>
        <Head>
          <title> طلب دواء | شفاء</title>
          <meta
            name="description"
            content="اطلب دواءك الذي تجد صعوبة في ايجاده."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <FormLayout>
            <RequestMedication/>
        </FormLayout>
        </main>
        </>
    )
}