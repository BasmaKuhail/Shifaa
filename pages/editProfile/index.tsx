import EditProfile from "@/components/EditProfile/EditProfile";
import FormLayout from "@/layouts/FormsLayout";
import Head from "next/head";

export default function EditProfilePage() {
    return (
            <>
        <Head>
          <title>تعديل الحساب | شفاء</title>
          <meta
            name="description"
            content="حدث بياناتك."
          />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <main>
        <FormLayout>
            <EditProfile/>
        </FormLayout>
        </main>
        </>
    )
}