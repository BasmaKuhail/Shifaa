import { showAlert } from "@/components/alerts/AlertContainer";
import PetrolBtn from "@/components/pharmacyDashboard/PharmacyInfo/invitePopup/PetrolBtn";
import PopupContainer from "@/components/pharmacyDashboard/PharmacyInfo/PopUpContainer";
import { interactIvitaion } from "@/services/invitiations";
import { useRouter } from "next/router";


import { Dispatch, SetStateAction, useContext, useState } from "react";

type popUpProps = {
    id:number, 
    popupType: "reject" | "accept" | null, 
    setShowPopup:Dispatch<SetStateAction<boolean>>, 
    name:string | undefined, 
}
export default function PopUp ({id, popupType, setShowPopup, name}:popUpProps){
    const [ isSubmitting, setIsSubmited] = useState(false);

    const router = useRouter()
    const onClose = () => {
        setShowPopup(false);
    };
    const handleAccept = async () => {
        setIsSubmited(true);
        
            try {
                await interactIvitaion(id, "accepted")
                showAlert({
                    type:"Success",
                    title:"Success",
                    message:"تم قبول الطلب بنجاح"
                });
        
                
                router.reload()
            } catch (error) {
                console.error(error);
                showAlert({
                    type:"Error",
                    title:"خطأ",
                    message:"حدث خطأ!"
                });
            }finally{
                setIsSubmited(false)
                setShowPopup(false);
            }
    }


    const handleReject = async () => {
        setIsSubmited(true);
        try {
            await interactIvitaion(id, "rejected")
            showAlert({
                    type:"Success",
                    title:"Success",
                    message:"تم رفض الطلب بنجاح"
                });
            router.reload()
        } catch (error) {
            console.error(error);
                showAlert({
                    type:"Error",
                    title:"خطأ",
                    message:"حدث خطأ!"
            });
        } finally{
            setIsSubmited(false)
            setShowPopup(false);
        }
    }
    
    const text = () => {
        if(popupType === "accept")
            return "هل تريد قبول طلب"
        else if (popupType === "reject")
            return "هل تريد رفض طلب"
    }
    const functionToCall = () => {
        if(popupType === "accept"){
            handleAccept()
            return
        }
        else if (popupType === "reject"){
            handleReject()
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