import { useEffect, useState } from "react";
import Invitations from "./Invitiations";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import MedRequests from "./MedRequests";

export default function RequestInvitation(){
    const [medSelected, setMedSelected] = useState(true);
    const selectedStyle = "flex p-2 bg-blue-1000 rounded-[12px] text-white text-inpt font-semibold text-center items-center justify-center"
    const notSelectedStyle = "flex text-inpt font-semibold text-center items-center justify-center hover:bg-blue-100 rounded-[12px] cursor-pointer"

    
    return(
        <div className="flex flex-col gap-10">
            <p className="font-bold text-btn md:text-27px">طلبات الأدوية والدعوات المُستقبَلة</p>

            <div className="grid grid-cols-2 gap-2 md:gap-4 w-full p-1 md:p-2 border border-black-200 rounded-[14px]">
                <div className={medSelected? selectedStyle : notSelectedStyle} onClick={() => setMedSelected(true)}>
                    طلبات الأدوية
                </div>
                <div className={medSelected? notSelectedStyle : selectedStyle} onClick={() => setMedSelected(false)}>
                    الدعوات المُستقبَلة
                </div>
            </div>

            {!medSelected && <Invitations/>}
            {medSelected && <MedRequests/>}
        </div>
    )
}