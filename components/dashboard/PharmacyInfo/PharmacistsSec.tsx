import Btn from "./Btn";
import invite from "@/public/icons/phcyInfo/invite.svg";
import edit from "@/public/icons/phcyInfo/edit.svg";
import Table from "./pharmacistsTable/Table";
import InvitePopup from "./invitePopup/InvitePopup";
import { useState } from "react";
import EditPopup from "./EditPopup/EditPopup";
import Card from "./CardContainer";
type PharmacistsSecProps = {
    pharmacyName: string;
}

const pharmacistsArr = [
    {
        name: "محمد أحمد",
        contactNum: "0123456789",
        email: "mohamed.ahmed@example.com",
        address: "123 شارع التحرير"
    },
    {
        name: "فاطمة علي",
        contactNum: "9876543210",
        email: "fatma.ali@example.com",
        address: "456 شارع الهرم"
    }
];

export default function PharmacistsSec({ pharmacyName }: PharmacistsSecProps) {
    const [showInvitePopup, setShowInvitePopup] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    return (
        <Card title={"الصيادلة العاملون في صيدلية " + pharmacyName} actions={
            <div className="flex flex-row items-center gap-5">
                <Btn text="دعوة صيدلي" icon={invite} onClick={() => {setShowInvitePopup(true)}} />
                <Btn text="تعديل" icon={edit} onClick={() => {setOnEdit(Prev => !Prev)}} />
            </div>
            }
        >
            <div className="w-full flex flex-col overflow-x-auto">
                <Table pharmacistsArr={pharmacistsArr} onEdit={onEdit} />
            </div>
            {showInvitePopup && <InvitePopup  onClose={() => setShowInvitePopup(false)}/>}
        </Card>
    );
}
