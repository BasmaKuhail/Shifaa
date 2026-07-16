import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import Input from "../register/input";
import { validateConfirmPassword, validateInput } from "@/utils/ValidateInput";
import GradientBtn from "../home/GradiantBtn";
import ImageProfile from "./Image";
import EditProfileSkeleton from "../Skeleton/EditProfileSkeleton";

import { useBreadcrumb } from "@/contexts/BreadcrumbContext"
import Link from "next/link";
import PetrolBtn from "../pharmacyDashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { showAlert } from "../alerts/AlertContainer";
import { changePassword, updateProfile } from "@/services/editProfile";
import axios from "axios";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

export default function EditProfile() {
    const {user, setUser, loading} = useContext(UserContext);

    if(loading){
        return <EditProfileSkeleton/>
    }

    const getInitialUserInfo = () => ({
        avatar : user?.avatar || null,
        firstName:  user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        mobileNum: user?.mobileNum || '',
        location: user?.location || '',
    });

    const [updatePasswordData, setUpdatePasswordData] = useState({
        current_password: '',
        password:'',
        password_confirmation:''
    })
    useEffect(() => {
        if (user) {
            setUserInfo(getInitialUserInfo())
        }
    }, [user]);

    const [userInfo, setUserInfo] = useState(getInitialUserInfo());
    const { setCrumbs } = useBreadcrumb()
    useEffect(() => {
        setCrumbs([
            { title: "الصفحة الرئيسية", link: "/" },
            { title: "تعديل الحساب", link: "/editProfile" }
        ])
    }, [])
    
    const [changePass, setChangePass] = useState(false);

    const changePasswordOnClick = async() => {
        if(
            !updatePasswordData.current_password.trim() ||
            !updatePasswordData.password.trim() ||
            !updatePasswordData.password_confirmation.trim()
        ){
            showAlert({
                type:"Warning",
                title:"تحذير",
                message: "يرجى ملأ جميع الحقول المتعلقة بتغير كلمة المرور"
            })
            return
        }
        try{
            console.log(updatePasswordData);
            await changePassword(updatePasswordData);
            showAlert({
                type:"Success",
                title:"Success",
                message: "تم تغير كلمة المرور بنجاح!"
            })
        }catch (error: unknown) {
            showAlert({
            type: "Error",
            title: "خطأ",
            message: getApiErrorMessage(error),
            });
        }
    };
    
    const updateProfileOnClick = async() => {
        try{
            await updateProfile({first_name: userInfo.firstName, last_name: userInfo.lastName, email: userInfo.email});
            if (user) {
                setUser({
                    ...user,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                });
            }
            showAlert({
                type:"Success",
                title:"Success",
                message: "تم تحديث المعلومات بنجاح!"
            })
        }catch (error: unknown) {
            showAlert({
            type: "Error",
            title: "خطأ",
            message: getApiErrorMessage(error),
            });
        }
    }
    return (
        <div dir="rtl" className="flex flex-col gap-5 md:gap-10 md:mt-0">
            <p className="font-semibold text-27px">إعدادات الحساب</p>
            <div className="flex flex-col w-full justify-center items-center gap-10">
                {/* <div className="flex flex-col gap-3">
                    <ImageProfile avatar={user?.avatar ? user.avatar : null}/>
                </div> */}
                        
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                    <Input 
                        label="الاسم الأول" 
                        type="text" 
                        inputText={user? user.firstName : ""} 
                        value={userInfo.firstName} 
                        onChange={(value) => setUserInfo({ ...userInfo, firstName: typeof value === 'string' ? value : ''})} 
                        isTrue={validateInput(userInfo.firstName, 'text').isValid} 
                    />
                    <Input 
                        label="الاسم الأخير" 
                        type="text" 
                        inputText="ادخل الاسم الأخير"
                        value={userInfo.lastName} 
                        onChange={(value) => setUserInfo({ ...userInfo, lastName: typeof value === 'string' ? value : ''})} 
                        isTrue={validateInput(userInfo.lastName, 'text').isValid} 
                    />
                    <Input 
                        label="البريد الالكتروني" 
                        type="text" inputText={user? user.email : ""} 
                        value={userInfo.email} onChange={(value) => setUserInfo({ ...userInfo, email: typeof value === 'string' ? value : '' })} 
                        isTrue={validateInput(userInfo.email, 'email').isValid} 
                    />   
                            {/* <Input 
                                label="رقم الهاتف" 
                                type="text" 
                                inputText="ادخل رقم هاتفك" 
                                value={userInfo.mobileNum} 
                                onChange={(value) => setUserInfo({ ...userInfo, mobileNum: typeof value === 'string' ? value : ''})}
                                isTrue={validateInput(userInfo.mobileNum, 'mobile').isValid}
                            /> */}
                            {/* <Input 
                                label="الموقع" 
                                type="text" 
                                inputText="ادخل موقعك"
                                value={userInfo.location} 
                                onChange={(value) => setUserInfo({ ...userInfo, location: typeof value === 'string' ? value : ''})} 
                                isTrue={validateInput(userInfo.location, 'text').isValid} 
                            /> */}
                </div>
                <div className="flex flex-row items-center gap-5 w-full justify-start">
                    <PetrolBtn text="حفظ التغيرات" onClick={updateProfileOnClick}/>
                    <Link href={"/"} className="underline text-sm text-gray-600"> إلغاء </Link>
                </div>

                <div className="flex flex-col w-full items-start justify-start gap-4">
                    <button 
                        onClick={() => setChangePass(true)} 
                        className="text-start w-fit text-black-500 underline cursor-pointer text-inpt"
                    >
                        تغير كلمة المرور؟
                    </button>
                    {changePass && 
                        <div className="flex flex-col justify-start items-center w-full gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                                <Input 
                                    label="كلمة المرور الحالية" 
                                    type="password" 
                                    inputText={updatePasswordData.current_password || "ادخل كلمة المرور الحالية"} 
                                    value={updatePasswordData.current_password} 
                                    onChange={(value) =>
                                                setUpdatePasswordData((prev) => ({
                                                ...prev,
                                                current_password: typeof value === "string" ? value : "",
                                                }))
                                            } 
                                    isTrue={true} 
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                                        <Input 
                                            label="كلمة المرور الجديدة" 
                                            type="password" 
                                            inputText={updatePasswordData.password || "ادخل كلمة المرور الجديدة"} 
                                            value={updatePasswordData.password} 
                                            onChange={(value) =>
                                                setUpdatePasswordData((prev) => ({
                                                ...prev,
                                                password: typeof value === "string" ? value : "",
                                                }))
                                            }
                                            isTrue={validateInput(updatePasswordData.password, 'password').isValid} 
                                        />
                                        <Input 
                                            label="تأكيد كلمة المرور الجديدة" 
                                            type="password" 
                                            inputText={updatePasswordData.password_confirmation || "تأكيد كلمة المرور الجديدة"} 
                                            value={updatePasswordData.password_confirmation} 
                                            onChange={(value) =>
                                                setUpdatePasswordData((prev) => ({
                                                ...prev,
                                                password_confirmation: typeof value === "string" ? value : "",
                                                }))
                                            }
                                            isTrue={validateInput(updatePasswordData.password_confirmation, 'password').isValid && validateConfirmPassword(updatePasswordData.password, updatePasswordData.password_confirmation)}
                                        />
                            </div>
                            <div className="flex flex-row items-center gap-5 w-full justify-start">
                                <PetrolBtn text="تغير كلمة المرور" onClick={() => changePasswordOnClick()}/>
                            </div>
                        </div>
                    }
                </div>       
            </div> 
        </div>
    )
}
