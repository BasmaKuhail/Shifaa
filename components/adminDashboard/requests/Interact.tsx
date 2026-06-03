import Delete from "@/public/icons/admin/Delete"
import Eye from "@/public/icons/admin/Eye"
import Check from "@/public/icons/admin/Check"
import { useState } from "react";
import { useRouter } from "next/router";
import PopUp from "./InteractRequestPopup";


export default function Interact({status, id, name}: {status: string, id: number, name: string}) {
    const [showPopup, setShowPopup] = useState(false);
    const [isAccept, setIsAccept] = useState(true);
    const router = useRouter();

    const handleSeeDetails = (id:number) => {
        router.push(`/admin-dashboard/requests/${id}`);
        console.log(`See details of request with id: ${id}`);
    }
    return(
        <div className="w-full flex flex-row gap-3 items-center justify-start">
            {/* <div onClick={() => {setIsAccept(prev => true); setShowPopup(true)}}>
                <Check className={`${status === "pending" ? "text-black-400 cursor-pointer" : "text-black-200"}`}/>
            </div> */}
            <div onClick={() => {handleSeeDetails(id)}}>
                <Eye className="text-black-400 cursor-pointer"/>
            </div>
            {showPopup && <PopUp id={id} isAccept={isAccept} setShowPopup={setShowPopup}/>}
            <div onClick={() => {setIsAccept(prev => false); setShowPopup(true)}}>
                <Delete className={`${status === "pending" ? "text-black-400 cursor-pointer" : "text-black-200"}`}/>
            </div>
            
        </div>
    )
}