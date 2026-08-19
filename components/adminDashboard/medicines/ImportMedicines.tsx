"use client";

import { useState } from "react";
import Card from "@/components/pharmacyDashboard/PharmacyInfo/CardContainer";
import Image from "next/image";
import Excel from "@/public/images/Excel.png";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import Excel2 from "@/public/icons/admin/excel"
import PetrolBtn from "@/components/pharmacyDashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { importMed } from "@/services/admin";
import { showAlert } from "@/components/alerts/AlertContainer";

export default function ImportMedicines(){
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    const getErrorMessage = (error: any): string => {
        const responseMessage = error.response?.data?.message;

        if (typeof responseMessage === "string") {
            return responseMessage;
        }

        if (responseMessage && typeof responseMessage === "object") {
            return Object.values(responseMessage)
            .flat()
            .map(String)
            .join("\n");
        }

        return error.message || "حدث خطأ يرجى المحاولة لاحقاً";
    };
    const handleSubmit = async() => {
        setLoading(true);
        if(!selectedFile){
            showAlert({
                type:"Hint",
                title:"تنبيه",
                message:"يجب أن تختار ملف!"

            })
            setLoading(false);
            return;
        }
        const allowedExtensions = [".xlsx", ".CSV"];
        const fileName = selectedFile.name.toLowerCase();

        if (!allowedExtensions.some((extension) => fileName.endsWith(extension))) {
            showAlert({
                type: "Error",
                title: "ملف غير صالح",
                message: "يرجى اختيار ملف Excel بصيغة XLSX أو CSV.",
            });
            return;
        }
        try{
            await importMed(selectedFile);
            showAlert({
                type:"Success",
                title:"نجح",
                message: "تم رفع الملف بنجاح!"
            })
            setSelectedFile(null);
        }catch (error: any) {
            showAlert({
                type: "Error",
                title: "خطأ",
                message: getErrorMessage(error),
            });
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="mt-13 mb-40 flex w-full flex-col gap-10">
            <p className="text-27px font-semibold">
                اضافة ملف أدوية
            </p>
        
            <Card title="اضافة ملف Excel" scrollable>
                <div className="flex w-full flex-col gap-5">
                    <p className="text-input md:text-btn text-black-700">ملاحظة: لإضافة ملف يجب أن يكون الملف منظم بطريقة مشابهة تماماً للصورة التالية 👇</p>
                    <Image src={Excel} alt="ملف"/>
                    <div className="flex flex-row gap-1 items-center text-input md:text-btn">
                        <p className="text-black-500"> أو بإمكانك تحميل الملف التالي واعادة تعبئته حسب الحاجة:</p>
                        <a href="/shifaaMeds.xlsx" download="shifaaMeds.xlsx" className="hover:underline text-blue-500 flex flexx-row gap-1">
                            تحميل ملف Excel
                            <ArrowDown/>
                        </a>
                    </div>

                    {/* upload file */}
                    <label
                        htmlFor="excel-upload"
                        className="w-fit group flex cursor-pointer flex-col items-center justify-center gap-3
                        rounded-inpt border-2 border-dashed border-blue-500 
                        bg-blue-70 px-6 py-7 text-center 
                        transition-colors hover:bg-blue-100"
                    >
                        <input
                            id="excel-upload"
                            type="file"
                            name="excel"
                            accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                            className="sr-only"
                        />

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black-10 transition-transform ">
                            {selectedFile ? (
                                <CheckCircle2 className="h-8 w-8 text-blue-500" aria-hidden="true" />
                            ) : (
                                <Excel2 className="h-8 w-8 text-blue-500" aria-hidden="true" />
                            )}
                        </div>

                        <span className="flex items-center gap-2 text-btn font-[500] text-blue-500">
                            {selectedFile ? selectedFile.name : "اختر ملف Excel أو اسحبه هنا"}
                        </span>
                        <span className="text-inpt text-black-500">
                            {selectedFile ? "تم اختيار الملف بنجاح" : "الصيغ المدعومة: XLSX و CSV"}
                        </span>
                    </label>
                    
                </div>
                
            </Card>
            <PetrolBtn text={loading?"جاري التسليم" : "حفظ"} onClick={handleSubmit}/>
        </div>
    )
}
