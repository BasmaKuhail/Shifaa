import { useContext, useEffect, useState } from "react";
import Input from "../register/input";
import { UserContext } from "@/contexts/UserContext";
import { validateInput } from "@/utils/ValidateInput";
import Link from "next/link";

import Image from "next/image";
import arrowL from "@/public/icons/switchToPharmacist/arrowL.svg";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext"


import {switchToPharmasist} from "@/services/auth"
import PetrolBtn from "../dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { useRouter } from "next/router";
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
        license_number: "",
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
    
    const handleSubmitForm = async () => {
    if (userInfo.identity_document === null || userInfo.license_certificate === null || userInfo.personal_photo === null) {
        alert("يجب تعبئة البيانات المطلوبة");

        return;
    }

    if (!checkBoxChecked) {
        alert("يجب التأكيد على أن هذه الوثائق تخصك");
                console.log(userInfo);

        return;
    }

    try {
        const res = await switchToPharmasist(userInfo.identity_document, userInfo.license_certificate, userInfo.personal_photo, userInfo.license_number);
        console.log(res);
        alert(res.message || "تم تقديم طلبك بنجاح، سيتم مراجعة طلبك خلال 3-5 أيام عمل");
        router.push("/");
    } catch (err: any) {
        console.log(err.response?.data);
        alert(err.response?.data.message || "حدث خطأ غير متوقع");

    }
};
    const { crumbs } = useBreadcrumb()
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
                            isTrue={validateInput(userInfo.email, 'text').isValid} 
                            editable={false}
                        />
                        <Input 
                            label="صورة الهوية"
                            type="file"
                            inputText=""
                            value={userInfo.identity_document}
                            onChange={(file) => setUserInfo({ ...userInfo, identity_document: file as File | null})} 
                            isTrue={validateInput(userInfo.identity_document, 'file').isValid}
                        />                        
                        <Input 
                            label="مزاولة المهنة" 
                            type="file" 
                            inputText="" 
                            value={userInfo.license_certificate} 
                            onChange={(file) => setUserInfo({ ...userInfo, license_certificate: file as File | null})} 
                            isTrue={validateInput(userInfo.license_certificate, 'file').isValid}
                        />
                        <Input 
                            label="صورة شخصية" 
                            type="file" 
                            inputText="" 
                            value={userInfo.personal_photo} 
                            onChange={(file) => setUserInfo({ ...userInfo, personal_photo: file as File | null })} 
                            isTrue={validateInput(userInfo.personal_photo, 'file').isValid}
                        />
                        <Input 
                            label="رقم الرخصة" 
                            type="text" 
                            inputText="ادخل رقم رخصتك كصيدلي" 
                            value={userInfo.license_number} 
                            onChange={(value) => setUserInfo({ ...userInfo, license_number: typeof value === 'string' ? value : ''})}
                            isTrue={validateInput(userInfo.license_number, 'text').isValid}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input checked={checkBoxChecked} onChange={() => {setCheckBoxChecked(!checkBoxChecked)}} type="checkbox" id="confirm" name="confirm" className="w-4 h-4" />
                        <p className="text-12px">أؤكد أن هذه الوثائق تخصني وأن المعلومات دقيقة</p>
                    </div>
                    <div className="flex flex-row items-center gap-5 ">
                        <PetrolBtn text="تقديم الطلب" onClick={handleSubmitForm} />
                            <Link href={"/"} className="underline text-sm text-gray-600"> إلغاء </Link>
                    </div>
                    
                </div>

    )
}