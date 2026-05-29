import { ReactNode } from "react";

export default function Card(
    {
        children,
        title = "",
        actions,
        scrollable = false,
    }: {
        children: ReactNode;
        title?: string;
        actions?: ReactNode;
        scrollable?: boolean;
    } ) {
    return(
        <div dir="rtl" className="bg-white rounded-[24px] shadow-sm flex flex-col items-start justify-start gap-5 w-full p-5 px-10">
            {scrollable && <p className="text-xs text-black-500 md:hidden landscape:hidden">للحصول على تجربة أفضل، قم بتفعيل دوران الهاتف واستخدمه بشكل أفقي</p>}
            <div className="w-full flex flex-row flex-wrap gap-3 items-center justify-between">
                <p className="text-24px font-bold flex flex-row items-center gap-2">{title}</p>
                {/* send buttons here */}
                {actions}
            </div>
            
            {scrollable ? (
                <div className="w-full overflow-x-auto overscroll-x-contain custom-x-scrollbar">
                <div style={{ minWidth: 750 }}>{children}</div>
                </div>
            ) : (
                <div className="w-full">{children}</div>
            )} 
        </div>
    )
}