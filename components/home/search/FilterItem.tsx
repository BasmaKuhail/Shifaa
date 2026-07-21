import Image from "next/image";
import filterArrowDown from "@/public/icons/filterArrowDown.svg"
import { Dispatch, SetStateAction, useState } from "react";
import DropDownMenu from "./DropDownMenu";
type itemProps = {
    title: string,
    elements: (string)[];
    dropDownOpened: string | null;
    setDropDownOpened:Dispatch<SetStateAction<string | null>>;
}
export default function Item ({title, elements, dropDownOpened, setDropDownOpened}:itemProps){

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
            {(dropDownOpened === title) && <DropDownMenu title={title} elements={["أقراص", "كبسولات", "شراب", "كريم / مرهم", "قطرات", "أقراص", "كبسولات", "شراب", "كريم / مرهم", "قطرات"]}/>}
            </div>
        </div>
    )
}
