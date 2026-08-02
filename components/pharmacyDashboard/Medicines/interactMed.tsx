import Delete from "@/public/icons/admin/Delete"
import Eye from "@/public/icons/admin/Eye"
import { useState } from "react";
import { useRouter } from "next/router";
import Edit from "@/public/icons/admin/edit";


export default function InteractMed({id, name}: {id: number, name: string|undefined}) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setType] = useState<"delete"| null>(null);
    const router = useRouter();

    const handleSeeDetails = (id:number) => {
        router.push(`/admin-dashboard/pharmacist-requests/pharmacist-request-details/${id}`)
    }
    return(
        <div className="w-full flex flex-row gap-3 items-center justify-start">
            <button  
                type="button" 
                title="عرض تفاصيل الدواء" 
                onClick={() => {handleSeeDetails(id)}} 
                aria-label="عرض تفاصيل الدواء"
            >
                <Eye className="text-black-400 cursor-pointer"  aria-hidden="true"/>
            </button>

            <button
                type="button" 
                title="تعديل الدواء" 
                aria-label="تعديل الدواء"
                onClick={() => {router.push(`/pharmacy-dashboard/my-medicines/edit-medicine-data/${id}`)}}
            >
                <Edit className={`text-black-400 w-5 h-5 cursor-pointer`}/>
            </button>

            <button
                type="button" 
                title="حذف الدواء" 
                aria-label="حذف الدواء"
                onClick={(e) => {e.stopPropagation(); setType("delete"); setShowPopup(true); }}
            >
                <Delete className={`text-black-400 cursor-pointer`}/>
            </button>
            
        </div>
    )
}