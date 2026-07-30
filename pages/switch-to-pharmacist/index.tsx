import PharmacistForm from "@/components/joinAsPharmacist/PharmacistForm";
import FormLayout from "@/layouts/FormsLayout";
import Head from "next/head";

export default function JoinAsPharmacist() {
    return (
        <>
        <Head>
          <title>انضم كصيدلي | شفاء</title>
          <meta
            name="description"
            content="قدم طلب انضمام كصيدلي على منصة شفاء."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <FormLayout>
            <PharmacistForm />
        </FormLayout>
        </main>
    </>
    );
}
