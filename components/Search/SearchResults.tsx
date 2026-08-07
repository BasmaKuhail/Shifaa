import { ReactNode } from "react";

export default function SearchResultsContainer({children}:{children:ReactNode}){
    return(
        <div dir="rtl" className="w-full z-20 mb-10 flex w-full justify-center">
            <div className="shadow-md flex w-full flex-col divide-y divide-black-200 rounded-[10px] bg-white px-2 py-5 shadow-sm md:flex-row md:divide-x md:divide-y-0 md:px-4">
                {children}
            </div>
        </div>
    )

}