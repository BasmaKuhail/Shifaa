import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/dashboard/PharmacyInfo/CardContainer";
import PetrolBtn from "@/components/dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { ApplicationFile, PharmacistApplication } from "@/types/PharmacistApplication";
import { useEffect, useState } from "react";
import PopUp from "./InteractRequestPopup";
import FileViewer from "./FileViewer";
import EmptyPetrolBtn from "./EpmtyPetrolBtn";
import Input from "@/components/register/input";
import { showAlert } from "@/components/alerts/AlertContainer";
import { tr } from "framer-motion/client";
type requestDetailsProps = {
    request?: PharmacistApplication
}

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
    const [popupType, setType] = useState<"reject" | "delete" | "accept" | null>(null);

    const [rejectReason, setRejectReason] = useState("");
    const Columen = ({c1,c2}:{c1:string, c2:ApplicationFile | string | undefined}) => {
        return(
            <div className="flex flex-row gap-2 border-t border-black-200">
                <div className="p-2 px-3 border-l border-black-200 w-[20%]">
                    <p className="text-btn font-[500]">{c1}</p>
                </div>
                <div className="p-2">
                    {typeof c2 === "string" && <p className="text-btn">  {c2}</p>}
                    {typeof c2 === "object" && <FileViewer file={c2} label={c1} id={c2.id} />}
                </div>


            </div>
        )
    }
    console.log(request?.identity_document)
    const checkRejectMsg = () => {
        if(rejectReason === ""){
            showAlert({
                type: "Warning",
                title: "تحذير",
                message: "يجب تعبئة خانة رسالة الرفض"
            })
            return false;
        }
        return true;
    }
    return(
        <div dir="rtl" className="flex flex-col gap-10 mt-13 mb-40 xl:w-[80%] lg:w-full">
            <div className="flex flex-row gap-2 items-center">
                {/* <Link href="/admin-dashboard/requests">
                    <Image src={leftAttow} alt="arrow left" className="rotate-180"/>
                </Link> */}
                <p className="text-27px font-[500]">تفاصيل الطلب</p>
            </div>
            <Breadcrumb breadcrumbArr={crumbs}/>
            <Card scrollable>
                <div className="flex w-full flex-col gap-5 ">
                    <div className="flex flex-col border border-black-200 rounded-[10px]">
                        <div className="bg-blue-1000 text-white px-3 py-4 font-[500] text-21px rounded-t-[10px] border-b border-black-200">تفاصيل الطلب</div>
                        <div className="">
                            <Columen c1="اسم العميل" c2={request?.name} />
                            <Columen c1="البريد الإلكتروني" c2={request?.email} />
                            <Columen c1="تاريخ الطلب" c2={request?.date} />
                            <Columen c1="رقم الهاتف" c2={request?.phone_number} />
                            <Columen c1="ملف الهوية" c2={request?.identity_document} />
                            <Columen c1="الصورة الشخصية" c2={request?.personal_photo} />
                            <Columen c1="شهادة الترخيص" c2={request?.license_certificate} />
                            <Columen c1="الحالة" c2={request?.status} />
                        </div>
                    </div>
                    {showPopup && request && <PopUp id={request.id} popupType={popupType} setShowPopup={setShowPopup} name={request.name} rejectMsg={String(rejectReason ?? "")}/>}
                    {!(request?.status === "active") && <>
                        <div className="flex flex-col">
                            <Input editable={true} type="textarea" label="سبب الرفض" inputText="مثال: الصورة الهوية غير واضحة" value={rejectReason} isTrue={true} onChange={(value) => setRejectReason(String(value ?? ""))}/>
                        </div>

                        <div className="flex flex-row gap-3 items-center">
                            <PetrolBtn text="قبول الطلب" onClick={() => {setType("accept"); setShowPopup(true)}}/>
                            <EmptyPetrolBtn text="رفض الطلب" onClick={() => {setType("reject"); checkRejectMsg() ? setShowPopup(true) : () => {}}}/>
                        </div>
                    </>}
                    
                </div>

            </Card>
        </div>

    )
}