import X from "@/public/icons/admin/X"
import Check from "@/public/icons/admin/Check"
import { useState } from "react";
import { useRouter } from "next/router";
import PopUp from "@/components/adminDashboard/requests/InteractRequestPopup";
import PopUpPharmacyRequests from "./PopRequests";


export default function InteractJoinPharm({status, id, name}: {status: string, id: number, name: string|undefined}) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setType] = useState<"reject" | "accept" | null>(null);
    const router = useRouter();

    return(
        <div className="w-full flex flex-row gap-3 items-center justify-start">
            {showPopup && <PopUpPharmacyRequests id={id} popupType={popupType} setShowPopup={setShowPopup} name={name} rejectMsg=""/>}
            <button
                type="button" 
                title="قبول الطلب" 
                aria-label="قبول الطلب"
                disabled={status !== "pending" }
                onClick={(e) => {e.stopPropagation(); setType("accept"); setShowPopup(true); }}
            >
                <Check className={`${status === "pending" ? "text-black-400 cursor-pointer" : "text-black-200"}`}/>
            </button>
            <button
                type="button" 
                title="رفض الطلب" 
                aria-label="رفض الطلب"
                disabled={status !== "pending" }
                onClick={(e) => {e.stopPropagation(); setType("reject"); setShowPopup(true); }}
            >
                <X className={`${status === "pending" ? "text-black-400 cursor-pointer" : "text-black-200"}`}/>
            </button>

            
        </div>
    )
}