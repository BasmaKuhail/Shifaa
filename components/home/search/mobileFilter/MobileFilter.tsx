import Image, { StaticImageData } from "next/image";
import x from "@/public/icons/header/x.svg"
import Box from "./FilterItemBox";

const type =[
    {title: "أقراص", isSelected: false},
    {title: "كبسولات", isSelected: true},
    {title: "شراب", isSelected: false},
    {title: "قطرات", isSelected: false},
    {title: "كريم / مرهم", isSelected: false},
]
type filterProps ={
    isFilterOpened:boolean, 
    setIsFilterOpened:(isMenuOpened: boolean) => void
}
export default function MobileFilter ({isFilterOpened, setIsFilterOpened}:filterProps) {
    return(
        <div className="bg-white p-4 flex flex-col gap-3 py-5 rounded-[14px]">
            <div onClick={() => setIsFilterOpened(!isFilterOpened)}>
                <Image src={x} alt="x" />
            </div>
            <div className="flex flex-row items-center justify-center">
                <p className="font-bold text-21px text-center">تعيين الفلاتر</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-[500] text-btn">الشكل الدوائي</p>
                <div className="flex flex-wrap gap-1">
                    {type.map((item, indx) => <Box key={indx} title={item.title} isSelected={item.isSelected}/>)}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-[500] text-btn">الشكل الدوائي</p>
            </div>
            
        </div>
    )
}