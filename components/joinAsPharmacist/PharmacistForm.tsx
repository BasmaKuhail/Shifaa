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
export default function PharmacistForm(){

    const [checkBoxChecked, setCheckBoxChecked] = useState(false)
  
    
    const {user, loading} = useContext(UserContext);
    const handlePreviousPage = () => {
        window.history.back();
    };

    const getInitialUserInfo = () => ({
        fullName: user ? `${user.firstName} ${user.lastName}` : "",
        email: user?.email || "",
        IdVerification: null as File | null,
        pharmacyLicense: null as File | null,
        profileImage: null as File | null,
        serialNumber: ""
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
    if (userInfo.serialNumber === "") {
        alert("يجب تعبئة البيانات المطلوبة");
        return;
    }

    if (!checkBoxChecked) {
        alert("يجب التأكيد على أن هذه الوثائق تخصك");
        return;
    }

    try {
        const res = await switchToPharmasist(userInfo.serialNumber);
        console.log(res);
    } catch (err: any) {
        console.log(err.response?.data); 
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
                            value={userInfo.IdVerification}
                            onChange={(file) => setUserInfo({ ...userInfo, pharmacyLicense: file as File | null})} 
                            isTrue={validateInput(userInfo.IdVerification, 'file').isValid}
                        />                        
                        <Input 
                            label="مزاولة المهنة" 
                            type="file" 
                            inputText="" 
                            value={userInfo.pharmacyLicense} 
                            onChange={(file) => setUserInfo({ ...userInfo, pharmacyLicense: file as File | null})} 
                            isTrue={validateInput(userInfo.pharmacyLicense, 'file').isValid}
                        />
                        <Input 
                            label="صورة شخصية" 
                            type="file" 
                            inputText="" 
                            value={userInfo.profileImage} 
                            onChange={(file) => setUserInfo({ ...userInfo, profileImage: file as File | null })} 
                            isTrue={validateInput(userInfo.profileImage, 'file').isValid}
                        />
                        <Input 
                            label="رقم الرخصة" 
                            type="text" 
                            inputText="ادخل رقم رخصتك كصيدلي" 
                            value={userInfo.serialNumber} 
                            onChange={(value) => setUserInfo({ ...userInfo, serialNumber: typeof value === 'string' ? value : ''})}
                            isTrue={validateInput(userInfo.serialNumber, 'text').isValid}
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