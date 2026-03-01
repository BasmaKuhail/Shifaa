import { useState } from "react"
import SearchInput from "./SearchInput"
import Text from "./Text"
import Item from "./FilterItem"

const filters =[
    {title: "الشكل الدوائي", elements:[]},
    {title: "التصنيف", elements:[]},
    {title: "السعر", elements:[]},
    {title: "الموقع الجغرافي", elements:[]},
    {title: "الفئة العمرية", elements:[]},
    {title: "يتطلب وصفة طبية", elements:[]},
]
export default function SearchHome (){
    const [userInput, setUserInput] = useState("")
    return(<div className="flex flex-col items-end w-full px-4 md:px-8 lg:px-30 pt-4 gap-8">
        <Text intro="صحتك أولويتنا" titleBlack="ابحث عن دوائك" titleBlue="في ثوانٍ" sentence="ابحث، صَفِّ النتائج، قارن الأسعار، وتحقق من التوفر بالقرب منك"/>
        <div className="flex flex-col gap-4 w-[70%]">
            <SearchInput label=" ابحث عن الأدوية" value= {userInput} onChange={(value) => setUserInput(value)}/>
            <div className="flex flex-row justify-between">{filters.map((item) => <Item title={item.title} elements= {item.elements}/>)}</div>
        </div>
        
        
    </div>) 
}