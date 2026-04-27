import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import Input from "../register/input";
import { validateInput } from "@/utils/registerValidation";
import GradientBtn from "../home/GradiantBtn";
import ImageProfile from "./Image";

import { useBreadcrumb } from "@/contexts/BreadcrumbContext"
import Breadcrumb from "../Breadcrumb";

export default function EditProfile() {
    const { setCrumbs } = useBreadcrumb()

    useEffect(() => {
        setCrumbs([
            { title: "الصفحة الرئيسية", link: "/" },
            { title: "تعديل الحساب", link: "/editProfile" }
        ])
    }, [])
    const {user, loading} = useContext(UserContext);

    const getInitialUserInfo = () => ({
        firstName:  user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        mobileNum: user?.mobileNum || '',
        location: user?.location || '',
    });
    useEffect(() => {
        if (user) {
            setUserInfo(getInitialUserInfo())
        }
    }, [user]);

    const [userInfo, setUserInfo] = useState(getInitialUserInfo());
    if (loading) return (<p>loading .... </p>)


    return (
        <div dir="rtl" className="
                    flex flex-col gap-5 md:gap-10
                    md:mt-0">
           
                    <p className="font-semibold text-27px">إعدادات الحساب</p>
                    <div className="flex flex-col w-full justify-center items-center gap-10">
                        <div className="flex flex-col gap-3">
                            <ImageProfile userAvatar={user?.avatar ? user.avatar : ""}/>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                            <Input label="الاسم الأول" type="text" inputText={user? user.firstName : ""} value={userInfo.firstName} onChange={(value) => setUserInfo({ ...userInfo, firstName: typeof value === 'string' ? value : ''})} isTrue={validateInput(userInfo.firstName, 'text')}/>
                            <Input label="الاسم الأخير" type="text" inputText={user? user.lastName : ""} value={userInfo.lastName} onChange={(value) => setUserInfo({ ...userInfo, lastName: typeof value === 'string' ? value : ''})} isTrue={validateInput(userInfo.lastName, 'text')}/>
                            <Input label="البريد الالكتروني" type="text" inputText={user? user.email : ""} value={userInfo.email} onChange={(value) => setUserInfo({ ...userInfo, email: typeof value === 'string' ? value : '' })} isTrue={validateInput(userInfo.email, 'text')}/>
                            <Input label="رقم الهاتف" type="text" inputText={user?.mobileNum || ""} value={userInfo.mobileNum} onChange={(value) => setUserInfo({ ...userInfo, mobileNum: typeof value === 'string' ? value : ''})} isTrue={validateInput(userInfo.mobileNum, 'text')}/>
                            <Input label="الموقع" type="text" inputText={user?.location || ""} value={userInfo.location} onChange={(value) => setUserInfo({ ...userInfo, location: typeof value === 'string' ? value : ''})} isTrue={validateInput(userInfo.location, 'text')}/>
                        </div>
                    </div>
                    <GradientBtn text="حفظ التغيرات" onClick={() => {}} px={10} rounded="10"/>
        </div>
    )
}