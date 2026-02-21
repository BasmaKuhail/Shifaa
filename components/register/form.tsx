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

export default function Form({ isRegister }: { isRegister: boolean }) {

    const handleSubmit = async () => {
        try {
            const response = await register({
                first_name: userInfo.firstName,
                last_name: userInfo.lastName,
                email: userInfo.email,
                password: userInfo.password,
                password_confirmation: userInfo.confirmPassword,
            });
            console.log('Registration successful:', response);

            // Save token
            try {
                localStorage.setItem("token", response.data.token);
                console.log("Token saved to localStorage");
            } catch (storageError) {
                console.error("Failed to save token to localStorage:", storageError);
            }

            console.log("Registered:", response);
            router.push('/'); 

        } catch (error: any) {
            if (error.response?.status === 422) {
                console.log("Validation Errors:", error.response.data.errors);
            }

            if (error.response?.status === 401) {
                console.log("Invalid credentials");
                }

            console.log("General Error:", error.response?.data?.message);
        }
    }
    
    const router = useRouter();

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const submitOnClick = () => {
        // Handle form submission logic here
        if(isRegister){
            if (userInfo.firstName.trim() === '' || userInfo.lastName.trim() === '' || userInfo.email.trim() === '' || userInfo.password.trim() === '') {
                alert('يرجى ملأ جميع الحقول الفارغة');
                setError('يرجى ملأ جميع الحقول الفارغة');
                return false;
            }
            else if(userInfo.email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                setError('يرجى إدخال بريد إلكتروني صحيح');
                return false;
            }
            else if (userInfo.password !== userInfo.confirmPassword) {
                alert('كلمتا المرور غير متطابقتين');
                setError('كلمتا المرور غير متطابقتين');
                return false;
            }
            else if (userInfo.password.length < 8 || !/[A-Za-z]/.test(userInfo.password) || !/\d/.test(userInfo.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(userInfo.password)) {
                alert('كلمة المرور يجب أن تكون 8 أحرف انجليزية أو أكثر وتحتوي على مزيج من الأحرف والأرقام والرموز');
                setError('كلمة المرور يجب أن تكون 8 أحرف انجليزية أو أكثر وتحتوي على مزيج من الأحرف والأرقام والرموز');
                return false;
            }
            else {
                alert('تم التحقق من صحة البيانات.');
                setError('');
            }
        }else{
            if (userInfo.email.trim() === '' || userInfo.password.trim() === '') {
                alert('يرجى ملأ جميع الحقول الفارغة');
                setError('يرجى ملأ جميع الحقول الفارغة');
                return false;
            }else {
                alert('تم التحقق من صحة البيانات.');
                setError('');
            }
        }
        console.log('Form submitted with user info:', userInfo);
        setError('');
        return true;
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center ">
                <div className="md:w-full w-[90%] max-w-3xl flex flex-col items-start">
                    <div 
                        className="
                            bg-white rounded-normal w-full
                            px-10 md:px-36
                            py-10
                            flex flex-col gap-5 md:gap-10
                            mt-5 md:mt-0"
                    >
                        <div className="flex flex-col gap-1.5 items-center">
                            <Title title={isRegister ? 'انشاء حساب' : 'تسجيل الدخول'} />
                            {isRegister && <p className="mt-4 text-inpt">هل لديك حساب بالفعل؟ <Link href="/auth/login" className="font-bold hover:underline">تسجيل الدخول</Link></p>}
                        </div>
                        
                        <div className="flex flex-col gap-3 w-full ">
                            {isRegister && <div
                                className="flex flex-col gap-3 md:flex-row-reverse md:gap-6 justify-between w-full">
                                <div className="flex-1">
                                    <Input label="الاسم الأول" type="text" inputText="الاسم الأول" value={userInfo.firstName} onChange={(value) => setUserInfo({ ...userInfo, firstName: value })} />
                                </div>
                                <div className="flex-1">
                                    <Input label="الاسم الأخير" type="text" inputText="الاسم الأخير" value={userInfo.lastName} onChange={(value) => setUserInfo({ ...userInfo, lastName: value })} />
                                </div>
                            </div>}

                            <Input label="البريد الالكتروني" type="email" inputText="youremail.com" value={userInfo.email} onChange={(value) => setUserInfo({ ...userInfo, email: value })} />


                            <div className="flex flex-col gap-3 md:flex-row-reverse justify-between md:gap-6 w-full">
                                <div className="flex-1">
                                    <Input label="كلمة المرور" type="password" inputText="كلمة المرور" value={userInfo.password} onChange={(value) => setUserInfo({ ...userInfo, password: value })} />
                                </div>
                                {isRegister &&<div className="flex-1">
                                    <Input label="تأكيد كلمة المرور" type="password" inputText="تأكيد كلمة المرور" value={userInfo.confirmPassword} onChange={(value) => setUserInfo({ ...userInfo, confirmPassword: value })} />
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