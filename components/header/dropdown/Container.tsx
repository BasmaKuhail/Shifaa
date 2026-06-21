import { ReactNode } from "react";

export default function Container({children}:{children:ReactNode}){
    return(
        <div dir="rtl" className="bg-white rounded-[12px] py-4 p-3 w-[24rem]">
            {children}
        </div>
    )
}