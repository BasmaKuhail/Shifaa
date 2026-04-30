import { ReactNode } from "react";

export default function PopupContainer({children, onClose}:{children: ReactNode, onClose: () => void}){
    return(
        <div dir="rtl" className="w-full h-full bg-black-500/50 absolute top-0 left-0 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white w-[50%] rounded-[14px] p-5 px-10 pb-10 flex flex-col items-center justify-center gap-5" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}