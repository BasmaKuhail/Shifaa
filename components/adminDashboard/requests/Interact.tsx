import X from "@/public/icons/admin/X"
import Check from "@/public/icons/admin/Check"
import { acceptPharmacistApplication, rejectPharmacistApplication } from "@/services/admin";
import PopupContainer from "@/components/dashboard/PharmacyInfo/PopUpContainer";
import { useState } from "react";
import PetrolBtn from "@/components/dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { useRouter } from "next/router";


export default function Interact({status, id, name}: {status: string, id: number, name: string}) {
    const [showPopup, setShowPopup] = useState(false);
    const [isAccept, setIsAccept] = useState(true);
    const router = useRouter();

    const onClose = () => {
        setShowPopup(false);
    };

    const PopUp = ({isAccept}:{isAccept: boolean}) => {
        return(
            <PopupContainer onClose={onClose}>
                <div className="flex flex-col items-center justify-center mt-5">
                    <p className="text-btn font-semibold"> {isAccept ?` هل أنت تريد قبول طلب ${name}؟ `: `هل أنت تريد رفض طلب ${name}؟ `}</p>
                    <div className="flex flex-row items-center gap-5 mt-5">
                        <PetrolBtn text="نعم" onClick={isAccept ? handleAccept : handleReject}/>
                        <PetrolBtn text="لا" onClick={onClose}/>
                    </div>
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
                router.reload()
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleReject = async () => {
        if (status === "pending") {
            try {
                await rejectPharmacistApplication(id);
                alert("تم رفض الطلب بنجاح");
                setShowPopup(false);
                router.reload()
            } catch (error) {
                console.error(error);
            }
        }
    };
    return(
        <div className="flex flex-row gap-3">
            <div onClick={() => {setIsAccept(prev => true); setShowPopup(true)}}>
                <Check className={`${status === "pending" ? "text-online cursor-pointer" : "text-black-200"}`}/>
            </div>
            {showPopup && <PopUp isAccept={isAccept}/>}
            <div onClick={() => {setIsAccept(prev => false); setShowPopup(true)}}>
                <X className={`${status === "pending" ? "text-red cursor-pointer" : "text-black-200"}`}/>
            </div>
            
        </div>
    )
}