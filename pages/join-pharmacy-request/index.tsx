import Breadcrumb from "@/components/Breadcrumb"
import { useBreadcrumb } from "@/contexts/BreadcrumbContext"
import FormLayout from "@/layouts/FormsLayout"
import LandingLayout from "@/layouts/LandingLayout"
import Head from "next/head"
import { useEffect } from "react"
import JoinPharmacy from "@/components/JoinPharmacyRequest/JoinPharm"

export default function JoinPharmReq(){
    const { crumbs, setCrumbs } = useBreadcrumb()
        useEffect(() => {
          setCrumbs([
            { title: "الصفحة الرئيسية", link: "/" },
            { title: "انضمام لصيدلية", link: "/join-pharmacy-request" }
            ])
        }, [])
    return(
        <>
        <Head>
          <title> انضمام لصيدلية | شفاء</title>
          <meta
            name="description"
            content="قدم طلب انضمام لصيدلية من صيدليات."
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
              <JoinPharmacy />
            </FormLayout>
          </LandingLayout>
        </main>
       </> 
    )
}
