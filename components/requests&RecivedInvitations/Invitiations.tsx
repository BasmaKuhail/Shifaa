import { ReactNode, useEffect, useState } from "react"
import Row from "../pharmacyDashboard/PharmacyInfo/pharmacistsTable/Row"
import { getReceivedInvitations, Invitation } from "@/services/invitiations";
import StatusHolder from "../pharmacyDashboard/MedicineRequests/StatusHolder";
import PetrolBtn from "../pharmacyDashboard/PharmacyInfo/invitePopup/PetrolBtn";
import { formatInvitationDate } from "@/config/date";
import { useRouter } from "next/router";
import Interact from "./PharmacistInteract";

export default function Invitations(){

    const [invitaions, setIvitations]= useState<Invitation[]>([])
    const [errorMsg, setErrorMsg] = useState();
    const [loading,setLoading] = useState(false);

    const [showDetails, setShowDetails] = useState(false);
    const router = useRouter()
    useEffect(()=>{
        const fetchInvitations = async() => {
            setLoading(true);

            try{
                const data = await getReceivedInvitations();
                setIvitations(data);
                console.log(invitaions)
            }catch(error:any){
                setErrorMsg(error);
            }finally{
                setLoading(false);

            }
        }
        fetchInvitations()
    },[])
    const RowContainer = ({children}:{children:ReactNode}) => {
        return(
            <div className="w-full flex flex-col gap-5 border border-black-200 rounded-[10px] p-5">
                {children}
            </div>
        )
    }
    return(
        <div className="flex flex-col gap-10 items-center pb-5">
            {loading && <p>جاري تحميل الدعوات</p>}
            {!loading && errorMsg && <p>{errorMsg}</p>}
            {!loading && !errorMsg && invitaions.length === 0 && <p>لم يتم دعوتك لأي صيدلية</p>}
            {invitaions && invitaions.length !== 0 && 
            invitaions.map((invitation) => 
            <RowContainer>
                <p className="font-[500] text-btn">دعوة انضمام لصيدلية</p>
                <div className="flex flex-row gap-5 w-full">
                    <Row 
                        data={{
                            pharmName: `صيدلية: ${invitation.pharmacy.name}`, 
                            date: formatInvitationDate(invitation.created_at),  
                            status: <StatusHolder status={invitation.status}/>, 
                            interact:<div className="flex flex-row w-full gap-5">التفاعل:
                                 <Interact status={invitation.status} id={invitation.id} name={invitation.pharmacy.name} setShowDetails={setShowDetails}/>
                                 </div>
                        }} 
                        columnClassNames={{
                            pharmName: "flex-1 text-inpt",
                            date:"flex-1 text-inpt",
                            status: "flex-1 text-inpt",
                            interact: "flex-1 text-inpt",
                        }}
                    />
                    <div className="flex flex-row items-center justify-center w-[20%] p-1">
                        <button
                            className="
                                w-full bg-blue-1000 rounded-[12px] 
                                text-white flex text-inpt font-[500] 
                        
                                p-1 md:p-2 
                                flex items-center justify-center
                                hover:bg-blue-1100 transition-colors duration-300 cursor-pointer" 
                            onClick={() => router.push(`pharmacies/pharmacy-details/${invitation.pharmacy_id}`)}
                        >
                            عرض الصيدلية
                        </button>
                    </div>

                </div>
                            
                {showDetails && (
                    <RowContainer>
                        <div
                            dir="rtl"
                            className="grid w-full gap-4 rounded-lg sm:grid-cols-[140px_1fr] font-sm  text-black-700"
                        >
                        {invitation.message && <><p className="">رسالة الدعوة</p>
                        <p className="break-words ">
                            {invitation.message?.trim() || "-"}
                        </p></>}

                        <p>موقع الصيدلية</p>
                        <p className="break-words">
                            {invitation.pharmacy.address?.trim() || "-"}
                        </p>

                        <p >معلومات التواصل</p>
                        <p dir="ltr" className="text-right">
                            {invitation.pharmacy.phone?.trim() || "-"}
                        </p>
                        </div>
                    </RowContainer>
                )}       
            </RowContainer>)}
        </div>
    )
}