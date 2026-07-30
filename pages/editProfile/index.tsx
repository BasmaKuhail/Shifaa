import Breadcrumb from "@/components/Breadcrumb";
import EditProfile from "@/components/EditProfile/EditProfile";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import FormLayout from "@/layouts/FormsLayout";
import LandingLayout from "@/layouts/LandingLayout";
import Head from "next/head";
import { useEffect } from "react";

export default function EditProfilePage() {
  const { crumbs, setCrumbs } = useBreadcrumb()
  useEffect(() => {
    setCrumbs([
      { title: "الصفحة الرئيسية", link: "/" },
      { title: "تعديل الحساب", link: "/editProfile" }
      ])
  }, [])
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
              <LandingLayout>
                <div className="flex flex-col w-full px-4 md:px-8 lg:px-20 xl:px-30 bg-blue-100">
                  <div className="flex w-full mt-30 md:mt-60">
                    <Breadcrumb breadcrumbArr={crumbs}/>
                  </div>
                </div>
                <FormLayout>
                  <EditProfile/>
                </FormLayout>
              </LandingLayout>
            </main>
        </>
    )
}