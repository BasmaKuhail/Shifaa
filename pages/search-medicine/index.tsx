import SearchMed from "@/components/Search/SearchMed";
import Search from "@/components/Search/SearchMed";
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
                    <SearchMed/>
                </MainLayout>
            </main>
        </>
    )
}