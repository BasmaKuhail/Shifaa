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
            number:265
        },
        {
            id:2,
            title: "كل الطلبات",
            icon: comment,
            number:265
        },
        {
            id:3,
            title: "أخر تحديث",
            icon: updates,
            date:"19-11-2026"
        },
      
    ]
    return(
        <div className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <p className="font-semibold text-27px">مرحباً {user?.firstName} 👋🏼</p>
            <Card>
                <div className="flex flex-col md:flex-row w-full gap-4 items-center justify-between">
                    {headItems.map((item, index)=> (
                        <div
                            key={item.id}
                            className={`flex w-full pb-4 md:w-auto md:justify-center md:p-2 ${
                                index !== headItems.length - 1
                                    ? "border-b border-black-50 md:border-b-0"
                                    : ""
                            } ${
                                index !== 0
                                    ? "md:border-r md:border-black-50 md:pr-20"
                                    : "md:pl-20"
                            }`}
                        >
                            <Item item={item}/>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
