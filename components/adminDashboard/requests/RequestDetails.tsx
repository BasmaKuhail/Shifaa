import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/dashboard/PharmacyInfo/CardContainer";
import PetrolBtn from "@/components/dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { ApplicationFile, PharmacistApplication, PharmacyApplication } from "@/types/PharmacistApplication";
import { useContext, useEffect, useState } from "react";
import PopUp from "./InteractRequestPopup";
import FileViewer from "./FileViewer";
import EmptyPetrolBtn from "./EpmtyPetrolBtn";
import Input from "@/components/register/input";
import { showAlert } from "@/components/alerts/AlertContainer";
import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";
import { AdminPharmacyRequestContext } from "@/contexts/AdminPharmcyRequestsContext";
type requestDetailsProps = {
    request?: PharmacistApplication | PharmacyApplication,
    type: "pharmacist" | "pharmacy"
}

export default function RequestDetails({request : initialRequest, type }: requestDetailsProps) {
    const { crumbs, setCrumbs } = useBreadcrumb();

    const { getRequestById } = useContext(AdminRequestContext);
    const { getPharmRequestById } = useContext(AdminPharmacyRequestContext);
    console.log(initialRequest)
    const request =
        initialRequest?.id !== undefined
            ? type === "pharmacist"
                ? getRequestById(initialRequest.id) ?? initialRequest
                : getPharmRequestById(initialRequest.id) ?? initialRequest
            : undefined;
    const pharmacistRequest =
    type === "pharmacist" ? request as PharmacistApplication | undefined : undefined;

    const pharmacyRequest =
        type === "pharmacy" ? request as PharmacyApplication | undefined : undefined;

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
                    {typeof c2 === "string" && <p className="text-btn">{c2}</p>}
                    {typeof c2 === "object" && <FileViewer file={c2} label={c1} id={c2.id} />}
                </div>


            </div>
        )
    }
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
                        {type === "pharmacist" ?(
                            <div>
                                <Columen c1="اسم العميل" c2={pharmacistRequest?.name} />
                                <Columen c1="البريد الإلكتروني" c2={pharmacistRequest?.email} />
                                <Columen c1="تاريخ الطلب" c2={pharmacistRequest?.date} />
                                <Columen c1="رقم الهاتف" c2={pharmacistRequest?.phone_number} />
                                <Columen c1="ملف الهوية" c2={pharmacistRequest?.identity_document} />
                                <Columen c1="الصورة الشخصية" c2={pharmacistRequest?.personal_photo} />
                                <Columen c1="شهادة الترخيص" c2={pharmacistRequest?.license_certificate} />
                                <Columen c1="الحالة" c2={pharmacistRequest?.status} />
                            </div>)
                            :(
                                <div>
                                    <Columen c1="اسم الصيدلية" c2={pharmacyRequest?.pharmacy_name} />
                                    <Columen c1="اسم الصيدلي" c2={pharmacyRequest?.pharmacist_name} />
                                    <Columen c1="تاريخ الطلب" c2={pharmacyRequest?.date} />
                                    <Columen c1="رقم الهاتف" c2={pharmacyRequest?.phone_number} />
                                    <Columen c1="العنوان" c2={pharmacyRequest?.address} />
                                    <Columen c1="ترخيص الصيدلية" c2={pharmacyRequest?.health_license} />
                                    <Columen c1="شعار الصيدلية" c2={pharmacyRequest?.logo} />
                                    <Columen c1="الحالة" c2={pharmacyRequest?.status} />
                                </div>
                            )
                            }

                    </div>
                    {showPopup && request && 
                        <PopUp 
                            id={request.id} 
                            popupType={popupType} 
                            type = {type}
                            setShowPopup={setShowPopup} 
                            name={type === "pharmacist"? pharmacistRequest?.name : pharmacyRequest?.pharmacy_name} 
                            rejectMsg={String(rejectReason ?? "")}
                        />
                    }
                    {(request?.status === "pending") && <>
                        <div className="flex flex-col">
                            <Input 
                                editable={true} 
                                type="textarea" 
                                label="سبب الرفض" 
                                inputText="مثال: الصورة الهوية غير واضحة" 
                                value={rejectReason} 
                                isTrue={true} 
                                onChange={(value) => setRejectReason(String(value ?? ""))}
                            />
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