import { useState } from "react";
import Btn from "./Btn";
import Card from "./CardContainer";
import editIcon from "@/public/icons/editProfile/edit.svg"

export default function Branches(){
    const selectedStyle = "flex p-2 bg-blue-1000 rounded-[12px] text-white text-inpt font-semibold text-center items-center justify-center"
    const notSelectedStyle = "flex text-inpt font-semibold text-center items-center justify-center hover:bg-blue-100 rounded-[12px] cursor-pointer"

    const [mainSelected, setMainSelected] = useState(true);

    const mainBranch = {index: 1, name: "صيدلية شنن", location:"غزة - السرايا - مقابل شركة جوال"}

    const otheBranches = [
        {index: 1, name: "صيدلية شنن", location:"غزة - السرايا - مقابل شركة جوال"},
        {index: 2, name: "صيدلية شنن", location:"غزة - السرايا - مقابل شركة جوال"},
        {index: 3, name: "صيدلية شنن", location:"غزة - السرايا - مقابل شركة جوال"}
    ]
    return(
        <Card 
            title="الفروع" 
            actions={
                <Btn text="تعديل" icon={editIcon} onClick={()=>{}}/>    
            }
        >
            <div className="grid grid-cols-2 gap-4 w-full p-2 border border-black-200 rounded-[14px]">
                <div className={mainSelected? selectedStyle : notSelectedStyle} onClick={() => setMainSelected(true)}>
                    الفرع الأساسي
                </div>
                <div className={mainSelected? notSelectedStyle : selectedStyle} onClick={() => setMainSelected(false)}>
                    الفروع الأخرى
                </div>
            </div>

            <div className="w-full flex flex-col gap-5">
                <div className="w-full flex flex-row items-center">
                    <p className="text-inpt w-[15%] font-semibold text-start">الفرع</p>
                    <p className="text-inpt w-[25%] font-semibold text-start">اسم الصيدلية</p>
                    <p className="text-inpt w-[60%] font-semibold text-start">العنوان</p>
                </div>

                {mainSelected && <div className="flex flex-row items-center w-full border border-black-200 rounded-[14px] bg-blue-100">
                        <div className="text-inpt w-[15%] font-semibold text-start ">
                            <p className="w-[70%] border-l border-l-black-200 p-3 bg-white rounded-r-[14px]">{mainBranch.index}</p>
                        </div>
                        <p className="text-inpt w-[25%] font-semibold text-start ">{mainBranch.name}</p>
                        <p className="text-inpt w-[60%] font-semibold text-start">{mainBranch.location}</p> 
                        
                    </div>}
                {!mainSelected && otheBranches.map((branch, indx) => 
                    <div className="flex flex-row items-center w-full border border-black-200 rounded-[14px] bg-blue-100">
                        <div className="text-inpt w-[15%] font-semibold text-start ">
                            <p className="w-[70%] border-l border-l-black-200 p-3 bg-white rounded-r-[14px]">{branch.index}</p>
                        </div>
                        <p className="text-inpt w-[25%] font-semibold text-start ">{branch.name}</p>
                        <p className="text-inpt w-[60%] font-semibold text-start">{branch.location}</p> 
                        
                    </div>)}
            </div>
        </Card>
    )
}