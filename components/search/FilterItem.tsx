import Image from "next/image";
import filterArrowDown from "@/public/icons/filterArrowDown.svg"
import { useState } from "react";
import DropDownMenu from "./DropDownMenu";
type itemProps = {
    title: string,
    elements: (string)[]
}
export default function Item ({title, elements}:itemProps){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleClick = () =>{
        setIsMenuOpen((prev) => !prev);

        console.log(isMenuOpen)
    }
    return(
        <div className="flex flex-col">
            <div 
                className= {`group  
                    p-2 px-4 rounded-[30px] flex flex-row-reverse gap-3 cursor-pointer 
                    ${isMenuOpen  ? "bg-gradient-to-r from-[#3E94B9] to-[#04B6FF] text-white" : "bg-white text-black-600"}
                    hover:bg-gradient-to-r
                    hover:from-[#3E94B9]
                    hover:to-[#04B6FF]
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
                        ${isMenuOpen ? "brightness-0 invert": ""}
                        group-hover:brightness-0
                        group-hover:invert`}
                    
                />
                <p>{title}</p>
                
            </div>
            {isMenuOpen && <DropDownMenu title={title} elements={["أقراص", "كبسولات", "شراب", "كريم / مرهم", "قطرات", "أقراص", "كبسولات", "شراب", "كريم / مرهم", "قطرات"]}/>}
        </div>
    )
}