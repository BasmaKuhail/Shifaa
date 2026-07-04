import Btn from "./Btn";
import Card from "./CardContainer";
import editIcon from "@/public/icons/editProfile/edit.svg"
import { useContext, useEffect, useRef, useState } from "react";
import PetrolBtn from "./invitePopup/PetrolBtn";
import Link from "next/link";
import ImageProfile from "@/components/EditProfile/Image";
import Input from "@/components/register/input";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";
import { updatePharmacyData } from "@/services/pharmacy";
import { showAlert } from "@/components/alerts/AlertContainer";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { validateInput } from "@/utils/ValidateInput";
import phamBg from "@/public/images/pharmBg.png"
import Image from "next/image";
import { ApplicationFile } from "@/types/PharmacistApplication";
export default function PharmInfoSec (){
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {pharmacy, loading} = useContext(PharmacyContext);

    const getInitialPharmacyInfo = () => ({
        logo : pharmacy?.logo || null,
        name:  pharmacy?.name || '',
        address: pharmacy?.address || '',
        phone: pharmacy?.phone || '',
    });

    useEffect(() => {
        if (pharmacy) {
            setPharmacyInfo(getInitialPharmacyInfo())
        }
    }, [pharmacy]);

    const [pharmacyInfo, setPharmacyInfo] = useState(getInitialPharmacyInfo());
    const updatePharmacyInfo = async() => {
        if(pharmacy){
            try{
                await updatePharmacyData(
                    pharmacy?.id, 
                    {
                        name: pharmacyInfo.name, 
                        address: pharmacyInfo.address, 
                        phone: pharmacyInfo.phone,
                        // logo: pharmacyInfo.logo
                    });
                showAlert({
                    type:"Success",
                    title:"Success",
                    message: "تم تحديث المعلومات بنجاح!"
                })
            }catch (error: unknown) {
                showAlert({
                type: "Error",
                title: "خطأ",
                message: getApiErrorMessage(error),
                });
            }
        }   
    }
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
                        <div className="relative rounded-[12px] w-full bg-black-50 h-[200px]">
                            {/* fit image only to the hight of it's container */}
                            <Image src={phamBg} alt="defult bg"className="h-[200px] w-full opacity-[20%] relative rounded-[12px] w-full"/>
                        </div>
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
                        <Input 
                            label="اسم الصيدلية" 
                            inputText={pharmacy ? pharmacy.name : ""}
                            type="text" 
                            value={pharmacyInfo.name} 
                            onChange={(value) => setPharmacyInfo({ ...pharmacyInfo, name: typeof value === 'string' ? value : ''})} 
                            isTrue={validateInput(pharmacyInfo.name, 'text').isValid}
                        />
                        <Input 
                            label="العنوان" 
                            type="text" 
                            inputText={pharmacy ? pharmacy.address : ""} 
                            value={pharmacyInfo.address} 
                            onChange={(value) => setPharmacyInfo({ ...pharmacyInfo, address: typeof value === 'string' ? value : ''})} 
                            isTrue={validateInput(pharmacyInfo.address, 'text').isValid}
                        />
                        <Input 
                            label="رقم الهاتف" 
                            type="text" 
                            inputText={pharmacy ? pharmacy.phone : ""} 
                            value={pharmacyInfo.phone} 
                            onChange={(value) => setPharmacyInfo({ ...pharmacyInfo, phone: typeof value === 'string' ? value : ''})} 
                            isTrue={validateInput(pharmacyInfo.phone, 'mobile').isValid}
                        />
                        <Input 
                            label="المالك" 
                            type="text" 
                            inputText={ ""} 
                            value={pharmacy?.owner.name || ""} 
                            onChange={() => {}} 
                            isTrue={true}
                            editable={false}
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-5 ">
                    <PetrolBtn text="تحديث البيانات" onClick={() => updatePharmacyInfo()} />
                    <p onClick={() => setPharmacyInfo(getInitialPharmacyInfo())} className="underline text-sm text-gray-600 cursor-pointer"> إلغاء </p>
                </div>
                  
            </div></>)}
        </Card>
    )
}