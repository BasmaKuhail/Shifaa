import { useState } from "react";
import Card from "../PharmacyInfo/CardContainer";
import PhoneNum from "@/components/home/contactForm/PhoneNumInput";
import Row from "../PharmacyInfo/pharmacistsTable/Row";
import { style } from "framer-motion/client";

const requestsCategory =[
    {text:"كل الطلبات", value:"all"}, 
    {text:"الطلبات المقبولة", value:"accepted"}, 
    {text:"الطلبات الملغاة", value:"ignored"}, 
    {text:"الطلبات الغير مقروءة", value:"unread"}, 
    {text:"الطلبات قيد التنفيذ", value:"pending"}
]

const medicineReqData = [
    {id:1, customerName:"محمد أحمد", medicineName:"باراسيتامول", PhoneNum:"+123456789", date:"10-01-2023", quantity:2, status:"pending"},
    {id:2, customerName:"سارة علي", medicineName:"أيبوبروفين", PhoneNum:"+987654321", date:"12-01-2023", quantity:1, status:"accepted"},
    {id:3, customerName:"علي حسن", medicineName:"أموكسيسيلين", PhoneNum:"+555555555", date:"15-01-2023", quantity:3, status:"rejected"},
    {id:4, customerName:"فاطمة محمد", medicineName:"سيبروفلوكساسين", PhoneNum:"+444444444", date:"20-01-2023", quantity:1, status:"unread"},
    {id:5, customerName:"خالد عبد الله", medicineName:"ميترونيدازول", PhoneNum:"+333333333", date:"25-01-2023", quantity:2, status:"accepted"},
]

const StatusHolder = ({status}:{status:string}) => {
    const statusStyles: Record<string, string> = {
        accepted: "bg-accepted",
        pending: "bg-pending",
        rejected: "bg-rejected",
    };
    return(
        <div 
            className={`flex w-fit items-center justify-center  px-5 texy-inpt rounded-[14px] gap-2 ${
                statusStyles[status] || "bg-gray-100"
            }`}
        >
            <p className="">{status}</p>
        </div>
    )
}

export default function MedicineReq(){
    const [selectedCategory, setSelectedCategory] = useState(requestsCategory[0]);
    const filterResults = medicineReqData.filter(req => {
        if(selectedCategory.value === "all") return true;
        if(selectedCategory.value === "accepted") return req.status === "accepted";
        if(selectedCategory.value === "ignored") return req.status === "rejected";
        if(selectedCategory.value === "unread") return req.status === "unread";
        if(selectedCategory.value === "pending") return req.status === "pending";
    })
    return(
        <div className="flex flex-col gap-10 mt-13 mb-40">
            <p className="font-semibold text-27px">طلبات الدواء</p>
            <Card title="طلبات الأدوية">
                <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex flex-row items-center justify-between border border-gray-200 rounded-[14px] p-2">
                        {requestsCategory.map((category, index) => (
                            <p key={index} className={`px-10 p-2 text-inpt font-semibold text-black-400 cursor-pointer ${selectedCategory === category ? "bg-blue-100" : ""}`} onClick={() => setSelectedCategory(category)}>{category.text}</p>    
                        ))}
                    </div>
                    <div className="flex w-full flex-col px-10">
                        <div className="text-black-500 text-inpt">
                            <Row data={{customerName: "اسم العميل", medicineName: "اسم الدواء", PhoneNum: "رقم التواصل", date: "تاريخ الطلب", quantity: "الكمية", status: "الحالة"}} />

                        </div>
                        {filterResults.map((req) => (
                            <div className="flex border-t border-gray-200 w-full items-center text-inpt">
                            <Row 
                                key={req.id} 
                                data={
                                    {
                                        customerName: req.customerName, 
                                        medicineName: req.medicineName, 
                                        PhoneNum: req.PhoneNum, 
                                        date: req.date, 
                                        quantity: req.quantity, 
                                        status: <StatusHolder status={req.status} />
                                    }} 
                            /></div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    )
}