import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/pharmacyDashboard/PharmacyInfo/CardContainer";
import RequestInvitation from "@/components/requests&RecivedInvitations/RequestInvitation";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import FormLayout from "@/layouts/FormsLayout";
import LandingLayout from "@/layouts/LandingLayout";
import MainLayout from "@/layouts/MainLayout";
import { useEffect } from "react";

export default function RequestInvitationIndex(){
    const { crumbs, setCrumbs } = useBreadcrumb()
    useEffect(() => {
        setCrumbs([
            { title: "الصفحة الرئيسية", link: "/" },
            { title: "الطلبات والدعوات", link: "/requests&received-invitaions" }
        ])
        }, [])
    return(
        <LandingLayout>
            <div className="flex w-full mt-5">
                    <Breadcrumb breadcrumbArr={crumbs}/>
            </div>
            
            <div className="px-4 md:px-8 lg:px-20 xl:px-30 pt-40 pb-20 bg-blue-100">
                <Card scrollable>
                    <RequestInvitation/>
                </Card> 
            </div>

        </LandingLayout>

    )
}