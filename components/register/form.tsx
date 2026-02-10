import { useState } from "react";
import ButtonFull from "./ButtonFull";
import GoogleBtn from "./GoogleBtn";
import Input from "./input";
import Title from "./Title";
import LanguageSelector from "./LangugeSelector";
import ButtonEmpty from "./ButtonEmpty";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Form({ register }: { register: boolean }) {

    const router = useRouter();

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const submitOnClick = () => {
        // Handle form submission logic here
        if(register){
            if (userInfo.firstName.trim() === '' || userInfo.lastName.trim() === '' || userInfo.email.trim() === '' || userInfo.password.trim() === '') {
                alert('يرجى ملأ جميع الحقول الفارغة');
                return;
            }
            else if(userInfo.email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
                alert('يرجى إدخال بريد إلكتروني صحيح');
                return;
            }
            else if (userInfo.password !== userInfo.confirmPassword) {
                alert('كلمتا المرور غير متطابقتين');
                return;
            }
            else if (userInfo.password.length < 8 || !/[A-Za-z]/.test(userInfo.password) || !/\d/.test(userInfo.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(userInfo.password)) {
                alert('كلمة المرور يجب أن تكون 8 أحرف انجليزية أو أكثر وتحتوي على مزيج من الأحرف والأرقام والرموز');
                return;
            }
            else {
                alert('تم التحقق من صحة البيانات.');
            }
        }else{
            if (userInfo.email.trim() === '' || userInfo.password.trim() === '') {
                alert('يرجى ملأ جميع الحقول الفارغة');
                return;
            }else {
                alert('تم التحقق من صحة البيانات.');
            }
        }
        console.log('Form submitted with user info:', userInfo);
        if(userInfo.password !== userInfo.confirmPassword) {
            alert('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
            return;
        }
        console.log('Form submitted with user info:', userInfo);
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
                            <Title title={register ? 'انشاء حساب' : 'تسجيل الدخول'} />
                            {register && <p className="mt-4 text-inpt">هل لديك حساب بالفعل؟ <Link href="/auth/login" className="font-bold hover:underline">تسجيل الدخول</Link></p>}
                        </div>
                        
                        <div className="flex flex-col gap-3 w-full ">
                            {register && <div 
                                className="flex flex-col gap-3 md:flex-row md:gap-6 justify-between w-full">
                                <div className="flex-1">
                                    <Input label="الاسم الأول" type="text" inputText="الاسم الأول" value={userInfo.firstName} onChange={(value) => setUserInfo({ ...userInfo, firstName: value })} />
                                </div>
                                <div className="flex-1">
                                    <Input label="الاسم الأخير" type="text" inputText="الاسم الأخير" value={userInfo.lastName} onChange={(value) => setUserInfo({ ...userInfo, lastName: value })} />
                                </div>
                            </div>}

                            <Input label="البريد الالكتروني" type="email" inputText="youremail.com" value={userInfo.email} onChange={(value) => setUserInfo({ ...userInfo, email: value })} />


                            <div className="flex flex-col gap-3 md:flex-row justify-between md:gap-6 w-full">
                                <div className="flex-1">
                                    <Input label="كلمة المرور" type="password" inputText="كلمة المرور" value={userInfo.password} onChange={(value) => setUserInfo({ ...userInfo, password: value })} />
                                </div>
                                {register &&<div className="flex-1">
                                    <Input label="تأكيد كلمة المرور" type="password" inputText="تأكيد كلمة المرور" value={userInfo.confirmPassword} onChange={(value) => setUserInfo({ ...userInfo, confirmPassword: value })} />
                                </div>}
                            </div>
                            {register &&<p className="text-xs md:text-inpt text-gray-500 text-right">استخدم 8 أحرف أو أكثر مع مزيج من الأحرف والأرقام والرموز</p>}
                            {!register &&<p className="text-xs md:text-inpt text-right underline"><a className="cursor-pointer">نسيت كلمة المرور؟</a></p>}

                        </div>
                        <div className="flex flex-col items-center w-full gap-4">
                            <div className="w-full md:w-[70%] flex flex-col items-center gap-4">
                                <ButtonFull text={register ? 'انشاء حساب' : 'تسجيل دخول'} onClick={submitOnClick} />
                                <GoogleBtn text={register ? "التسجيل باستخدام جوجل" : "المتابعة باستخدام جوجل"}/>
                            {!register && <>
                                <div className="w-full flex items-center gap-3 mt-4"> 
                                    <hr className="flex-1 border-gray-300 border-1" /><p className="text-gray-500">جديد في مجتمعنا؟</p><hr className="flex-1 border-gray-300 border-1" />
                                </div>
                                
                                <ButtonEmpty text= "انشاء حساب" onClick={() => {router.push('/auth/signup')}} />
                            </>}
                            </div>
                            {register && <p className="text-xs md:text-12px text-center underline md:no-underline">بالاستمرار، فإنك توافق على شروط الاستخدام وسياسة الخصوصية</p>}

                                
                        </div>
                    </div>
                    <LanguageSelector/>
                </div>
            </div>
        </>
    )
}