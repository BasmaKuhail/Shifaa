import Card from "./CardContainer";
import { useContext, useEffect, useRef, useState } from "react";
import PetrolBtn from "./invitePopup/PetrolBtn";
import ImageProfile from "@/components/EditProfile/Image";
import Input from "@/components/register/input";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";
import { deletePharmacy, updatePharmacyData } from "@/services/pharmacy";
import { showAlert } from "@/components/alerts/AlertContainer";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { validateInput } from "@/utils/ValidateInput";
import PopupContainer from "./PopUpContainer";
import { useRouter } from "next/router";
import { getRegions, getSubRegions } from "@/services/regions";
import { Region } from "@/types/RegionType";
export default function PharmInfoSec ({pharmacistRole}:{pharmacistRole:"staff" | "owner" | undefined}){
    type PharmacyInfo = {
        logo: string | File | null;
        name: string;
        address: string;
        region_id: string;
        sub_region_id: string;
        phone: string;
    };
    const {pharmacy, loading} = useContext(PharmacyContext);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const route = useRouter();
    const handleDeletePharmacy = async () => {
        setShowDeleteConfirmation(false);
        if(pharmacy){
            try{
                await deletePharmacy(pharmacy.id);
                showAlert({
                    type:"Success",
                    title:"Success",
                    message: "تم حذف الصيدلية بنجاح!"
                })
            route.push("/")
            }catch (error: unknown) {
                showAlert({
                type: "Error",
                title: "خطأ",
                message: getApiErrorMessage(error),
            });
        }
    }}
    const getInitialPharmacyInfo = (): PharmacyInfo => ({
        logo: pharmacy?.logo ?? null,
        name: pharmacy?.name ?? "",
        address: pharmacy?.address ?? "",
        region_id: pharmacy?.region_id ? String(pharmacy.region_id) : "",
        sub_region_id: pharmacy?.sub_region_id ? String(pharmacy.sub_region_id) : "",
        phone: pharmacy?.phone ?? "",
    });

    const [regions, setRegions] = useState<Region[]>([]);
    const [subRegions, setSubRegions] = useState<Region[]>([]);
    const [subRegionsLoading, setSubRegionsLoading] = useState(false);

    const handleRegionChange = async (regionId: string) => {
        setPharmacyInfo((current) => ({ ...current, region_id: regionId, sub_region_id: "" }));
        setSubRegions([]);
        if (!regionId) return;

        try {
            setSubRegionsLoading(true);
            setSubRegions(await getSubRegions(Number(regionId)));
        } catch (error) {
            console.error("Failed to load sub-regions", error);
        } finally {
            setSubRegionsLoading(false);
        }
    };

    useEffect(() => {
        void getRegions().then(setRegions).catch((error) => {
            console.error("Failed to load regions", error);
        });
    }, []);

    useEffect(() => {
        if (!pharmacy?.region_id) return;
        setSubRegionsLoading(true);
        void getSubRegions(pharmacy.region_id)
            .then(setSubRegions)
            .catch((error) => console.error("Failed to load sub-regions", error))
            .finally(() => setSubRegionsLoading(false));
    }, [pharmacy?.region_id]);

    useEffect(() => {
        if (pharmacy) {
            setPharmacyInfo(getInitialPharmacyInfo())
        }
    }, [pharmacy]);

    const [pharmacyInfo, setPharmacyInfo] = useState(getInitialPharmacyInfo());
    const updatePharmacyInfo = async() => {
        
        if(pharmacy){
            // if no change show alert
            const hasChanges =
                pharmacyInfo.name.trim() !== pharmacy.name.trim() ||
                pharmacyInfo.address.trim() !== pharmacy.address.trim() ||
                pharmacyInfo.region_id !== String(pharmacy.region_id ?? "") ||
                pharmacyInfo.sub_region_id !== String(pharmacy.sub_region_id ?? "") ||
                pharmacyInfo.phone.trim() !== pharmacy.phone.trim() ||
                pharmacyInfo.logo instanceof File ||
                pharmacyInfo.logo !== pharmacy.logo;

            if (!hasChanges) {
                showAlert({
                type: "Hint",
                title: "تنبيه",
                message: "لم يتم إجراء أي تغييرات.",
                });

                return;
            }
            //if not vaild change
            if(!(
                validateInput(pharmacyInfo.name, 'text').isValid &&
                validateInput(pharmacyInfo.address, 'text').isValid &&
                pharmacyInfo.region_id !== "" &&
                pharmacyInfo.sub_region_id !== "" &&
                validateInput(pharmacyInfo.phone, 'mobile').isValid
            )){
                showAlert({
                    type: "Hint",
                    title: "تنبيه",
                    message: "أحد/ كل الحقول تحاول تحديثها تحتوي بيانات غير صحيحة.",
                });

                return;
            }
            // if change update
            try{
                await updatePharmacyData(
                    pharmacy?.id, 
                    {
                        name: pharmacyInfo.name, 
                        address: pharmacyInfo.address, 
                        sub_region_id: Number(pharmacyInfo.sub_region_id),
                        phone: pharmacyInfo.phone,
                        logo: pharmacyInfo.logo
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
            {showDeleteConfirmation && (
                <PopupContainer onClose={() => setShowDeleteConfirmation(false)}>
                        <p className="text-lg font-semibold m-4 mt-6">هل أنت متأكد أنك تريد حذف الصيدلية؟</p>
                        <p className="text-sm text-gray-600 mb-6">لن تتمكن من التراجع عن هذا الإجراء.</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleDeletePharmacy}
                                className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                            >
                                حذف
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirmation(false)}
                                className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-300"
                            >
                                إلغاء   
                            </button>
                        </div>
                </PopupContainer>
            )}
            {loading ? (
                <div className="flex flex-col w-full gap-10 items-center">
                    جاري تحميل البيانات...
                </div>
            ) : (<>
                <div className="flex flex-col w-full gap-10 pb-5">
                    <div className="relative w-full h-[150px]">
                        {/* <div className="relative rounded-[12px] w-full bg-black-50 h-[200px]">
                            <Image src={phamBg} alt="defult bg"className="h-[200px] w-full opacity-[20%] relative rounded-[12px] w-full"/>
                        </div>
                            <div className="absolute top-3 right-3 ">
                                <Btn text="تعديل الصورة" icon={editIcon} onClick={() => fileInputRef.current?.click()} />
                            </div> */}

                        <div className="absolute left-1/2 -translate-x-1/2 top-[0px] w-full">
                            <ImageProfile
                                imageUrl={pharmacy?.logo || null}
                                width={150}
                                isUser={false}
                                isCircle={true}
                                onImageChange={(file) => {
                                    console.log("New pharmacy logo:", file);
                                }}
                                onDeleteImage={() => {
                                    console.log("Delete pharmacy logo");
                                }}
                                setPharmacyInfo={setPharmacyInfo}
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
                        <div className="flex flex-col gap-2" dir="rtl">
                            <label className="text-sm font-bold text-right">المنطقة الرئيسية</label>
                            <select
                                value={pharmacyInfo.region_id}
                                onChange={(event) => void handleRegionChange(event.target.value)}
                                className="border border-[#D1D1D1] rounded-inpt p-2 w-full text-right h-[52px] md:h-[45px] focus:outline-none focus:border-[#1A71F6]"
                            >
                                <option value="">اختر المنطقة الرئيسية</option>
                                {regions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2" dir="rtl">
                            <label className="text-sm font-bold text-right">المنطقة الفرعية</label>
                            <select
                                value={pharmacyInfo.sub_region_id}
                                onChange={(event) => setPharmacyInfo({ ...pharmacyInfo, sub_region_id: event.target.value })}
                                disabled={!pharmacyInfo.region_id || subRegionsLoading}
                                className="border border-[#D1D1D1] rounded-inpt p-2 w-full text-right h-[52px] md:h-[45px] focus:outline-none focus:border-[#1A71F6] disabled:bg-gray-100"
                            >
                                <option value="">{subRegionsLoading ? "جاري التحميل..." : "اختر المنطقة الفرعية"}</option>
                                {subRegions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}
                            </select>
                        </div>
                        <Input 
                            label="العنوان التفصيلي"
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
                            value={pharmacy ? pharmacy.owner?.first_name + " " + pharmacy.owner?.last_name  : ""} 
                            onChange={() => {}} 
                            isTrue={true}
                            editable={false}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center mt-5">
                    <div className="flex flex-row items-center gap-5 ">
                        <PetrolBtn text="تحديث البيانات" onClick={() => updatePharmacyInfo()} />
                        <p onClick={() => setPharmacyInfo(getInitialPharmacyInfo())} className="underline text-sm text-gray-600 cursor-pointer"> إلغاء </p>
                    </div>
                    {pharmacistRole==="owner" &&
                        <button
                            onClick={() => setShowDeleteConfirmation(true)}
                            dir="rtl"
                            className="w-fit px-5 bg-red-500 rounded-[12px] text-white flex flex-row items-center justify-center gap-2 px-4 py-2 hover:bg-red-600 transition-colors duration-300 cursor-pointer" 
                        >
                            <p className="text-inpt font-[500]">حذف الصيدلية</p>
                        </button>
                    }
                </div>
            </div></>)}
        </Card>
    )
}
