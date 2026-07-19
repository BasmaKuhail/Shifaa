import Btn from "./Btn";
import invite from "@/public/icons/phcyInfo/invite.svg";
import edit from "@/public/icons/phcyInfo/edit.svg";
import Table from "./pharmacistsTable/Table";
import InvitePopup from "./invitePopup/InvitePopup";
import { useContext, useState } from "react";
import EditPopup from "./EditPopup/EditPopup";
import Card from "./CardContainer";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";
type PharmacistsSecProps = {
    pharmacyName: string;
}


export default function PharmacistsSec({  }: PharmacistsSecProps) {
    

    const [showInvitePopup, setShowInvitePopup] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    return (
        <Card title={"الصيادلة العاملون في الصيدلية " } actions={
            <div className="flex flex-row items-center gap-5">
                <Btn text="دعوة صيدلي" icon={invite} onClick={() => {setShowInvitePopup(true)}} />
                {/* <Btn text="تعديل" icon={edit} onClick={() => {setOnEdit(Prev => !Prev)}} /> */}
            </div>
            }
            scrollable
        >
            <div className="w-full flex flex-col">
                <Table onEdit={onEdit} /> 
            </div>
            {showInvitePopup && <InvitePopup  onClose={() => setShowInvitePopup(false)}/>}
        </Card>
    );
}
