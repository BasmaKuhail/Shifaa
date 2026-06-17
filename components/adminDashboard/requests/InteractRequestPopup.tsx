import { showAlert } from "@/components/alerts/AlertContainer";
import PetrolBtn from "@/components/dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import PopupContainer from "@/components/dashboard/PharmacyInfo/PopUpContainer";
import { acceptPharmacistApplication, deletePharmacistApplication, rejectPharmacistApplication } from "@/services/admin";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

type popUpProps = {
    id:number, popupType: "reject" | "delete" | "accept" | null, setShowPopup:Dispatch<SetStateAction<boolean>>, name:string, rejectMsg:string
}
export default function PopUp ({id, popupType, setShowPopup, name, rejectMsg}:popUpProps){
    const router = useRouter();
    const onClose = () => {
        setShowPopup(false);
    };
    const handleAccept = async () => {
            try {
                await acceptPharmacistApplication(id);
                showAlert({
                    type:"Success",
                    title:"Success",
                    message:"تم قبول الطلب بنجاح"
                });
                setShowPopup(false);
                // router.reload()
            } catch (error) {
                console.error(error);
            }
    }


    const handleReject = async (rejectMsg:string) => {
        try {
            await rejectPharmacistApplication(id, rejectMsg);
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
        }
    }
    

        const handleDelete = async () => {
            try {
                await deletePharmacistApplication(id);
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
                <div className="flex flex-col items-center justify-center mt-5 z-50">
                    <p className="text-btn font-semibold">{text()}{name}</p>
                    <div className="flex flex-row items-center gap-5 mt-5">
                        <PetrolBtn text="نعم" onClick={() => functionToCall()}/>
                        <PetrolBtn text="لا" onClick={onClose}/>
                    </div>
                </div>
            </PopupContainer>
        )
    }