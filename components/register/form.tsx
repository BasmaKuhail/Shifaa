import { useState } from "react";
import { useRouter } from "next/router";

import ButtonFull from "./ButtonFull";
import GoogleBtn from "./GoogleBtn";
import Input from "./input";
import Title from "./Title";
import ButtonEmpty from "./ButtonEmpty";

import Link from "next/link";

import {register, login} from "@/services/auth";
import { validateRegister, validateLogin } from "@/utils/ValidateForms"
import { validateInput, validateConfirmPassword} from "@/utils/ValidateInput";

export default function Form({ isRegister }: { isRegister: boolean }) {

    const router = useRouter();

    const [userInfo, setUserInfo] = useState({
        firstName: { value: '', isTrueData: false, errorMsg: '' },
        lastName: { value: '', isTrueData: false, errorMsg: '' },
        email: { value: '', isTrueData: false, errorMsg: '' },
        password: { value: '', isTrueData: false, errorMsg: '' },
        confirmPassword: { value: '', isTrueData: false, errorMsg: '' }
    });

    const handleSubmit = async () => {
        try {
            let response;

            if (isRegister) {
                response = await register({
                    first_name: userInfo.firstName.value,
                    last_name: userInfo.lastName.value,
                    email: userInfo.email.value,
                    password: userInfo.password.value,
                    password_confirmation: userInfo.confirmPassword.value,
                });
            } else {
                response = await login({
                    email: userInfo.email.value,
                    password: userInfo.password.value,
                });
            }

            console.log("Success:", response);

            // Save token
            const token = response.data.token;
            const user = response.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            
            router.push("/");

        } catch (error: any) {

            if (error.response?.status === 422 || error.response?.status === 401) {
                alert(error.response.data.message);
                console.log("Validation Errors:", error.response.data.errors);
            } else if (error.response?.status === 500) {
                alert("حدث خطأ في الخادم، حاول مرة أخرى");
                console.log("Validation Errors:", error.response.data.errors);
            } else {
                alert("حدث خطأ غير متوقع");
            }
            console.log("Error:", error.response?.data);
        }
    };
    
    
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
                alert(errorMessage.errorMsg);
                return false;
            }
        }else{
            const loginErrorMsg = validateLogin({email:userInfo.email.value, password:userInfo.password.value});
            if (loginErrorMsg) {
                return false;
            }
        }
        console.log('Form submitted with user info:', userInfo);
        return true;
    }
    
    return (
        <div dir="rtl" className="flex flex-col gap-2 md:gap-5">
            <div className="flex flex-col gap-1.5 items-center">
                <Title title={isRegister ? 'انشاء حساب' : 'تسجيل الدخول'} />
                {isRegister && <p className="mt-4 text-inpt">هل لديك حساب بالفعل؟ <Link href="/auth/login" className="font-bold hover:underline">تسجيل الدخول</Link></p>}
             </div>
                        
            <div className="flex flex-col gap-3 w-full ">
                {isRegister && <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 md:flex-row md:gap-6 justify-between w-full">
                        {/* nombers are not accepted as name */} 
                        <Input 
                            label="الاسم الأول" 
                            type="text" 
                            inputText="الاسم الأول" 
                            value={userInfo.firstName.value} 
                            onChange={(value) =>{ setUserInfo({ ...userInfo, firstName: {...userInfo. firstName,  value: value as string}})}} 
                            isTrue={validateInput(userInfo.firstName.value, 'text').isValid} 
                            errorMsg={userInfo.firstName.value? validateInput(userInfo.firstName.value, 'text').errorMsg : ""}
                            isRegister={isRegister}
                        />
                        {/* <p >{userInfo.firstName.errorMsg}</p> */}
                        <Input 
                            label="الاسم الأخير" 
                            type="text" 
                            inputText="الاسم الأخير" 
                            value={userInfo.lastName.value} 
                            onChange={(value) => setUserInfo({ ...userInfo, lastName: { ...userInfo. lastName, value: value as string}})} 
                            isTrue={validateInput(userInfo.lastName.value, 'text').isValid} 
                            errorMsg={userInfo.lastName.value? validateInput(userInfo.lastName.value, 'text').errorMsg : ""}
                            isRegister={isRegister}
                        />
                    </div>
                }

                <Input 
                    label="البريد الالكتروني" 
                    type="email" 
                    inputText="youremail@domain.com" 
                    value={userInfo.email.value} 
                    onChange={(value) => setUserInfo({ ...userInfo, email: { ...userInfo. email, value : value as string }})} 
                    isTrue={validateInput(userInfo.email.value, 'email').isValid} 
                    errorMsg={userInfo.email.value? validateInput(userInfo.email.value, 'email').errorMsg : ""}
                    isRegister={isRegister}
                />


                <div className={`grid grid-cols-1 gap-3 md:flex-row-reverse md:gap-6 justify-between w-full ${isRegister ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                    <Input 
                        label="كلمة المرور" 
                        type="password" 
                        inputText="كلمة المرور" 
                        value={userInfo.password.value} 
                        onChange={(value) => setUserInfo({ ...userInfo, password: {  ...userInfo. password, value: value as string }})} 
                        isTrue={validateInput(userInfo.password.value, 'password').isValid} 
                        errorMsg={userInfo.password.value? validateInput(userInfo.password.value, 'password').errorMsg : ""}
                        isRegister={isRegister}
                    />
                    {isRegister && 
                        <Input 
                            label="تأكيد كلمة المرور" 
                            type="password" 
                            inputText="تأكيد كلمة المرور" 
                            value={userInfo.confirmPassword.value} 
                            onChange={(value) => setUserInfo({ ...userInfo, confirmPassword: { ...userInfo.confirmPassword, value: value as string} })} 
                            isTrue={validateInput(userInfo.confirmPassword.value, 'password').isValid && validateConfirmPassword(userInfo.password.value, userInfo.confirmPassword.value)}
                            errorMsg={userInfo.confirmPassword.value? validateInput(userInfo.confirmPassword.value, 'password').errorMsg? "الكلمة يجب أن تطابق كلمة المرور" : "" : ""}
                            isRegister={isRegister}
                        />
                    }
                </div>
            </div>
            <div className="flex flex-col items-center w-full gap-4">
                <div className="w-full md:w-[70%] flex flex-col items-center gap-4 mt-2">
                    <ButtonFull text={isRegister ? 'انشاء حساب' : 'تسجيل دخول'} onClick={() => { if (submitOnClick()) {handleSubmit();}}} />
                    {/* <GoogleBtn text={isRegister ? "التسجيل باستخدام جوجل" : "المتابعة باستخدام جوجل"}/> */}
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
    )
}