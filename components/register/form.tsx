import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import ButtonFull from "./ButtonFull";
import GoogleBtn from "./GoogleBtn";
import Input from "./input";
import Title from "./Title";
import ButtonEmpty from "./ButtonEmpty";

import Link from "next/link";

import { validateInput, validateConfirmPassword} from "@/utils/ValidateInput";
import { useAuthForm } from "@/hooks/useAuthForm";

export default function Form({ isRegister }: { isRegister: boolean }) {
    const {
        formData,
        errorMsg,
        isSubmitting,
        updateField,
        submit,
    } = useAuthForm(isRegister);

    const router = useRouter();

    const [userInfo, setUserInfo] = useState({
        firstName: { value: '', isTrueData: false, errorMsg: '' },
        lastName: { value: '', isTrueData: false, errorMsg: '' },
        email: { value: '', isTrueData: false, errorMsg: '' },
        password: { value: '', isTrueData: false, errorMsg: '' },
        confirmPassword: { value: '', isTrueData: false, errorMsg: '' }
    });


    const inputOnChange = useCallback((field: keyof typeof userInfo, value: string) => {
        const validationType =
            field === "email" ? "email" :
            field === "password" || field === "confirmPassword" ? "password" :
            "text";
        const validation = validateInput(value, validationType);

        setUserInfo((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                value,
                isTrueData: validation.isValid,
                errorMsg: validation.errorMsg,
            },
        }));
    }, []);


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
                            value={formData.firstName} 
                            onChange={(value) => {inputOnChange('firstName', value as string); updateField('firstName', value as string)}} 
                            isTrue={userInfo.firstName.isTrueData} 
                            errorMsg={userInfo.firstName.value ? userInfo.firstName.errorMsg : ""}
                        />
                        {/* <p >{userInfo.firstName.errorMsg}</p> */}
                        <Input 
                            label="الاسم الأخير" 
                            type="text" 
                            inputText="الاسم الأخير" 
                            value={formData.lastName} 
                            onChange={(value) => {updateField('lastName', value as string); inputOnChange('lastName', value as string)}} 
                            isTrue={userInfo.lastName.isTrueData} 
                            errorMsg={userInfo.lastName.value ? userInfo.lastName.errorMsg : ""}
                        />
                    </div>
                }

                <Input 
                    label="البريد الالكتروني" 
                    type="email" 
                    inputText="youremail@domain.com" 
                    value={formData.email} 
                    onChange={(value) => {updateField('email', value as string); inputOnChange('email', value as string)}} 
                    isTrue={userInfo.email.isTrueData} 
                    errorMsg={userInfo.email.value ? userInfo.email.errorMsg : ""}
                />


                <div className={`grid grid-cols-1 gap-3 md:flex-row-reverse md:gap-6 justify-between w-full ${isRegister ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                    <Input 
                        label="كلمة المرور" 
                        type="password" 
                        inputText="كلمة المرور" 
                        value={formData.password} 
                        onChange={(value) => {updateField('password', value as string); inputOnChange('password', value as string)}} 
                        isTrue={userInfo.password.isTrueData} 
                        errorMsg={userInfo.password.value ? userInfo.password.errorMsg : ""}
                    />
                    {isRegister && 
                        <Input 
                            label="تأكيد كلمة المرور" 
                            type="password" 
                            inputText="تأكيد كلمة المرور" 
                            value={formData.confirmPassword} 
                            onChange={(value) => {updateField('confirmPassword', value as string); inputOnChange('confirmPassword', value as string)}} 
                            isTrue={userInfo.confirmPassword.isTrueData && validateConfirmPassword(userInfo.password.value, userInfo.confirmPassword.value)}
                            errorMsg={userInfo.confirmPassword.value ? validateInput(userInfo.confirmPassword.value, 'password').errorMsg ? "الكلمة يجب أن تطابق كلمة المرور" : "" : ""}
                        />
                    }
                </div>
            </div>
            <div className="flex flex-col items-center w-full gap-4">
                <div className="w-full md:w-[70%] flex flex-col items-center gap-4 mt-2">
                    <ButtonFull text={isRegister ? 'انشاء حساب' : 'تسجيل دخول'} onClick={submit} />
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