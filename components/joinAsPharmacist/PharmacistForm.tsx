import { useContext, useEffect, useState } from "react";
import Input from "../register/input";
import { UserContext } from "@/contexts/UserContext";
import { validateInput } from "@/utils/registerValidation";
import PetrolBtn from "../PharmacyInfo/invitePopup/PetrolBtn";
import Link from "next/link";

import Image from "next/image";
import arrowL from "@/public/icons/switchToPharmacist/arrowL.svg";
import Breadcrumb from "../Breadcrumb";

import { useBreadcrumb } from "@/contexts/BreadcrumbContext"

export default function PharmacistForm(){
    const {user, loading} = useContext(UserContext);
    const handlePreviousPage = () => {
        window.history.back();
    };

    const getInitialUserInfo = () => ({
        fullName: user ? `${user.firstName} ${user.lastName}` : "",
        email: user?.email || "",
        IdVerification: null as File | null,
        pharmacyLicense: null as File | null,
        profileImage: null as File | null
    });
    const [userInfo, setUserInfo] = useState(getInitialUserInfo);

    const { setCrumbs  } = useBreadcrumb()
    useEffect(() => {getInitialUserInfo()}),[user]
    
    useEffect(() => {
        setCrumbs([
            { title: "الصفحة الرئيسية", link: "/" },
            { title: "انضمام كصيدلي", link: "/switch-to-pharmacist" }
        ])
    }, [])
    
    const { crumbs } = useBreadcrumb()
    {console.log(crumbs)}
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
                            isTrue={validateInput(userInfo.fullName, 'text')} 
                            editable={false}
                        />
                        <Input 
                            label="البريد الالكتروني" 
                            type="text" 
                            inputText={user? user.email : ""} 
                            value={userInfo.email} 
                            onChange={(value) => setUserInfo({ ...userInfo, email: typeof value === 'string' ? value : '' })} 
                            isTrue={validateInput(userInfo.email, 'text')} 
                            editable={false}
                        />
                        <Input 
                            label="صورة الهوية"
                            type="file"
                            inputText=""
                            value={userInfo.IdVerification}
                            onChange={(file) =>
                                setUserInfo({ ...userInfo, IdVerification: file as File | null })
                            }
                            isTrue={validateInput(userInfo.IdVerification, 'file')}
                        />                        
                        <Input 
                            label="مزاولة المهنة" 
                            type="file" 
                            inputText="" 
                            value={userInfo.pharmacyLicense} 
                            onChange={(file) => setUserInfo({ ...userInfo, pharmacyLicense: file as File | null})} 
                            isTrue={validateInput(userInfo.pharmacyLicense, 'file')}
                        />
                        <Input 
                            label="صورة شخصية" 
                            type="file" 
                            inputText="" 
                            value={userInfo.profileImage} 
                            onChange={(file) => setUserInfo({ ...userInfo, profileImage: file as File | null })} 
                            isTrue={validateInput(userInfo.profileImage, 'file')}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="confirm" name="confirm" className="w-4 h-4" />
                        <p className="text-12px">أؤكد أن هذه الوثائق تخصني وأن المعلومات دقيقة</p>
                    </div>
                    <div className="flex flex-row items-center gap-5 ">
                        <PetrolBtn text="تقديم الطلب" onClick={() => {}} />
                            <Link href={"/"} className="underline text-sm text-gray-600"> إلغاء </Link>
                    </div>
                    
                </div>

    )
}