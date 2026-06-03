import PetrolBtn from "@/components/dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import PopupContainer from "@/components/dashboard/PharmacyInfo/PopUpContainer";
import { acceptPharmacistApplication, rejectPharmacistApplication } from "@/services/admin";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

export default function PopUp ({id, isAccept, setShowPopup}:{id:number, isAccept: boolean, setShowPopup:Dispatch<SetStateAction<boolean>>}){
    const router = useRouter();
    const onClose = () => {
        setShowPopup(false);
    };
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