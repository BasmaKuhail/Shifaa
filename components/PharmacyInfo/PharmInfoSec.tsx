import ImageProfile from "../EditProfile/Image";
import Btn from "./Btn";
import Card from "./CardContainer";
import pharmLogo from "@/public/icons/pharmInfo/pharmLogo.svg"
import editIcon from "@/public/icons/editProfile/edit.svg"
import { useRef } from "react";
import Input from "../register/input";
import PetrolBtn from "./invitePopup/PetrolBtn";
import Link from "next/link";

export default function PharmInfoSec (){
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    return(
        <Card title="معلومات حساب الصيدلية">
            <div className="flex flex-col w-full gap-10 pb-5">
                <div className="relative w-full h-[260px]">
                    <div className="relative rounded-[12px] w-full bg-blue-100 h-[200px]"/>
                    <div className="absolute top-3 right-3 ">
                        <Btn text="تعديل الصورة" icon={editIcon} onClick={() => fileInputRef.current?.click()} />
                    </div>
                    
                    <div className="absolute left-1/2 -translate-x-1/2 top-[110px]">
                        <ImageProfile userAvatar={pharmLogo}/>
                    </div>
                </div> 
                <div className="flex flex-col gap-3 mt-15">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                        <Input label="اسم الصيدلية" type="text" inputText={ ""} value={""} onChange={() => {}} isTrue={true}/>
                        <Input label="الايميل" type="email" inputText={ ""} value={""} onChange={() => {}} isTrue={true}/>
                    </div>
                    <Input label="نبذة تعريفية" type="text" inputText={ ""} value={""} onChange={() => {}} isTrue={true}/>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                        <Input label="أيام العمل" type="text" inputText={ ""} value={""} onChange={() => {}} isTrue={true}/>
                        <Input label="ساعات العمل" type="text" inputText={ ""} value={""} onChange={() => {}} isTrue={true}/>
                    </div>  
                </div>
                <div className="flex flex-row items-center gap-5 ">
                    <PetrolBtn text="تحديث البيانات" onClick={() => {}} />
                    <Link href={"/"} className="underline text-sm text-gray-600"> إلغاء </Link>
                </div>
                  
            </div>
        </Card>
    )
}