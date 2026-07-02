import Btn from "./Btn";
import Card from "./CardContainer";
import editIcon from "@/public/icons/editProfile/edit.svg"
import { useContext, useRef, useState } from "react";
import PetrolBtn from "./invitePopup/PetrolBtn";
import Link from "next/link";
import ImageProfile from "@/components/EditProfile/Image";
import Input from "@/components/register/input";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";

export default function PharmInfoSec (){
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    //call getPharmacyById function to get pharmacy data and set it to state
    const {pharmacy, loading} = useContext(PharmacyContext);

    console.log(pharmacy)
    return(
        <Card title="معلومات حساب الصيدلية">
            {loading ? (
                <div className="flex flex-col w-full gap-10 items-center">
                    جاري تحميل البيانات...
                </div>
            ) : (<>
                <div className="flex flex-col w-full gap-10 pb-5">
                    <div className="relative w-full h-[260px]">
                        <div className="relative rounded-[12px] w-full bg-blue-100 h-[200px]"/>
                        <div className="absolute top-3 right-3 ">
                            <Btn text="تعديل الصورة" icon={editIcon} onClick={() => fileInputRef.current?.click()} />
                        </div>

                        <div className="absolute left-1/2 -translate-x-1/2 top-[110px]">
                            <ImageProfile
                                imageObj={pharmacy?.logo || null}
                                width={150}
                                isUser={false}
                                isCircle={true}
                                onImageChange={(file) => {
                                    console.log("New pharmacy logo:", file);
                                }}
                                onDeleteImage={() => {
                                    console.log("Delete pharmacy logo");
                                }}
                            />
                        </div>
                </div> 
                <div className="flex flex-col gap-3 mt-15">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                        <Input label="اسم الصيدلية" type="text" inputText={ ""} value={pharmacy?.name || ""} onChange={() => {}} isTrue={true}/>
                        <Input label="العنوان" type="text" inputText={ ""} value={pharmacy?.address || ""} onChange={() => {}} isTrue={true}/>
                        <Input label="رقم الهاتف" type="text" inputText={ ""} value={pharmacy?.phone || ""} onChange={() => {}} isTrue={true}/>
                        <Input label="المالك" type="text" inputText={ ""} value={pharmacy?.owner.name || ""} onChange={() => {}} isTrue={true}/>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-5 ">
                    <PetrolBtn text="تحديث البيانات" onClick={() => {}} />
                    <Link href={"/"} className="underline text-sm text-gray-600"> إلغاء </Link>
                </div>
                  
            </div></>)}
        </Card>
    )
}