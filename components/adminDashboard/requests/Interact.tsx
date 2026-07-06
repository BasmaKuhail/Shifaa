import Delete from "@/public/icons/admin/Delete"
import Eye from "@/public/icons/admin/Eye"
import X from "@/public/icons/admin/X"
import { useState } from "react";
import { useRouter } from "next/router";
import PopUp from "./InteractRequestPopup";


export default function Interact({status, id, name, type}: {status: string, id: number, name: string, type:"pharmacist" | "pharmacy"}) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setType] = useState<"reject" | "delete" | "accept" | null>(null);
    const router = useRouter();

    const handleSeeDetails = (id:number) => {
        type === "pharmacist" ?
            router.push(`/admin-dashboard/requests/pharmacist-request-details/${id}`)
            :
            router.push(`/admin-dashboard/requests/pharmacy-request-details/${id}`)
            // console.log(`See details of request with id: ${id}`);
    }
    return(
        <div className="w-full flex flex-row gap-3 items-center justify-start">
            <button  
                type="button" 
                title="عرض تفاصيل الطلب" 
                onClick={() => {handleSeeDetails(id)}} 
                aria-label="عرض تفاصيل الطلب"
            >
                <Eye className="text-black-400 cursor-pointer"  aria-hidden="true"/>
            </button>
            {showPopup && <PopUp type= {type} id={id} popupType={popupType} setShowPopup={setShowPopup} name={name} rejectMsg=""/>}
            {/* <button
                type="button" 
                title="رفض الطلب" 
                aria-label="رفض الطلب"
                disabled={status === "rejected"}
                onClick={(e) => {e.stopPropagation(); setType("reject"); setShowPopup(true); }}
            >
                <X className={`${status === "pending" ? "text-black-400 cursor-pointer" : "text-black-200"}`}/>
            </button> */}
            <button
                type="button" 
                title="حذف الطلب" 
                aria-label="حذف الطلب"
                // disabled={(status === "active")}
                onClick={(e) => {e.stopPropagation(); setType("delete"); setShowPopup(true); }}
            >
                <Delete className={`text-black-400 cursor-pointer"}`}/>
            </button>
            
        </div>
    )
}