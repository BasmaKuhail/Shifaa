import { useContext, useEffect, useState } from "react";
import Input from "../register/input";
import { UserContext } from "@/contexts/UserContext";
import { validateInput } from "@/utils/ValidateInput";
import Link from "next/link";

import Image from "next/image";
import arrowL from "@/public/icons/switchToPharmacist/arrowL.svg";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext"

import PetrolBtn from "../dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { useRouter } from "next/router";
import { showAlert } from "../alerts/AlertContainer";
import ErrorMsg from "../register/ErrorMsg";
import HasPharmacistApplication from "../joinAsPharmacist/HasForm";
import { createPharm } from "@/services/createPharmacy";
export default function CreatePharmacy(){

    const [checkBoxChecked, setCheckBoxChecked] = useState(false)
    
    const {user, loading} = useContext(UserContext);
    const handlePreviousPage = () => {
        window.history.back();
    };

    const getInitialUserInfo = () => ({
        fullName: user ? `${user.firstName} ${user.lastName}` : "",
        email: user?.email || "",
        name: "",
        phone: "",
        health_license: null as File | null,
        logo: null as File | null,
        address: ""

    });
    const [userInfo, setUserInfo] = useState(getInitialUserInfo);

    const { setCrumbs  } = useBreadcrumb()
    useEffect(() => {
        setUserInfo(getInitialUserInfo());
    },[user])
    
    useEffect(() => {
        setCrumbs([
            { title: "الصفحة الرئيسية", link: "/" },
            { title: "انشاء صيدلية", link: "/create-pharmacy" }
        ])
    }, [])
    const [submitLoading, setSubmitLoading] = useState(false);
    // const [isSubmited, setIsSubmited] = useState(false);
    
    const handleSubmitForm = async () => {
        setSubmitLoading(true);
        
        if (
            userInfo.phone === "" || 
            userInfo.health_license === null || 
            userInfo.name === "" ||
            userInfo.address === ""
             
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
        if (
            !(validateInput(userInfo.health_license, 'file').isValid &&
            validateInput(userInfo.name, 'text').isValid &&
            validateInput(userInfo.address, 'text').isValid &&
            validateInput(userInfo.phone, 'mobile').isValid) &&
            (userInfo.logo && validateInput(userInfo.logo, 'file').isValid )
        ) {
            console.log("sth went wrong")
            showAlert({
                type: "Error",
                title: "خطأ",
                message: "خطأ في البيانات المدخلة لأحد الحقول",
            });
            return
        }

    try {
        const res = await createPharm(userInfo.name, userInfo.phone, userInfo.health_license, userInfo.address, userInfo.logo);
        console.log(res);
        setSubmitLoading(false);
        showAlert({
            type: "Success",
            title: "تم تقديم الطلب بنجاح",
            message: "سيتم مراجعة طلبك خلال 3-5 أيام عمل",
        });
        setSubmitLoading(true)
        
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

    // if(user?.has_pharmacist_application || isSubmited){
    //     return <HasPharmacistApplication/>
    // }
    return(
        <div className="flex flex-col gap-10">
                    <nav className="flex items-center gap-4">
                        <Image src={arrowL} alt="arrow left" className="transform rotate-180 cursor-pointer hidden md:block" onClick={handlePreviousPage}/>
                        <p className="font-semibold text-27px">أنشئ صيدلية</p>
                    </nav>
                    <p className="text-sm">قدم طلب إنشاء صيدلية</p>

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
                        <div className="relative flex flex-col gap-1">
                            <Input 
                                label="اسم الصيدلية" 
                                type="text" 
                                inputText="ادخل اسم الصيدلية" 
                                value={userInfo.name} 
                                onChange={(value) => setUserInfo({ ...userInfo, name: typeof value === 'string' ? value : ''})}
                                isTrue={validateInput(userInfo.name, 'text').isValid}
                            />
                            <ErrorMsg text={validateInput(userInfo.name, 'text').errorMsg}/>
                        </div>
                        <div className="relative flex flex-col gap-1">
                            <Input 
                                label="ترخيص الصيدلية"
                                type="file"
                                inputText="رخصة الصيدلية"
                                value={userInfo.health_license}
                                onChange={(file) => setUserInfo({ ...userInfo, health_license: file as File | null})} 
                                isTrue={validateInput(userInfo.health_license, 'file').isValid}
                            /> 
                            <ErrorMsg text={validateInput(userInfo.health_license, 'file').errorMsg}/>  
                        </div>    
                        <div className="relative flex flex-col gap-1">
                            <Input 
                                label="الشعار"
                                type="file"
                                inputText="ارفق صورة الشعار"
                                value={userInfo.logo}
                                onChange={(file) => setUserInfo({ ...userInfo, logo: file as File | null})} 
                                isTrue={validateInput(userInfo.logo, 'file').isValid}
                            /> 
                            <ErrorMsg text={validateInput(userInfo.logo, 'file').errorMsg}/>  
                        </div> 
                        <div className="relative flex flex-col gap-1">
                        <Input 
                            label="رقم الهاتف" 
                            type="text" 
                            inputText="ادخل رقم هاتفك" 
                            value={userInfo.phone} 
                            onChange={(value) => setUserInfo({ ...userInfo, phone: typeof value === 'string' ? value : ''})}
                            isTrue={validateInput(userInfo.phone, 'mobile').isValid}
                        />
                        <ErrorMsg text={validateInput(userInfo.phone, 'mobile').errorMsg}/></div>
                        
                    </div>
                    <div className="relative flex flex-col gap-1">
                        <Input 
                            label="العنوان" 
                            type="text" 
                            inputText="مثال: غزة- الرمال- دوار السرايا - مقابل بنك فلسطين" 
                            value={userInfo.address} 
                            onChange={(value) => setUserInfo({ ...userInfo, address: typeof value === 'string' ? value : ''})}
                            isTrue={validateInput(userInfo.address, 'text').isValid}
                        />
                        <ErrorMsg text={validateInput(userInfo.address, 'text').errorMsg}/></div>
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