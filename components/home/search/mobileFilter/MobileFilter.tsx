import Image, { StaticImageData } from "next/image";
import x from "@/public/icons/header/x.svg"
import Box from "./FilterItemBox";
import { Dispatch, SetStateAction } from "react";
import MinimumDistanceSlider from "../PriceSlider";


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
    setIsFilterOpened:(isMenuOpened: boolean) => void,
    dosage: string,
    setSelectedDosageForm: Dispatch<SetStateAction<string>>,
    min:number,
    max:number,
    setMin:Dispatch<SetStateAction<number>>,
    setMax:Dispatch<SetStateAction<number>>,
    
}
const MIN_PRICE = 1;
const MAX_PRICE = 200;
export default function MobileFilter ({
    setIsFilterOpened,
    dosage,
    setSelectedDosageForm,
    min, max, setMin, setMax
}:filterProps) {
    const handleMinChange = (value: number) => {
        const clampedValue = Math.max(
        MIN_PRICE,
        Math.min(value, max),
        );

        setMin(clampedValue);
    };
    const handleMaxChange = (value: number) => {
        const clampedValue = Math.min(
        MAX_PRICE,
        Math.max(value, min),
        );

        setMax(clampedValue);
    };
      const handleSliderChange = (
            newMin: number,
            newMax: number,
        ) => {
            setMin(newMin);
            setMax(newMax);
        };
    const handleResetPrice = () => {
        setMin(MIN_PRICE);
        setMax(MAX_PRICE);
    };
    return(
        <div className="relative z-50 pointer-events-auto bg-white p-4 flex flex-col gap-3 py-5 rounded-[14px]">
            <button
                type="button"
                aria-label="Close filters"
                onClick={() => setIsFilterOpened(false)}
                className="w-fit cursor-pointer"
            >
                <Image src={x} alt="x" />
            </button>
            
            <div className="flex flex-row items-center justify-center">
                <p className="font-bold text-21px text-center">تعيين الفلاتر</p>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-row justify-between items-center ml-5">
                    <p className="font-[500] text-btn">الشكل الدوائي</p>
                    <button onClick={()=> setSelectedDosageForm("")} className="hover:underline text-xs">اعادة الضبط</button>
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
            <div className="flex flex-row justify-between items-center ml-5">
                <p className="font-[500] text-btn">السعر </p>
                <button onClick={()=> handleResetPrice()} className="hover:underline text-xs">اعادة الضبط</button>
            </div>
            <div className="flex flex-col items-center gap-1">
                
            <div className="flex flex-row w-full items-center justify-center gap-5">

                <div className="flex flex-row gap-1 items-center text-black-500">
                    <input 
                        className="w-[90px] h-[35px] p-2 border border-black-200 rounded-full" 
                        type="number"
                        value={max}
                        onChange={(e) =>
                            handleMaxChange(Number(e.target.value))
                        }
                        name="max"
                        min={min} 
                        max={MAX_PRICE}
                    />₪
                </div>
                                <div className="flex flex-row gap-1 items-center text-black-500">
                    <input 
                        className="w-[90px] h-[35px] p-2 border border-black-200 rounded-full" 
                        type="number"
                        value={min}
                        onChange={(e) =>
                            handleMinChange(Number(e.target.value))
                        }
                        name="min"
                        min={MIN_PRICE} 
                        max={max}
                    />₪
                </div>
            </div>
            <MinimumDistanceSlider min={min} max={max} onChange={handleSliderChange}/>
            </div>
        </div>
    )
}
