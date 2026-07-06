import { showAlert } from "@/components/alerts/AlertContainer";
import PetrolBtn from "@/components/dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import PopupContainer from "@/components/dashboard/PharmacyInfo/PopUpContainer";
import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";
import { AdminPharmacyRequestContext } from "@/contexts/AdminPharmcyRequestsContext";
import { 
    acceptPharmacistApplication, 
    deletePharmacistApplication, 
    rejectPharmacistApplication,
    acceptPharmacyApplication,
    deletePharmacyApplication,
    rejectPharmacyApplication
} from "@/services/admin";
import { Dispatch, SetStateAction, useContext, useState } from "react";

type popUpProps = {
    id:number, 
    popupType: "reject" | "delete" | "accept" | null, 
    type: "pharmacist" | "pharmacy"
    setShowPopup:Dispatch<SetStateAction<boolean>>, 
    name:string | undefined, 
    rejectMsg:string
}
export default function PopUp ({id, popupType, type, setShowPopup, name, rejectMsg}:popUpProps){
    const { refreshRequests} =useContext(AdminRequestContext);
    const { refreshPharmRequests} =useContext(AdminPharmacyRequestContext);
    const [ isSubmitting, setIsSubmited] = useState(false);

    const onClose = () => {
        setShowPopup(false);
    };
    const handleAccept = async () => {
        setIsSubmited(true);
            try {
                if(type === "pharmacist"){ 
                    await acceptPharmacistApplication(id);
                    await refreshRequests()
                }else{
                    await acceptPharmacyApplication(id);
                    await refreshPharmRequests()
                }
                showAlert({
                    type:"Success",
                    title:"Success",
                    message:"تم قبول الطلب بنجاح"
                });
                
                setShowPopup(false);
                // router.reload()
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
            if(type === "pharmacist"){ 
                await rejectPharmacistApplication(id, rejectMsg);
                await refreshRequests();
            }else{
               await rejectPharmacyApplication(id, rejectMsg);
                await refreshPharmRequests(); 
            }
            showAlert({
                    type:"Success",
                    title:"Success",
                    message:"تم رفض الطلب بنجاح"
                });
            // console.log("تم رفض الطلب بنجاح");
            setShowPopup(false);
            // router.reload()
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
    
        const handleDelete = async () => {
            setIsSubmited(true);
            try {
                if(type === "pharmacist"){ 
                    await deletePharmacistApplication(id);
                    await refreshRequests();
                }else{
                    await deletePharmacyApplication(id);
                    await refreshPharmRequests();
                }

                showAlert({
                    type:"Success",
                    title:"Success",
                    message:"تم حذف الطلب بنجاح"
                });
                // console.log("suceessfully deleted")
                setShowPopup(false);
                // router.reload()
            } catch (error) {
                console.error(error);
                showAlert({
                    type:"Error",
                    title:"خطأ",
                    message:"حدث خطأ!"
                });
                setIsSubmited(false);
            }
    };
    const text = () => {
        if(popupType === "accept")
            return "هل تريد قبول طلب"
        else if(popupType === "delete")
            return "هل تريد حذف طلب"
        else if (popupType === "reject")
            return "هل تريد رفض طلب"
    }
    const functionToCall = () => {
        if(popupType === "accept"){
            handleAccept()
            return
        }
        else if(popupType === "delete"){
            handleDelete()
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