import { useContext, useEffect, useState } from "react";
import Input from "../register/input";
import { UserContext } from "@/contexts/UserContext";
import { Request, requestMed } from "@/services/requestMed";
import { validateInput } from "@/utils/ValidateInput";
import Regions from "./RegionSelector";
import PetrolBtn from "../pharmacyDashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { showAlert } from "../alerts/AlertContainer";
import AddImage from "../pharmacyDashboard/addMedicine/AddImage";

export default function RequestMedication(){
    const {user, setUser, loading} = useContext(UserContext);
    const getInitialUserInfo = () => ({
        firstName:  user?.firstName || '',
        lastName: user?.lastName || '',
        mobileNum: user?.mobileNum || '',
        location: user?.location || '',
    });
    const [userInfo, setUserInfo] = useState(getInitialUserInfo());
    const [regionId, setRegionId] = useState<string | undefined>(undefined);
    const [subRegionId, setSubRegionId] = useState<string | undefined>(undefined);

    const [requestInfo, setRequestInfo] = useState<Request>({
        medicine_name: '',
        patient_age: undefined,
        image: undefined,
        sub_regions_id: Number(subRegionId) || undefined,
        region_id: Number(regionId) || undefined,
        pharmacy_id: undefined,
        dosage_form: '',
        strength:'',
        quantity:undefined,
        notes:''
    })

const handleSubmit = async () => {
    const medicineName = requestInfo.medicine_name.trim();

    if (!validateInput(medicineName, "text").isValid) {
        showAlert({
            title: "فشل",
            type: "Error",
            message: "يرجى إدخال اسم الدواء",
        });
        return;
    }

    try {
        await requestMed({
            ...requestInfo,
            medicine_name: medicineName,
            region_id: regionId ? Number(regionId) : undefined,
            sub_regions_id: subRegionId ? Number(subRegionId) : undefined,
        });

        showAlert({
            title: "نجح",
            type: "Success",
            message: "تم ارسال طلبك بنجاح",
        });
    } catch (error: unknown) {
        showAlert({
            title: "فشل",
            type: "Error",
            message: error instanceof Error ? error.message : "حدث خطأ",
        });
    }
};

    return(
        <div dir="rtl" className="flex flex-col gap-5 md:gap-10 md:mt-0">
            <p className="font-semibold text-27px">طلب دواء</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                <Input 
                    label="الاسم" 
                    type="text" 
                    inputText={user? user.firstName + " " + user.lastName : "جاري التحميل"} 
                    value={userInfo.firstName} 
                    onChange={() =>{}} 
                    editable={false}
                    isTrue={true} 
                />
                <Input 
                    label="رقم الهاتف" 
                    type="text" 
                    inputText="ادخل رقم هاتف للتواصل معك" 
                    value={userInfo.mobileNum} 
                    onChange={(value) => setUserInfo({ ...userInfo, mobileNum: typeof value === 'string' ? value : ''})}
                    isTrue={validateInput(userInfo.mobileNum, 'mobile').isValid}
                /> 
                <Regions isRequired={false} regionId={regionId} setRegionId={setRegionId} subRegionId={subRegionId} setSubRegionId={setSubRegionId} />
            </div>
            
            <p className="text-inpt md:text-btn font-[500] ">معلومات الدواء:</p>
            <div className="flex flex-col gap-4">
                <Input
                    label="اسم الدواء"
                    inputText="ادخل اسم الدواء" 
                    type="text"
                    value={requestInfo.medicine_name} 
                    onChange={
                            (value) => setRequestInfo({
                                ...requestInfo, medicine_name: typeof value === 'string' ? value : ''
                            })} 
                    isTrue={validateInput(requestInfo.medicine_name, 'text').isValid} 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                    <Input
                        value={requestInfo.patient_age?.toString() ?? ""}
                        onChange={(value) => {
                            const rawValue = String(value ?? "").trim();
                            const age = rawValue === "" ? undefined : Number(rawValue);

                            setRequestInfo((previous) => ({
                                ...previous,
                                patient_age: age,
                            }));
                        }}
                        isTrue={
                            requestInfo.patient_age === undefined ||
                            (Number.isInteger(requestInfo.patient_age) &&
                                requestInfo.patient_age > 0)
                        }
                        label="عمر المريض"
                        inputText="ادخل عمر المريض" 
                        type="number"
                    />
                    <Input
                        value={requestInfo.dosage_form || ''}
                        onChange={(value) => setRequestInfo({
                                ...requestInfo, dosage_form: typeof value === 'string' ? value : ''
                        })}
                        isTrue={requestInfo.dosage_form ? validateInput(requestInfo.dosage_form, 'text').isValid : true}
                        label="شكل الجرعة"
                        inputText="ادخل شكل الجرعة " 
                        type="text"
                        isRequired={false}
                    />
                    <Input
                        value={requestInfo.strength || ''}
                        onChange={(value) => setRequestInfo({
                                ...requestInfo, strength: typeof value === 'string' ? value : ''
                        })}
                        isTrue={requestInfo.strength ? validateInput(requestInfo.strength, 'text').isValid || (Number(requestInfo.strength) > 0) : true}
                        label="التركيز"
                        inputText="مثال: 400 غم" 
                        type="text"
                        isRequired={false}
                    />
                    <Input
                        value={requestInfo.quantity?.toString() ?? ""}
                        onChange={(value) => {
                            const rawValue = String(value ?? "").trim();
                            const quantity = rawValue === "" ? undefined : Number(rawValue);

                            setRequestInfo((previous) => ({
                                ...previous,
                                quantity: quantity,
                            }));
                        }}
                        isTrue={
                            requestInfo.quantity === undefined ||
                            (Number.isInteger(requestInfo.quantity) &&
                                requestInfo.quantity > 0)
                        }
                        label="الكمية"
                        inputText="ادخل الكمية المطلوبة " 
                        type="number"
                        isRequired={false}
                    />
                </div>
                 <Input
                        value={requestInfo.notes || ''}
                        onChange={(value) => setRequestInfo({
                                ...requestInfo, notes: typeof value === 'string' ? value : ''
                        })}
                        isTrue={true}
                        label="ملاحظات"
                        inputText="اترك ملاحظة للصيدلي"
                        type="textarea"
                        isRequired={false}
                    />
                <nav className="flex flex-row gap-2 ">
                    <label className="text-sm font-bold text-right">صورة للوصفة الطبية </label>
                    <label className="text-sm text-gray-400"> (اختياري)</label>
                </nav>
                <AddImage
                    label="صورة للوصفة الطبية"
                    onImageChange={(
                        file: File | null,
                    ) => {
                    setRequestInfo(
                        (previousData) => ({
                         ...previousData,
                         image: file,
                    }),
                  );
                }}
                />
            </div>
            <PetrolBtn text="إرسال الطلب" onClick={handleSubmit} /> 
        </div>
    )
}
