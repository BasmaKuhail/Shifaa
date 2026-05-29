import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import Card from "../dashboard/PharmacyInfo/CardContainer";
import { number } from "react-i18next/icu.macro";

import comment from "@/public/icons/adminDashboard/comment.svg"
import medcin from "@/public/icons/adminDashboard/medicen.svg"
import updates from "@/public/icons/adminDashboard/updates.svg"
import Item from "./Item";
export default function AdminDashboard() {
    const {user, loading} = useContext(UserContext);
    
    const headItems = [
        {
            id:1,
            title: "كل الأدوية",
            icon: medcin,
            iconWidth:50,
            number:265
        },
        {
            id:2,
            title: "كل الطلبات",
            icon: comment,
            iconWidth:50,
            number:265
        },
        {
            id:3,
            title: "أخر تحديث",
            icon: updates,
            iconWidth:50,
            date:"19-11-2026"
        },
      
    ]
    return(
        <div className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <p className="font-semibold text-27px">مرحباً {user?.firstName} 👋🏼</p>
            <Card>
                <div className="flex flex-col xl:flex-row w-full gap-4 items-center justify-between">
                    {headItems.map((item, index)=> (
                        <div
                            key={item.id}
                            className={`flex w-full pb-4 xl:w-auto xl:justify-center xl:p-2 ${
                                index !== headItems.length - 1
                                    ? "border-b border-black-50 xl:border-b-0"
                                    : ""
                            } ${
                                index !== 0
                                    ? "xl:border-r xl:border-black-50 xl:pr-20"
                                    : "xl:pl-20"
                            }`}
                        >
                            <Item item={item}/>
                        </div>
                    ))}
                </div>
            </Card>
            <div className="flex flex-row items-center w-full gap-10">
                <Card>
                    <div>
                        
                    </div>
                </Card>      
                <Card>
                    <div>
                        
                    </div>
                </Card>
            </div>
        </div>
    )
}
