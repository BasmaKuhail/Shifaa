import { useContext, useEffect, useState } from "react";
import Input from "../register/input";
import { UserContext } from "@/contexts/UserContext";
import { validateInput } from "@/utils/ValidateInput";
import Link from "next/link";

import Image from "next/image";
import arrowL from "@/public/icons/switchToPharmacist/arrowL.svg";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext"


import {switchToPharmasist} from "@/services/switchToPharmacist"
import PetrolBtn from "../dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { useRouter } from "next/router";
import { showAlert } from "../alerts/AlertContainer";
import HasPharmacistApplication from "./HasForm";
import ErrorMsg from "../register/ErrorMsg";
export default function PharmacistForm(){

    const [checkBoxChecked, setCheckBoxChecked] = useState(false)
    
    const router = useRouter();
    
    const {user, loading} = useContext(UserContext);
    const handlePreviousPage = () => {
        window.history.back();
    };

    const getInitialUserInfo = () => ({
        fullName: user ? `${user.firstName} ${user.lastName}` : "",
        email: user?.email || "",
        identity_document: null as File | null,
        phone_number: "",
        license_certificate: null as File | null,
        personal_photo: null as File | null,
    });
    const [userInfo, setUserInfo] = useState(getInitialUserInfo);

    const { setCrumbs  } = useBreadcrumb()
    useEffect(() => {
        setUserInfo(getInitialUserInfo());
    },[user])
    
    useEffect(() => {
        setCrumbs([
            { title: "الصفحة الرئيسية", link: "/" },
            { title: "انضمام كصيدلي", link: "/switch-to-pharmacist" }
        ])
    }, [])
    const [submitLoading, setSubmitLoading] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);
    
    const handleSubmitForm = async () => {
        setSubmitLoading(true);
        if (
            !(validateInput(userInfo.identity_document, 'file').isValid &&
            validateInput(userInfo.license_certificate, 'file').isValid &&
            validateInput(userInfo.personal_photo, 'file').isValid &&
            validateInput(userInfo.phone_number, 'mobile').isValid)  
        ) {
            console.log("sth went wrong")
            showAlert({
                type: "Error",
                title: "خطأ",
                message: "خطأ في البيانات المدخلة لأحد الحقول",
            });
            return
        }
        if (
            userInfo.phone_number === "" || 
            userInfo.identity_document === null || 
            userInfo.license_certificate === null || 
            userInfo.personal_photo === null
             
        ) {
            showAlert({
                type: "Warning",
                title: "تحذير",
                message: "يجب تعبئة البيانات المطلوبة",
            });
            return;
        }
        if (!checkBoxChecked) {
            showAlert({
                type: "Warning",
                title: "تحذير",
                message: "يجب التأكيد على أن هذه الوثائق تخصك",
            });
            console.log(userInfo);

            return;
        }


    try {
        const res = await switchToPharmasist(userInfo.identity_document, userInfo.phone_number, userInfo.license_certificate, userInfo.personal_photo);
        console.log(res);
        setSubmitLoading(false);
        showAlert({
            type: "Success",
            title: "تم تقديم الطلب بنجاح",
            message: "سيتم مراجعة طلبك خلال 3-5 أيام عمل",
        });
        setIsSubmited(true)
        
    } catch (err: any) {
        console.log(err.response?.data);
        showAlert({
            type: "Error",
            title: "خطأ",
            message: err.response?.data.message || "حدث خطأ غير متوقع",
        });

    }
};
    const { crumbs } = useBreadcrumb()

    if(user?.has_pharmacist_application || isSubmited){
        return <HasPharmacistApplication/>
    }
    return(
        <div className="flex flex-col gap-10">
                    <nav className="flex items-center gap-4">
                        <Image src={arrowL} alt="arrow left" className="transform rotate-180 cursor-pointer hidden md:block" onClick={handlePreviousPage}/>
                        <p className="font-semibold text-27px">انضم كصيدلي</p>
                    </nav>
                    <p className="text-sm">قدم طلب للانضمام كصيدلي</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 w-full">
                        <Input 
                            label="الاسم" 
                            type="text" 
                            inputText={user? userInfo.fullName : ""} 
                            value={userInfo.fullName} 
                            onChange={(value) => setUserInfo({ ...userInfo, fullName: typeof value === 'string' ? value : '' })} 
                            isTrue={validateInput(userInfo.fullName, 'text').isValid} 
                            editable={false}
                        />
                        <Input 
                            label="البريد الالكتروني" 
                            type="text" 
                            inputText={user? user.email : ""} 
                            value={userInfo.email} 
                            onChange={(value) => setUserInfo({ ...userInfo, email: typeof value === 'string' ? value : '' })} 
                            isTrue={validateInput(userInfo.email, 'email').isValid} 
                            editable={false}
                        />
                        <ErrorMsg text={validateInput(userInfo.email, 'email').errorMsg}/>
                        <div className="relative flex flex-col gap-1">
                            <Input 
                                label="صورة الهوية"
                                type="file"
                                inputText=""
                                value={userInfo.identity_document}
                                onChange={(file) => setUserInfo({ ...userInfo, identity_document: file as File | null})} 
                                isTrue={validateInput(userInfo.identity_document, 'file').isValid}
                            /> 
                            <ErrorMsg text={validateInput(userInfo.identity_document, 'file').errorMsg}/>  
                        </div>    
                        <div className="relative flex flex-col gap-1">                 
                            <Input 
                                label="مزاولة المهنة" 
                                type="file" 
                                inputText="" 
                                value={userInfo.license_certificate} 
                                onChange={(file) => setUserInfo({ ...userInfo, license_certificate: file as File | null})} 
                                isTrue={validateInput(userInfo.license_certificate, 'file').isValid}
                            />
                            <ErrorMsg text={validateInput(userInfo.license_certificate, 'file').errorMsg}/>
                        </div>
                        <div className="relative flex flex-col gap-1">
                            <Input 
                                label="صورة شخصية" 
                                type="file" 
                                inputText="" 
                                value={userInfo.personal_photo} 
                                onChange={(file) => setUserInfo({ ...userInfo, personal_photo: file as File | null })} 
                                isTrue={validateInput(userInfo.personal_photo, 'file').isValid}
                            />
                            <ErrorMsg text={validateInput(userInfo.personal_photo, 'file').errorMsg}/>
                        </div>
                        <div className="relative flex flex-col gap-1">
                        <Input 
                            label="رقم الهاتف" 
                            type="text" 
                            inputText="ادخل رقم هاتفك" 
                            value={userInfo.phone_number} 
                            onChange={(value) => setUserInfo({ ...userInfo, phone_number: typeof value === 'string' ? value : ''})}
                            isTrue={validateInput(userInfo.phone_number, 'mobile').isValid}
                        />
                        <ErrorMsg text={validateInput(userInfo.phone_number, 'mobile').errorMsg}/></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input checked={checkBoxChecked} onChange={() => {setCheckBoxChecked(!checkBoxChecked)}} type="checkbox" id="confirm" name="confirm" className="w-4 h-4" />
                        <p className="text-12px">أؤكد أن هذه الوثائق تخصني وأن المعلومات دقيقة</p>
                    </div>
                    <div className="flex flex-row items-center gap-5 ">
                        <PetrolBtn text={submitLoading? "جاري التسليم": "تقديم الطلب"} onClick={handleSubmitForm} />
                        <Link href={"/"} className="underline text-sm text-gray-600"> إلغاء </Link>
                    </div>
                </div>

    )
}