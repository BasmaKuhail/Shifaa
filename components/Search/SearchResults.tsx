import { ReactNode } from "react";

export default function SearchResultsContainer({children}:{children:ReactNode}){
    return(

        <div dir="rtl" className="shadow-md w-full z-20 mb-10 flex flex-col w-full justify-center rounded-[10px] bg-white px-4 py-5">
            {children}
        </div>
    )

}