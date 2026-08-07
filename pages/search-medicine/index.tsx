import Search from "@/components/Search/Search";
import MainLayout from "@/layouts/MainLayout";
import Head from "next/head";

export default function MedicineSearchIndex (){
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
                    <Search/>
                </MainLayout>
            </main>
        </>
    )
}