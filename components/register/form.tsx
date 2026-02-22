import { useState } from "react";
import { useRouter } from "next/router";

import ButtonFull from "./ButtonFull";
import GoogleBtn from "./GoogleBtn";
import Input from "./input";
import Title from "./Title";
import LanguageSelector from "./LangugeSelector";
import ButtonEmpty from "./ButtonEmpty";

import Link from "next/link";

import {register} from "@/services/auth";
import { validateRegister, validateInput, validateConfirmPassword } from "@/utils/registerValidation"


export default function Form({ isRegister }: { isRegister: boolean }) {
    const [userInfo, setUserInfo] = useState({
        firstName: { value: '', isTrueData: false },
        lastName: { value: '', isTrueData: false },
        email: { value: '', isTrueData: false },
        password: { value: '', isTrueData: false },
        confirmPassword: { value: '', isTrueData: false }
    });

    const handleSubmit = async () => {
        try {
            const response = await register({
                first_name: userInfo.firstName.value,
                last_name: userInfo.lastName.value,
                email: userInfo.email.value,
                password: userInfo.password.value,
                password_confirmation: userInfo.confirmPassword.value,
            });
            console.log('Registration successful:', response);

            // Save token
            try {
                localStorage.setItem("token", response.data.token);
                console.log("Token saved to localStorage");
            } catch (storageError) {
                alert("Failed to save token. Please check your browser settings.");
                console.error("Failed to save token to localStorage:", storageError);
            }

            console.log("Registered:", response);
            alert("تم التسجيل بنجاح! جاري إعادة التوجيه...");
            router.push('/'); 

        } catch (error: any) {
            if (error.response?.status === 422) {
                alert(error.response.data.message || "Validation error occurred");
                console.log("Validation Errors:", error.response.data.errors);
            }

            if (error.response?.status === 401) {
                alert("Invalid credentials. Please check your email and password.");
                console.log("Invalid credentials");
                }

            console.log("General Error:", error.response?.data?.message);
        }
    }
    
    const router = useRouter();

    
    const submitOnClick = () => {
        // Handle form submission logic here
        if(isRegister){
            const errorMessage = validateRegister({
                firstName: userInfo.firstName.value,
                lastName: userInfo.lastName.value,
                email: userInfo.email.value,
                password: userInfo.password.value,
                confirmPassword: userInfo.confirmPassword.value
            });
            if (errorMessage) {
                alert(errorMessage);
                return false;
            }
        }
        console.log('Form submitted with user info:', userInfo);
        return true;
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-blue-100">
                <div className="md:w-full w-[90%] max-w-3xl flex flex-col items-start">
                    <div 
                        className="
                            bg-white rounded-normal w-full
                            px-10 md:px-36
                            py-10
                            flex flex-col gap-5 md:gap-10
                            mt-5 md:mt-0
                            shadow-lg"
                    >
                        <div className="flex flex-col gap-1.5 items-center">
                            <Title title={isRegister ? 'انشاء حساب' : 'تسجيل الدخول'} />
                            {isRegister && <p className="mt-4 text-inpt">هل لديك حساب بالفعل؟ <Link href="/auth/login" className="font-bold hover:underline">تسجيل الدخول</Link></p>}
                        </div>
                        
                        <div className="flex flex-col gap-3 w-full ">
                            {isRegister && <div
                                className="flex flex-col gap-3 md:flex-row-reverse md:gap-6 justify-between w-full">
                                <div className="flex-1">
                                    <Input label="الاسم الأول" type="text" inputText="الاسم الأول" value={userInfo.firstName.value} onChange={(value) => setUserInfo({ ...userInfo, firstName: { value, isTrueData: true } })} isTrue={validateInput(userInfo.firstName.value, 'text')}/>
                                </div>
                                <div className="flex-1">
                                    <Input label="الاسم الأخير" type="text" inputText="الاسم الأخير" value={userInfo.lastName.value} onChange={(value) => setUserInfo({ ...userInfo, lastName: { value, isTrueData: true } })} isTrue={validateInput(userInfo.lastName.value, 'text')}/>
                                </div>
                            </div>}

                            <Input label="البريد الالكتروني" type="email" inputText="youremail.com" value={userInfo.email.value} onChange={(value) => setUserInfo({ ...userInfo, email: { value, isTrueData: true } })} isTrue={validateInput(userInfo.email.value, 'email')}/>


                            <div className="flex flex-col gap-3 md:flex-row-reverse justify-between md:gap-6 w-full">
                                <div className="flex-1">
                                    <Input label="كلمة المرور" type="password" inputText="كلمة المرور" value={userInfo.password.value} onChange={(value) => setUserInfo({ ...userInfo, password: { value, isTrueData: true } })} isTrue={validateInput(userInfo.password.value, 'password')}/>
                                </div>
                                {isRegister &&<div className="flex-1">
                                    <Input label="تأكيد كلمة المرور" type="password" inputText="تأكيد كلمة المرور" value={userInfo.confirmPassword.value} onChange={(value) => setUserInfo({ ...userInfo, confirmPassword: { value, isTrueData: true } })} isTrue={validateInput(userInfo.confirmPassword.value, 'password') && validateConfirmPassword(userInfo.password.value, userInfo.confirmPassword.value)}/>
                                </div>}
                            </div>
                            {isRegister &&<p className="text-xs md:text-inpt text-gray-500 text-right">استخدم 8 أحرف أو أكثر مع مزيج من الأحرف والأرقام والرموز</p>}
                            {!isRegister &&<p className="text-xs md:text-inpt text-right underline"><a className="cursor-pointer">نسيت كلمة المرور؟</a></p>}
                            {/* {error && <p className="text-red-500 text-sm text-right">{error}</p>} */}
                        </div>
                        <div className="flex flex-col items-center w-full gap-4">
                            <div className="w-full md:w-[70%] flex flex-col items-center gap-4">
                                <ButtonFull text={isRegister ? 'انشاء حساب' : 'تسجيل دخول'} onClick={() => { if (submitOnClick()) {handleSubmit();}}} />
                                <GoogleBtn text={isRegister ? "التسجيل باستخدام جوجل" : "المتابعة باستخدام جوجل"}/>
                            {!isRegister && <>
                                <div className="w-full flex items-center gap-3 mt-4"> 
                                    <hr className="flex-1 border-gray-300 border-1" /><p className="text-gray-500">جديد في مجتمعنا؟</p><hr className="flex-1 border-gray-300 border-1" />
                                </div>
                                
                                <ButtonEmpty text= "انشاء حساب" onClick={() => {router.push('/auth/signup')}} />
                            </>}
                            </div>
                            {isRegister && <p className="text-xs md:text-12px text-center underline md:no-underline">بالاستمرار، فإنك توافق على شروط الاستخدام وسياسة الخصوصية</p>}

                                
                        </div>
                        
                    </div>
                    <LanguageSelector/>
                </div>
            </div>
        </>
    )
}