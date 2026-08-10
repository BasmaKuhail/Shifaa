import { Children } from "react"

type dropDownProps ={
    title: string,
    children: React.ReactNode,
    action:React.ReactNode
}

export default function DropDownMenu({action, title, children}:dropDownProps){
    return(
        <div dir="rtl" className="bg-white w-fit min-w-max rounded-[12px] h-fit flex flex-col p-5 gap-3  border border-black-50 shadow">
            <div className="flex flex-nowrap whitespace-nowrap flex-row justify-between gap-5 items-center w-full">
                <p className="text-inpt text-right">تصنيف {title} </p>
                {action}
            </div>
            <div className="flex flex-col">
                <div 
                    dir="rtl"
                    className="flex flex-col gap-2
                        max-h-[10rem] overflow-y-scroll overflow-x-hidden "
                >
                    {children}
                </div>
            </div>
        </div>
    )
}
