import CreatePharmacy from "@/components/createParmacy/CreatePharmacy";
import FormLayout from "@/layouts/FormsLayout";
import Head from "next/head";

export default function CreatePharm (){
    return(
            <>
        <Head>
          <title> انشاء صيدلية | شفاء</title>
          <meta
            name="description"
            content="قدم طلب انشاء صيدلية على المنصة."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <FormLayout>
            <CreatePharmacy/>
        </FormLayout>
        </main>
       </> 
    )
}