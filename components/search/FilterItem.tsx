import Image from "next/image";
import filterArrowDown from "@/public/icons/filterArrowDown.svg"
type itemProps = {
    title: string,
    elements: (string)[]
}
export default function Item ({title, elements}:itemProps){
    return(
        <div className="bg-white p-2 px-4 rounded-[30px] flex flex-row-reverse gap-3">
            <Image className="cursor-pointer" src={filterArrowDown} width={9} alt={""} onClick={()=>{}}/>
            <p>{title}</p>
        </div>
    )
}