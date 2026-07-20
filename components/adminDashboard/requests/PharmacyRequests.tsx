import StatusHolder from "@/components/pharmacyDashboard/MedicineRequests/StatusHolder";
import Row from "@/components/pharmacyDashboard/PharmacyInfo/pharmacistsTable/Row";
import Interact from "./Interact";
import { useContext, useState } from "react";
import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";
import { AdminPharmacyRequestContext } from "@/contexts/AdminPharmcyRequestsContext";

export default function CreatePharmReq () {
    const requestsCategory =[
        {text:"كل الطلبات", value:"all"}, 
        {text:"الطلبات المقبولة", value:"approved"}, 
        {text:"الطلبات المرفوضة", value:"rejected"}, 
        {text:"الطلبات قيد الانتظار", value:"pending"}
    ];
    const { pharmacyRequests, loadingPharm, errorPharm } = useContext(AdminPharmacyRequestContext);
    console.log(pharmacyRequests)
    const [selectedCategory, setSelectedCategory] = useState<(typeof requestsCategory[number])>(
        requestsCategory[0]
    );
    const filteredResults = pharmacyRequests.filter((request) => {
        return selectedCategory.value === "all" || request.status === selectedCategory.value;
    });
    return(
        <div>
            <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex flex-row items-center justify-between border border-gray-200 rounded-[14px] p-2">
                        {requestsCategory.map((category, index) => (
                            <p key={index} 
                            className={`text-center px-10 p-1 text-inpt font-semibold text-black-400 cursor-pointer ${selectedCategory.value === category.value ? "bg-blue-100 rounded-[10px]" : ""}`} 
                            onClick={() => setSelectedCategory(category)}>{category.text}</p>    
                        ))}
                    </div>
                    <div className="flex w-full flex-col px-10">
                        <div className="text-black-500 text-inpt">
                            <Row
                                isFirst={true} 
                                data={{
                                    pharmacyName: "اسم الصيدلية", 
                                    pharmaciestName: "اسم الصيدلي", 
                                    address: "العنوان", 
                                    date: "تاريخ الطلب", 
                                    phoneNumber: "رقم الهاتف", 
                                    status: "الحالة", 
                                    interact: "التفاعل"
                                }} 
                                columnClassNames={{
                                    pharmacyName: "flex-1",
                                    pharmaciestName: "flex-1",
                                    address:"flex-2",
                                    date: "flex-1",
                                    phoneNumber: "flex-1",
                                    status: "flex-1",
                                    interact: "flex-1",
                                }}/>
                        </div>
                        {loadingPharm && <p className="py-6 text-center">جاري التحميل...</p>}

                        {errorPharm && <p className="py-6 text-center text-red-500">{errorPharm}</p>}

                        {!loadingPharm && !errorPharm && filteredResults.length === 0 && (
                            <p className="py-6 text-center text-gray-500">لا توجد طلبات</p>
                        )}
                        {filteredResults.map((req) => (
                            <div key={req.id} className="flex border-t border-gray-200 w-full items-center text-inpt">
                                <Row 
                                    data={
                                        {
                                            pharmacyName: req.pharmacy_name,
                                            pharmaciestName: req.owner?.first_name + " " + req.owner?.last_name,
                                            address:req.address,
                                            date: req.date,
                                            phone_number: req.phone_number,
                                            status: <StatusHolder status={req.status} />,
                                            interact: <Interact status={req.status} id={req.id} name={req.owner?.first_name + " " + req.owner?.last_name} type="pharmacy"/>
                                        }}
                                    columnClassNames={{
                                        pharmacyName:"flex-1",
                                        pharmaciestName: "flex-1",
                                        address: "flex-2",
                                        date: "flex-1",
                                        phone_number: "flex-1",
                                        status: "flex-1",
                                        interact: "flex-1",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    )
}