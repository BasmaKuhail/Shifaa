import Eye from "@/public/icons/admin/Eye"
import X from "@/public/icons/admin/X"
import Check from "@/public/icons/admin/Check"
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import PopUp from "./PharmacistPopup";


export default function Interact({status, id, name, setShowDetails}: {status: string, id: number, name?: string, setShowDetails:Dispatch<SetStateAction<boolean>>}) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setType] = useState<"reject"| "accept" | null>(null);
    const router = useRouter();

    return(
        <div className="w-full flex flex-row gap-3 items-center justify-start">
            <button  
                type="button" 
                title="عرض تفاصيل الطلب" 
                onClick={()=> setShowDetails(prev => !prev)} 
                aria-label="عرض تفاصيل الطلب"
            >
                <Eye className="text-black-700 cursor-pointer"  aria-hidden="true"/>
            </button>
            <button
                type="button" 
                title="رفض الطلب" 
                aria-label="رفض الطلب"
                disabled={status !== "pending"}
                onClick={(e) => {e.stopPropagation(); setType("reject"); setShowPopup(true); }}
            >
                <X className={`${status === "pending" ? "text-black-700 cursor-pointer" : "text-black-200"}`}/>
            </button>
            <button
                type="button" 
                title="قبول الطلب" 
                aria-label="قبول الطلب"
                disabled={status !== "pending"}
                onClick={(e) => {e.stopPropagation(); setType("accept"); setShowPopup(true); }}
            >
                <Check className={`${status === "pending" ? "text-black-700 cursor-pointer" : "text-black-200"}`}/>
            </button>
            {showPopup && <PopUp id={id} popupType={popupType} setShowPopup={setShowPopup} name={name}/>}
            
        </div>
    )
}