import { useContext, useEffect, useState } from "react";
import Btn from "../PharmacyInfo/Btn";
import ProfileIcon from "../ProfileIcon";
import editIcon from "@/public/icons/editProfile/edit.svg"
import deleteIcon from "@/public/icons/editProfile/delete.svg"
import { UserContext } from "@/contexts/UserContext";
import Input from "../register/input";
import { validateInput } from "@/utils/registerValidation";
import GradientBtn from "../home/GradiantBtn";
import ImageProfile from "./Image";
import EditProfileSkeleton from "../Skeleton/EditProfileSkeleton";

export default function EditProfile() {
    const {user, loading} = useContext(UserContext);

    if(loading){
        return <EditProfileSkeleton/>
    }
        
    useEffect(() => {
        if (user) {
            setUserInfo({
            firstName: { value: user.firstName || '', isTrueData: true },
            lastName: { value: user.lastName || '', isTrueData: true },
            email: { value: user.email || '', isTrueData: true },
            mobileNum: { value: user.mobileNum || '', isTrueData: true },
            location: { value: user.location || '', isTrueData: true },
            });
        }
    }, [user]);

    const [userInfo, setUserInfo] = useState({
        firstName: { value: user?.firstName || '', isTrueData: false },
        lastName: { value: user?.lastName || '', isTrueData: false },
        email: { value: user?.email || '', isTrueData: false },
        mobileNum: { value: user?.mobileNum || '', isTrueData: false },
        location: { value: user?.location || '', isTrueData: false },
    });
    if (loading) return (<p>loading .... </p>)
    return (
        <div dir="rtl" className="bg-blue-100 w-full flex flex-col pb-20 py-20 items-center justify-center min-h-screen">
            <div 
                className="
                    bg-white rounded-normal md:w-full w-[90%] max-w-3xl
                    px-10 
                    py-10
                    flex flex-col gap-5 md:gap-10
                    md:mt-0
                    shadow-lg"
                >
                    <p className="font-semibold text-27px">إعدادات الحساب</p>
                    <div className="flex flex-col w-full justify-center items-center gap-10">
                        <div className="flex flex-col gap-3">
                            <ImageProfile userAvatar={user?.avatar ? user.avatar : ""}/>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                            <Input label="الاسم الأول" type="text" inputText={user? user.firstName : ""} value={userInfo.firstName.value} onChange={(value) => setUserInfo({ ...userInfo, firstName: { value, isTrueData: true } })} isTrue={validateInput(userInfo.firstName.value, 'text')}/>
                            <Input label="الاسم الأخير" type="text" inputText={user? user.lastName : ""} value={userInfo.lastName.value} onChange={(value) => setUserInfo({ ...userInfo, lastName: { value, isTrueData: true } })} isTrue={validateInput(userInfo.lastName.value, 'text')}/>
                            <Input label="البريد الالكتروني" type="text" inputText={user? user.email : ""} value={userInfo.email.value} onChange={(value) => setUserInfo({ ...userInfo, email: { value, isTrueData: true } })} isTrue={validateInput(userInfo.email.value, 'text')}/>
                            <Input label="رقم الهاتف" type="text" inputText={user?.mobileNum || ""} value={userInfo.mobileNum.value} onChange={(value) => setUserInfo({ ...userInfo, mobileNum: { value, isTrueData: true } })} isTrue={validateInput(userInfo.mobileNum.value, 'text')}/>
                            <Input label="الموقع" type="text" inputText={user?.location || ""} value={userInfo.location.value} onChange={(value) => setUserInfo({ ...userInfo, location: { value, isTrueData: true } })} isTrue={validateInput(userInfo.location.value, 'text')}/>
                        </div>
                    </div>
                    <GradientBtn text="حفظ التغيرات" onClick={() => {}} px={10} rounded="10"/>
            </div>
        </div>
    )
}