import Breadcrumb from "@/components/Breadcrumb";
import Btn from "@/components/dashboard/PharmacyInfo/Btn";
import Card from "@/components/dashboard/PharmacyInfo/CardContainer";
import PetrolBtn from "@/components/dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { PharmacistApplication } from "@/types/PharmacistApplication";
import { useEffect, useState } from "react";
import PopUp from "./InteractRequestPopup";

type requestDetailsProps = {
    request?: PharmacistApplication}

export default function RequestDetails({request}: requestDetailsProps) {
    {console.log(request)}
        const { crumbs, setCrumbs } = useBreadcrumb()
        useEffect(() => {
            setCrumbs([
                { title: "الطلبات", link: "/admin-dashboard/requests" },
                { title: "تفاصيل الطلب", link: `/admin-dashboard/requests/${request?.id}` }
            ])
        }, [request])
    const [showPopup, setShowPopup] = useState(false);
    const [isAccept, setIsAccept] = useState(true);

    const Columen = ({c1,c2}:{c1:string, c2:string | File | undefined}) => {
        return(
            <div className="flex flex-row gap-2 border-t border-black-200">
                <div className="p-2 border-l border-black-200 w-[20%]">
                    <p className="text-btn font-[500]">{c1}</p>
                </div>
                <div className="p-2">
                    <p className="text-btn">{typeof c2 === "string" ? c2 : c2?.url}</p>
                </div>
                

            </div>
        )
    }
    console.log(request?.identity_document)
    return(
        <div dir="rtl" className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <Breadcrumb breadcrumbArr={crumbs}/>
            <Card scrollable>
                <div className="flex w-full flex-col gap-5">
                    <div className="flex flex-col border border-black-200 rounded-[10px]">
                        <div className="bg-blue-1000 text-white p-5 font-[500] text-21px rounded-t-[10px] border-b border-black-200">تفاصيل الطلب</div>
                        <div className="">
                            <Columen c1="اسم العميل" c2={request?.name} />
                            <Columen c1="البريد الإلكتروني" c2={request?.email} />
                            {/* <Columen c1="تاريخ الطلب" c2={request?.date} /> */}
                            <Columen c1="رقم الرخصة" c2={request?.licenseNumber} />
                            <Columen c1="ملف الهوية" c2={request?.identity_document} />
                            <Columen c1="الصورة الشخصية" c2={request?.personal_photo} />
                            <Columen c1="شهادة الترخيص" c2={request?.license_certificate} />
                            <Columen c1="الحالة" c2={request?.status} />
                        </div>
                    </div>
                    {showPopup && request && <PopUp id={request.id} isAccept={isAccept} setShowPopup={setShowPopup}/>}
                    
                    <div className="flex flex-row gap-3 items-center">
                        <PetrolBtn text="قبول الطلب" onClick={() => {setIsAccept(prev => true); setShowPopup(true)}}/>
                        <PetrolBtn text="رفض الطلب" onClick={() => {setIsAccept(prev => false); setShowPopup(true)}}/>
                    </div>
                    
                </div>

            </Card>
        </div>

    )
}