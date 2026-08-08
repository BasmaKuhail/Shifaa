import { useState } from "react";
import PetrolBtn from "../PharmacyInfo/invitePopup/PetrolBtn";
import PopupContainer from "../PharmacyInfo/PopUpContainer";
import { deleteMedicine } from "@/services/medication";
import { showAlert } from "@/components/alerts/AlertContainer";

export default function DeleteMedPopup ({id, onClose}:{id:number, onClose:() => void}){
    const [ isSubmitting, setIsSubmited] = useState(false);
    
    const deleteMed = async() => {
        try{
            setIsSubmited(true);
            await deleteMedicine(id);

            showAlert({
                type:"Success",
                title:"نجح!",
                message: "تم حذف الدواء بنجاح"
            })
        }catch(error:any){
            console.log(error.message)
            showAlert({
                type:"Error",
                title:"خطأ!",
                message: error.message || "حدث خطأ"
            })
        }finally{
            setIsSubmited(false);
        }
    }
    
    return(
        <PopupContainer onClose={onClose}>
            <div className="flex flex-col items-center justify-center mt-5">
                <p className="text-btn font-semibold">أنت على وشك حذف الدواء</p>
                <div className="flex flex-row items-center gap-5 mt-5">
                    <PetrolBtn text={isSubmitting? "...جاري التسليم" : "حذف"} onClick={() => deleteMed()}/>
                    <PetrolBtn text="إلغاء" onClick={onClose}/>
                </div>
            </div>
        </PopupContainer>
    )
}