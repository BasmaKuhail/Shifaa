import { useState } from "react";
import Button from "./Button";
import GoogleBtn from "./GoogleBtn";
import Input from "./input";
import Title from "./Title";
import LanguageSelector from "./LangugeSelector";

export default function Form({ register }: { register: boolean }) {

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const submitOnClick = () => {
        // Handle form submission logic here
        if (userInfo.password !== userInfo.confirmPassword) {
            alert('كلمتا المرور غير متطابقتين');
            return;
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
                            {register && <p className="mt-4 text-inpt">هل لديك حساب بالفعل؟ <a href="#" className="font-bold hover:underline">تسجيل الدخول</a></p>}
                        </div>
                        
                        <div className="flex flex-col gap-3 w-full ">
                            <div 
                                className="flex flex-col gap-3 md:flex-row md:gap-6 justify-between w-full">
                                <div className="flex-1">
                                    <Input label="الاسم الأول" type="text" inputText="الاسم الأول" value={userInfo.firstName} onChange={(value) => setUserInfo({ ...userInfo, firstName: value })} />
                                </div>
                                <div className="flex-1">
                                    <Input label="الاسم الأخير" type="text" inputText="الاسم الأخير" value={userInfo.lastName} onChange={(value) => setUserInfo({ ...userInfo, lastName: value })} />
                                </div>
                            </div>

                            <Input label="البريد الالكتروني" type="email" inputText="youremail.com" value={userInfo.email} onChange={(value) => setUserInfo({ ...userInfo, email: value })} />


                            <div className="flex flex-col gap-3 md:flex-row justify-between md:gap-6 w-full">
                                <div className="flex-1">
                                    <Input label="كلمة المرور" type="password" inputText="كلمة المرور" value={userInfo.password} onChange={(value) => setUserInfo({ ...userInfo, password: value })} />
                                </div>
                                <div className="flex-1">
                                    <Input label="تأكيد كلمة المرور" type="password" inputText="تأكيد كلمة المرور" value={userInfo.confirmPassword} onChange={(value) => setUserInfo({ ...userInfo, confirmPassword: value })} />
                                </div>
                            </div>
                            <p className="text-xs md:text-inpt text-gray-500 text-right">استخدم 8 أحرف أو أكثر مع مزيج من الأحرف والأرقام والرموز</p>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                                <Button text={register ? 'انشاء حساب' : 'تسجيل الدخول'} onClick={submitOnClick} />
                                <GoogleBtn />
                                {register && <p className="text-xs md:text-inpt text-center underline md:no-underline">بالاستمرار، فإنك توافق على شروط الاستخدام وسياسة الخصوصية</p>}
                            </div>
                    </div>
                    <LanguageSelector/>
                </div>
            </div>
        </>
    )
}