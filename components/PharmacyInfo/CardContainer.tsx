import { ReactNode } from "react";

export default function Card(
    {
        children,
        title = "",
        actions
    }: {
        children: ReactNode;
        title: string;
        actions?: ReactNode;
    } ) {
    return(
        <div dir="rtl" className="bg-white rounded-[24px] shadow-sm flex flex-col items-start justify-start gap-5 w-full p-5 px-10">
            <div className="w-full flex flex-row items-center justify-between">
                <p className="text-24px font-bold flex flex-row items-center gap-2">{title}</p>
                {/* send buttons here */}
                {actions}
            </div>
            
            {children} 
        </div>
    )
}