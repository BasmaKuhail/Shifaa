import About from "@/components/whoAreWe/About";
import MainLayout from "@/layouts/MainLayout"
import Head from "next/head";

export default function WhoAreWe(){
    return(
        <>
            <Head>
            <title>من نحن؟ | شفاء</title>
            <meta
                name="description"
                content="عن منصة شفاء."
            />
            <meta name="robots" content="index, nofollow" />
            </Head>
            <main>
                <MainLayout>
                    <About/>
                </MainLayout>
            </main>
        </>
        
    )
}