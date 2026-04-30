import Image from "next/image";
import PopupContainer from "../PopUpContainer";
import edit from "@/public/icons/phcyInfo/edit.svg";
import Btn from "../Btn";

import deleteIcon from "@/public/icons/editProfile/delete.svg"
import editUsers from "@/public/icons/editProfile/editUsers.svg"
import Table from "../pharmacistsTable/Table";

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
export default function EditPopup ({ onClose, pharmacyName }: { onClose: () => void, pharmacyName:string}){
    return(
        <PopupContainer onClose={onClose}>
            <div className="flex flex-col w-full gap-5">
                <div className="w-full flex flex-row items-center justify-between gap-2">
                    <div className="flex flex-row items-center gap-3">
                        <Image src={edit} alt="" />
                        <p className="text-24px font-bold flex flex-row items-center gap-2">
                        تعديل الصيادلة العاملون في صيدلية 
                            <p className="underline">{pharmacyName}</p>
                        </p>
                    </div>
                    
                    <div className="flex flex-row items-center gap-3 ">
                        <Btn text="حذف" icon={deleteIcon} onClick={() => {}}/>
                        <Btn text="تعديل" icon={editUsers} onClick={() => {}}/>
                    </div>
                </div>
                <Table pharmacistsArr={pharmacistsArr} onEdit={true}/>
            </div>
        </PopupContainer>
    )
}