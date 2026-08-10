import { Dispatch, SetStateAction } from "react";
import DropDownMenu from "./DropDownMenu";
import Image from "next/image";
import filterArrowDown from "@/public/icons/filterArrowDown.svg"


const elements= [
      {filter: "tablet", title: "أقراص"},
      {filter: "Capsule", title:  "كبسولات"},
      {filter: "Syrup", title:  "شراب"},
      {filter: "MOUTH WASH SOLUTION", title: "معلّق فموي"},
      {filter: "TOPICAL CREAM", title:  "كريم"},
      {filter: "Ointment", title:  "مرهم"},
      {filter: "Gel", title:  "جل"},
      {filter: "Drops", title: " قطرات (عين، أذن، أنف)"},
      {filter: 'Injection', title: "حقن"},
      {filter: "SUPPOSITORY", title:  "تحاميل"},
      {filter: "INHALATION", title: " بخاخ / مستنشق"},
      {filter: "Spray", title: " رذاذ / بخاخ"},
      {filter: 'Powder', title:  "مسحوق"},
      {filter: 'Lotion', title:  "لوشن"},
    ]
type filterProps ={
    dosage:string,
    title: string,
    dropDownOpened: string | null,
    setDropDownOpened:Dispatch<SetStateAction<string | null>>,
    setSelectedDosageForm?:Dispatch<SetStateAction<string>>
}
export default function Dosage({dosage, title,dropDownOpened, setDropDownOpened,setSelectedDosageForm}:filterProps){
    const handleClick = () =>{
        setDropDownOpened((prev) => (prev === title ? null : title));
        console.log("title" , dropDownOpened)

    }
    return(
        <div dir="ltr" className="relative flex flex-col">
            <div 
                className= {`group  
                    p-2 px-4 rounded-[30px] flex flex-row-reverse gap-3 cursor-pointer w-fit
                    ${(dropDownOpened === title)   ? "bg-gradient-to-r from-[#329CCB] to-[#668DCA] text-white" : "bg-white text-black-600"}
                    hover:bg-gradient-to-r
                    hover:from-[#329CCB]
                    hover:to-[#668DCA]
                    hover:text-white
                    transition duration-200`
                }
                onClick={handleClick}
            >
                <Image
                    src={filterArrowDown} 
                    width={9} 
                    alt={""} 
                    className= {`transition duration-200
                        ${(dropDownOpened === title) ? "brightness-0 invert": ""}
                        group-hover:brightness-0
                        group-hover:invert`}
                />
                    <p className="text-inpt">{title}</p>
                      
            </div>
            <div className="absolute top-full right-0">
                {(dropDownOpened === title) && <DropDownMenu title="تصنيف الشكل الدوائي" action={<button onClick={setSelectedDosageForm? ()=> setSelectedDosageForm("") : ()=> {}} className="hover:underline text-xs">اعادة الضبط</button>}>
                        {elements.map((element, index) => 
                            <div className="flex flex-row gap-2 px-3">
                                <input 
                                    className="scale-150 bg-gradient-to-r from-[#329CCB] to-[#668DCA]"
                                    key={index} 
                                    name="dosage-form"
                                    type="checkbox" 
                                    value={element.title}
                                    onChange={setSelectedDosageForm ? () => 
                                        setSelectedDosageForm(element.filter) : () => {}
                                    }
                                    checked={element.filter == dosage}
                                />
                                    <p className="text-inpt">{element.title}</p>
                            </div>
                        )}
                    </DropDownMenu>
                }
            </div>
        </div>
    )
}