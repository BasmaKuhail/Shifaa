import Delete from "@/public/icons/admin/Delete"
import Eye from "@/public/icons/admin/Eye"
import { useState } from "react";
import { useRouter } from "next/router";
import Edit from "@/public/icons/admin/edit";
import DeleteMedPopup from "./DeletePopup";


export default function InteractMed({pharmId, id, name}: {pharmId: number | undefined, id: number, name: string|undefined}) {
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

const handleViewMedicine = async (
  event: React.MouseEvent<HTMLButtonElement>,
) => {
  event.stopPropagation();

  if (!pharmId) {
    console.error("Cannot view medicine: pharmacy ID is missing");
    return;
  }

  await router.push(
    `/pharmacy-dashboard/my-medicines/${encodeURIComponent(String(id))}?pharmacy_id=${encodeURIComponent(String(pharmId))}`,
  );
};
    return(
        <div className="w-full flex flex-row gap-3 items-center justify-start">
            <button
                type="button"
                title="عرض تفاصيل الدواء"
                onClick={handleViewMedicine}
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
                onClick={(e) => {e.stopPropagation(); setShowPopup(true); }}
            >
                <Delete className={`text-black-400 cursor-pointer`}/>
            </button>
            {showPopup   && <DeleteMedPopup id={id} onClose={() => setShowPopup(false)}/>}
        </div>
    )
}
