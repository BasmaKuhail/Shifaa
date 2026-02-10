import { useState } from "react";
import Button from "./Button";
import GoogleBtn from "./GoogleBtn";
import Input from "./input";
import Title from "./Title";

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
        console.log('Form submitted with user info:', userInfo);
        if(userInfo.password !== userInfo.confirmPassword) {
            alert('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
            return;
        }
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center ">
                <div className="w-full max-w-3xl flex flex-col items-start gap-4">
                    <div className="bg-white rounded-lg px-35 py-10 w-full max-w-3xl flex flex-col gap-6">
                        <div className="flex flex-col gap-2 items-center">
                            <Title title={register ? 'انشاء حساب' : 'تسجيل الدخول'} />
                            {register && <p className="mt-4">هل لديك حساب بالفعل؟ <a href="#" className="font-bold hover:underline">تسجيل الدخول</a></p>}
                        </div>
                        
                        <div className="flex flex-col gap-4 w-full ">
                            <div className="flex flex-row gap-4 justify-between w-full">
                                <div className="flex-1">
                                    <Input label="الاسم الأخير" type="text" inputText="الاسم الأخير" value={userInfo.lastName} onChange={(value) => setUserInfo({ ...userInfo, lastName: value })} />
                                </div>
                                <div className="flex-1">
                                    <Input label="الاسم الأول" type="text" inputText="الاسم الأول" value={userInfo.firstName} onChange={(value) => setUserInfo({ ...userInfo, firstName: value })} />
                                </div>
                            </div>

                            <Input label="البريد الالكتروني" type="email" inputText="youremail.com" value={userInfo.email} onChange={(value) => setUserInfo({ ...userInfo, email: value })} />


                            <div className="flex flex-row justify-between gap-4 w-full">
                                <div className="flex-1">
                                    <Input label="تأكيد كلمة المرور" type="password" inputText="تأكيد كلمة المرور" value={userInfo.confirmPassword} onChange={(value) => setUserInfo({ ...userInfo, confirmPassword: value })} />
                                </div>
                                <div className="flex-1">
                                    <Input label="كلمة المرور" type="password" inputText="كلمة المرور" value={userInfo.password} onChange={(value) => setUserInfo({ ...userInfo, password: value })} />
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 text-right">استخدم 8 أحرف أو أكثر مع مزيج من الأحرف والأرقام والرموز</p>

                            <div className="my-4 flex flex-col gap-3">
                                <Button text={register ? 'انشاء حساب' : 'تسجيل الدخول'} onClick={submitOnClick} />
                                <GoogleBtn />
                                {register && <p className="text-sm  text-center">بالاستمرار، فإنك توافق على شروط الاستخدام وسياسة الخصوصية</p>}
                            </div>
                        </div>
                    </div>
                    <select className="text-sm">
                        <option value="arabic">العربية (فلسطين)</option>
                        <option value="english">English (US)</option>
                    </select>
                </div>
            </div>
        </>
    )
}