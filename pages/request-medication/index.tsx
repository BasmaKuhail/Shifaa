import Breadcrumb from "@/components/Breadcrumb";
import RequestMedication from "@/components/RequestMed/RequestMed";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import FormLayout from "@/layouts/FormsLayout";
import LandingLayout from "@/layouts/LandingLayout";
import Head from "next/head";
import { useEffect } from "react";

export default function RequestMed(){
    const { crumbs, setCrumbs } = useBreadcrumb()
      useEffect(() => {
        setCrumbs([
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "طلب دواء", link: "/request-medication" }
          ])
      }, [])
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
          <LandingLayout>
            <div className="flex flex-col w-full px-4 md:px-8 lg:px-20 xl:px-30 bg-blue-100">
              <div className="flex w-full mt-30 md:mt-60">
                <Breadcrumb breadcrumbArr={crumbs}/>
              </div>
            </div>
            <FormLayout>
              <RequestMedication/>
            </FormLayout>
          </LandingLayout>
        </main>
      </>
    )
}