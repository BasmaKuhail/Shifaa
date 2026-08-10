import Image, { StaticImageData } from "next/image";
import x from "@/public/icons/header/x.svg"
import Box from "./FilterItemBox";
import { Dispatch, SetStateAction } from "react";


const elements= [
    {filter: "tablet", title: "أقراص", isSelected: false},
    {filter: "Capsule", title:  "كبسولات", isSelected: false},
    {filter: "Syrup", title:  "شراب", isSelected: false},
    {filter: "MOUTH WASH SOLUTION", title: "معلّق فموي", isSelected: false},
    {filter: "TOPICAL CREAM", title:  "كريم", isSelected: false},
    {filter: "Ointment", title:  "مرهم", isSelected: false},
    {filter: "Gel", title:  "جل", isSelected: false},
    {filter: "Drops", title: " قطرات (عين، أذن، أنف)", isSelected: false},
    {filter: 'Injection', title: "حقن", isSelected: false},
    {filter: "SUPPOSITORY", title:  "تحاميل", isSelected: false},
    {filter: "INHALATION", title: " بخاخ / مستنشق", isSelected: false},
    {filter: "Spray", title: " رذاذ / بخاخ", isSelected: false},
    {filter: 'Powder', title:  "مسحوق", isSelected: false},
    {filter: 'Lotion', title:  "لوشن", isSelected: false},
]
type filterProps ={
    isFilterOpened:boolean, 
    setIsFilterOpened:(isMenuOpened: boolean) => void,
    dosage: string,
    setSelectedDosageForm: Dispatch<SetStateAction<string>>
}
export default function MobileFilter ({
    isFilterOpened,
    setIsFilterOpened,
    dosage,
    setSelectedDosageForm
}:filterProps) {
    return(
        <div className="bg-white p-4 flex flex-col gap-3 py-5 rounded-[14px]">
            <div onClick={() => setIsFilterOpened(!isFilterOpened)}>
                <Image src={x} alt="x" />
            </div>
            <div className="flex flex-row items-center justify-center">
                <p className="font-bold text-21px text-center">تعيين الفلاتر</p>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-row justify-between">
                    <p className="font-[500] text-btn">الشكل الدوائي</p>
                    <button onClick={()=>setSelectedDosageForm("")} className="hover:underline text-xs">اعادة الضبط</button>
                </div>
                <div className="flex flex-wrap gap-1">
                    {elements.map((item, indx) => (
                        <Box
                            key={indx}
                            title={item.title}
                            isSelected={item.filter === dosage}
                            onClick={() => setSelectedDosageForm(item.filter)}
                        />
                    ))}
                </div>
            </div>
            
        </div>
    )
}
