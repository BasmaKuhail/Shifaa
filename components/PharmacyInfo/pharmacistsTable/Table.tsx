import { useState } from "react";
import Row from "./Row";

type TableProps = {
    pharmacistsArr: {name: string, contactNum: string, email: string, address:string, }[];
    onEdit:boolean
}
export default function Table({pharmacistsArr, onEdit=false}: TableProps){
    const [checkBoxChecked, setCheckBoxChecked] = useState(false)
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

     const handleCheck = (index: number) => {
        setCheckedItems((prev) =>
        prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
        );
    };
    return(
        <div className="w-full flex flex-col gap-2">
            <div className="flex items-center gap-5 p-2">
                {onEdit &&  <div className="w-6" />}
                <Row pharmacist={{name: "الاسم", contactNum: "رقم التواصل", email: "البريد الالكتروني", address: "العنوان"}} isFrist={true} />
            </div>
            
            {pharmacistsArr.map((pharmacist, index) => (
                <div className={
                        `flex flex-row items-center justify-between gap-5 
                        hover:bg-gray-50 
                        px-2 
                        py-1
                        transition 
                        border-t border-black-200 border-t-1
                        text-black-500
                        cursor-pointer
                        `
                    }
                    onClick={() => handleCheck(index)}
                >
                    {onEdit && (
                        <input
                            type="checkbox"
                            checked={checkedItems.includes(index)}
                            onChange={() => handleCheck(index)}
                            className="w-4 h-4 cursor-pointer"
                        />
                    )}
                    <Row key={index} pharmacist={pharmacist} />
                </div>
                
            ))}
        </div>
    )
}