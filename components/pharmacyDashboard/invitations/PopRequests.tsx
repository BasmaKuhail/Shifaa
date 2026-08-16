import { showAlert } from "@/components/alerts/AlertContainer";
import PetrolBtn from "@/components/pharmacyDashboard/PharmacyInfo/invitePopup/PetrolBtn";
import PopupContainer from "@/components/pharmacyDashboard/PharmacyInfo/PopUpContainer";
import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";
import { AdminPharmacyRequestContext } from "@/contexts/AdminPharmcyRequestsContext";
import { interactPharmacistRequest } from "@/services/pharmacy";

import { Dispatch, SetStateAction, useContext, useState } from "react";
type popUpProps = {
    id:number, 
    popupType: "reject" |"accept" | null, 
    setShowPopup:Dispatch<SetStateAction<boolean>>, 
    name:string | undefined, 
    rejectMsg:string
}
export default function PopUpPharmacyRequests ({id, popupType, setShowPopup, name, rejectMsg}:popUpProps){
    const [ isSubmitting, setIsSubmited] = useState(false);

    const onClose = () => {
        setShowPopup(false);
    };
    const handleAccept = async () => {
        setIsSubmited(true);
            try {
                await interactPharmacistRequest(id,"accepted");
                showAlert({
                    type:"Success",
                    title:"Success",
                    message:"تم قبول الطلب بنجاح"
                });
                
                setShowPopup(false);
            } catch (error) {
                console.error(error);
                showAlert({
                    type:"Error",
                    title:"خطأ",
                    message:"حدث خطأ!"
                });
                setIsSubmited(false);
            }
    }


    const handleReject = async (rejectMsg:string) => {
        setIsSubmited(true);
        try {
            await interactPharmacistRequest(id, "rejected");
          
            showAlert({
                    type:"Success",
                    title:"Success",
                    message:"تم رفض الطلب بنجاح"
                });
            setShowPopup(false);
        } catch (error) {
            console.error(error);
                showAlert({
                    type:"Error",
                    title:"خطأ",
                    message:"حدث خطأ!"
                });
                setIsSubmited(false);
        }
    }

    const text = () => {
        if(popupType === "accept")
            return "هل تريد قبول طلب:" 
        else if (popupType === "reject")
            return " هل تريد رفض طلب:"
    }
    const functionToCall = () => {
        if(popupType === "accept"){
            handleAccept()
            return
        }
        else if (popupType === "reject"){
            handleReject(rejectMsg)
            return
        }
    }
        return(
            <PopupContainer onClose={onClose}>
                <div className="flex flex-col items-center justify-center mt-5">
                    <p className="text-btn font-semibold">{text()}{name}</p>
                    <div className="flex flex-row items-center gap-5 mt-5">
                        <PetrolBtn text={isSubmitting? "...جاري التسليم" : "نعم"} onClick={() => functionToCall()}/>
                        <PetrolBtn text="لا" onClick={onClose}/>
                    </div>
                </div>
            </PopupContainer>
        )
    }