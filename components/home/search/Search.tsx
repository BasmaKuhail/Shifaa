import { useEffect, useRef, useState } from "react"
import SearchInput from "./SearchInput"
import Text from "./Text"
import Item from "./FilterItem"
import MinimumDistanceSlider from "./PriceSlider"

const filters =[
    {title: "الشكل الدوائي", elements:["أقراص", "كبسولات", "شراب", "كريم / مرهم", "قطرات", "أقراص", "كبسولات", "شراب", "كريم / مرهم", "قطرات"]},
    // {title: "التصنيف", elements:[]},
    {title: "₪ السعر", elements:<MinimumDistanceSlider/>},
    {title: "الموقع الجغرافي", elements:[]}
]
export default function SearchHome ({userInputProp}:{userInputProp?:string}){
    const [userInput, setUserInput] = useState(userInputProp|| "");

    const [dropDownOpened, setDropDownOpened] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setDropDownOpened(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div dir="rtl" className="flex flex-col w-full px-4 md:px-8 lg:px-20 xl:px-30 pt-4 gap-8">
            <Text 
                intro="صحتك أولويتنا" 
                titleBlack="ابحث عن دوائك" 
                titleBlue="في ثوانٍ" 
                sentence="ابحث، صَفِّ النتائج، قارن الأسعار، وتحقق من التوفر بالقرب منك"
            />
            <div className="flex flex-col gap-4 lg:w-[90%] xl:w-[70%] w-full">
                <SearchInput label=" ابحث عن الأدوية" value= {userInput} onChange={(value) => setUserInput(value)}/>
                
                <div 
                    className="flex flex-row md:flex-row gap-5 hidden lg:flex md:flex "
                    ref={containerRef}
                >
                    {filters.map((item, indx) => 
                        <Item 
                            key={indx} 
                            title={item.title} 
                            elements= {item.elements}
                            dropDownOpened={dropDownOpened}
                            setDropDownOpened={setDropDownOpened}
                            />
                    )}
                </div>
            </div>
            
            
        </div>
    ) 
}