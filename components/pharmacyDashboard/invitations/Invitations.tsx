import Image from "next/image";
import Card from "../PharmacyInfo/CardContainer";
import search from "@/public/icons/search.svg"
import Row from "../PharmacyInfo/pharmacistsTable/Row";
import StatusHolder from "../MedicineRequests/StatusHolder";
import Sent from "@/public/icons/invitations/sent";
import Resend from "@/public/icons/invitations/resend";
import { InvitationData, viewSentInvitations } from "@/services/pharmacy";
import { useContext, useEffect, useState } from "react";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";
import { formatInvitationDate } from "@/config/date";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";

export default function Invitations() {
    const { pharmacy, loading: isPharmacyLoading } =
    useContext(PharmacyContext);

    const {user, loading:userLoading} = useContext(UserContext)
    const [invitations, setInvitations] = useState<InvitationData[]>([]);
    const [isLoadingInvitations, setIsLoadingInvitations] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter()
    useEffect(() => {
        if (!pharmacy?.id) {
            setInvitations([]);
            return;
        }

        let isCancelled = false;

        const fetchInvitations = async () => {
            setIsLoadingInvitations(true);
            setErrorMessage("");

            try {
                const data = await viewSentInvitations(pharmacy.id);

                if (!isCancelled) {
                    setInvitations(data);
                }
                console.log(invitations)
            } catch (error) {
                console.error("Failed to fetch sent invitations:", error);

                if (!isCancelled) {
                    setInvitations([]);
                    setErrorMessage("تعذر تحميل الدعوات المرسلة");
                }
            } finally {
                if (!isCancelled) {
                    setIsLoadingInvitations(false);
                }
            }
        };

        void fetchInvitations();

        return () => {
            isCancelled = true;
        };
    }, [pharmacy?.id]);

    if(!userLoading && user?.pharmacy_role === "staff"){
        router.push("/403")
    }
    return(
        <div className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <p className="font-semibold text-27px">إدارة الدعوات</p>
            <Card title="الدعوات المرسلة والحالات" scrollable >
                <div className="flex w-full flex-col px-10">
                    <div className="text-black-500 text-inpt">
                        <Row 
                            data={{pharmacistName: "اسم الصيدلي", phone: "رقم التواصل", email: "البريد الإلكتروني", date:"وقت الارسال", status: "حالة الدعوة"}} 
                            columnClassNames={{
                                pharmacistName: "flex-1",
                                phone: "flex-1",
                                email: "flex-[2]",
                                date:"flex-1",
                                status: "flex-[2]",
                                
                                // resendStatus: "flex-1"
                            }}
                        />
                    </div>
                    {(isPharmacyLoading || isLoadingInvitations) && <p className="py-6 text-center text-black-500">جاري تحميل الدعوات المرسلة...</p>}

                    {errorMessage &&  <p className="py-6 text-center text-red-500">{errorMessage}</p>}

                    {!(isPharmacyLoading || isLoadingInvitations) && invitations.length === 0 && <p className="py-6 text-center text-black-500">لا توجد دعوات مرسلة</p>}
                    
                    {invitations.map((invitation) => (
                        <div key={invitation.id}  className="flex border-t border-gray-200 w-full items-center text-inpt">
                            <Row 
                                data={{
                                    pharmacistName:
                                    invitation.pharmacist.user.name,
                                    phone:
                                    invitation.pharmacist.phone_number || "—",
                                    email:
                                    invitation.pharmacist.user.email,
                                    date: formatInvitationDate(
                                        invitation.created_at,
                                        ),
                                    status: (
                                    <StatusHolder status={invitation.status} />
                                    )
                                }}
                                columnClassNames={{
                                    pharmacistName: "flex-1",
                                    phone: "flex-1",
                                    email: "flex-[2]",
                                    date:"flex-1",
                                    status: "flex-[2]",
                                    // resendStatus: "flex-1"
                                }}
                            />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}