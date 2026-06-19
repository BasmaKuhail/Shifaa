import { ReactNode } from "react";

export default function PopupContainer({children, onClose}:{children: ReactNode, onClose: () => void}){
    return(
        <div dir="rtl" className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
            <div className="bg-white w-[90%] md:w-[70%] lg:w-[50%] rounded-[14px] p-5 px-10 pb-10 flex flex-col items-center justify-center gap-5" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}