import X from "@/public/icons/admin/X"
import Check from "@/public/icons/admin/Check"
import { acceptPharmacistApplication } from "@/services/admin";
import PopupContainer from "@/components/dashboard/PharmacyInfo/PopUpContainer";
import { useState } from "react";
import PetrolBtn from "@/components/dashboard/PharmacyInfo/invitePopup/PetrolBtn";


export default function Interact({status, id, name}: {status: string, id: number, name: string}) {
    const [showPopup, setShowPopup] = useState(false);

    const onClose = () => {
        setShowPopup(false);
    };

    const PopUp = () => {
        return(
            <PopupContainer onClose={onClose}>
                <h2>هل أنت تريد قبول طلب {name} </h2>
                <div className="flex flex-row items-center gap-5 mt-5">
                    <PetrolBtn text="نعم" onClick={handleAccept}/>
                    <PetrolBtn text="لا" onClick={onClose}/>
                </div>
            </PopupContainer>
        )
    }
    const handleAccept = async () => {
        if (status === "pending") {
            try {
                await acceptPharmacistApplication(id);
                alert("تم قبول الطلب بنجاح");
                setShowPopup(false);
            } catch (error) {
                console.error(error);
            }
        }
    };
    return(
        <div className="flex flex-row gap-3">
            <div onClick={() => setShowPopup(true)}>
                <Check className={`${status === "pending" ? "text-online cursor-pointer" : "text-black-200"}`}/>
            </div>
            {showPopup && <PopUp />}
            <div>
                <X className={`${status === "pending" ? "text-red cursor-pointer" : "text-black-200"}`}/>
            </div>
            
        </div>
    )
}