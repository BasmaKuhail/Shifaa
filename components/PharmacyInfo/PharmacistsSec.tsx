import Btn from "./Btn";
import invite from "@/public/icons/phcyInfo/invite.svg";
import edit from "@/public/icons/phcyInfo/edit.svg";
import Table from "./pharmacistsTable/Table";
import InvitePopup from "./invitePopup/InvitePopup";
import { useState } from "react";
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
    return (
        <div dir="rtl" className="bg-white rounded-[24px] border border-black-200 flex flex-col items-start justify-start gap-5 w-full p-5 px-10">
            <div className="w-full flex flex-row items-center justify-between">
                <p className="text-24px font-bold flex flex-row items-center gap-2">
                    الصيادلة العاملون في صيدلية 
                    <p className="underline">{pharmacyName}</p>
                </p>
                <div className="flex flex-row items-center gap-5">
                    <Btn text="دعوة صيدلي" icon={invite} onClick={() => {setShowInvitePopup(true)}} />
                    <Btn text="تعديل" icon={edit} onClick={() => {}} />
                </div>
            </div>
            <div className="w-full flex flex-col ">
                <Table pharmacistsArr={pharmacistsArr} />
            </div>
            {showInvitePopup && <InvitePopup  onClose={() => setShowInvitePopup(false)}/>}
        </div>
    );
}
