import { useContext, useState } from "react";
import Input from "../register/input";
import { UserContext } from "@/contexts/UserContext";
import { validateInput } from "@/utils/registerValidation";
import PetrolBtn from "../PharmacyInfo/invitePopup/PetrolBtn";
import Link from "next/link";

import Image from "next/image";
import arrowL from "@/public/icons/switchToPharmacist/arrowL.svg";

export default function PharmacistForm(){
    const {user, loading} = useContext(UserContext);
    const handlePreviousPage = () => {
        window.history.back();
    };
    const [userInfo, setUserInfo] = useState({
            fullName: user?.firstName + " " + user?.lastName || "",
            email: user?.email || "",
            IdVerification : { value: "", isTrueData: false },
            pharmacyLicense: { value: "", isTrueData: false },
        });
    return(
        <div dir="rtl" className="bg-blue-100 w-full flex flex-col pb-20 py-20 items-center justify-center min-h-screen">
            <div 
                className="
                    bg-white rounded-normal md:w-[70%] lg:[65%] w-[90%] 
                    px-10 
                    py-10
                    flex flex-col gap-5 md:gap-10
                    md:mt-0
                    shadow-lg"
                >
                    <nav className="flex items-center gap-4">
                        <Image src={arrowL} alt="arrow left" className="transform rotate-180 cursor-pointer hidden md:block" onClick={handlePreviousPage}/>
                        <p className="font-semibold text-27px">انضم كصيدلي</p>
                    </nav>
                    <p className="text-sm">قدم طلب للانضمام كصيدلي</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 w-full">
                        <Input label="الاسم" type="text" inputText={user? userInfo.fullName : ""} value={userInfo.fullName} onChange={(value) => setUserInfo({ ...userInfo, fullName: value })} isTrue={validateInput(userInfo.fullName, 'text')}/>
                        <Input label="البريد الالكتروني" type="text" inputText={user? user.email : ""} value={userInfo.email} onChange={(value) => setUserInfo({ ...userInfo, email: value })} isTrue={validateInput(userInfo.email, 'text')}/>
                        <div className="flex flex-col gap-1">
                            <Input label="صورة الهوية" type="file" inputText=""  value={userInfo.IdVerification.value} onChange={(value) => setUserInfo({ ...userInfo, IdVerification: { value, isTrueData: true } })} isTrue={userInfo.IdVerification.isTrueData}/>
                            <p className="text-12px ">ارفق صورة لنفسك ممسكًا بهويتك بجانب وجهك</p>
                        </div>
                        
                        <Input label="رخصتك كصيدلي" type="file" inputText="" value={userInfo.pharmacyLicense.value} onChange={(value) => setUserInfo({ ...userInfo, pharmacyLicense: { value, isTrueData: true } })} isTrue={userInfo.pharmacyLicense.isTrueData}/>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="confirm" name="confirm" className="w-4 h-4" />
                        <p className="text-12px">أؤكد أن هذه الوثائق تخصني وأن المعلومات دقيقة</p>
                    </div>
                    <div className="flex flex-row items-center gap-3 ">
                        <PetrolBtn text="تقديم الطلب" onClick={() => {}} />
                            <Link href={"/"} className="underline text-sm text-gray-600"> إلغاء </Link>
                    </div>
                    
                </div>

        </div>
    )
}