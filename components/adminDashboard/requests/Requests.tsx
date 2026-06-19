import StatusHolder from "@/components/dashboard/MedicineRequests/StatusHolder";
import Card from "@/components/dashboard/PharmacyInfo/CardContainer";
import Row from "@/components/dashboard/PharmacyInfo/pharmacistsTable/Row";
import { useContext, useEffect, useState } from "react";
import Interact from "./Interact";
import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";
import { useRouter } from "next/router";
export default function Requests() {
    const { requests, loading, error } = useContext(AdminRequestContext);

    const requestsCategory =[
        {text:"كل الطلبات", value:"all"}, 
        {text:"الطلبات المقبولة", value:"active"}, 
        {text:"الطلبات المرفوضة", value:"rejected"}, 
        {text:"طلبات الانضمام كصيدلي", value:"all"}, 
        {text:"طلبات انشاء صيدلية", value:"pharmacy"}, 
        {text:"الطلبات قيد الانتظار", value:"pending"}
    ];

    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState<(typeof requestsCategory[number])>(
        requestsCategory[0]
    );
    const filteredResults = requests.filter((request) => {
        return selectedCategory.value === "all" || request.status === selectedCategory.value;
    });
    const handleSeeDetails = (id:number) => {
        router.push(`/admin-dashboard/requests/${id}`);
        console.log(`See details of request with id: ${id}`);
    }
    return(
        <div className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <p className="font-semibold text-27px">إدارة الدعوات</p>
            <Card title="طلبات الانضمام كصيدلي" scrollable>
                <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex flex-row items-center justify-between border border-gray-200 rounded-[14px] p-2">
                        {requestsCategory.map((category, index) => (
                            <p key={index} className={`text-center px-10 p-1 text-inpt font-semibold text-black-400 cursor-pointer ${selectedCategory.value === category.value ? "bg-blue-100 rounded-[10px]" : ""}`} onClick={() => setSelectedCategory(category)}>{category.text}</p>    
                        ))}
                    </div>
                    <div className="flex w-full flex-col px-10">
                        <div className="text-black-500 text-inpt">
                            <Row 
                                isFirst={true} 
                                data={{
                                    customerName: "اسم العميل", 
                                    email: "البريد الإلكتروني", 
                                    date: "تاريخ الطلب", 
                                    phoneNumber: "رقم الهاتف", 
                                    status: "الحالة", 
                                    interact: "التفاعل"
                                }} 
                                columnClassNames={{
                                    email: "flex-[2]",
                                    customerName: "flex-1",
                                    date: "flex-1",
                                    phoneNumber: "flex-1",
                                    status: "flex-1",
                                    interact: "flex-1",
                                }}/>
                        </div>
                        {loading && <p className="py-6 text-center">جاري التحميل...</p>}

                        {error && <p className="py-6 text-center text-red-500">{error}</p>}

                        {!loading && !error && filteredResults.length === 0 && (
                            <p className="py-6 text-center text-gray-500">لا توجد طلبات</p>
                        )}
                        {filteredResults.map((req) => (
                            <div key={req.id} className="flex border-t border-gray-200 w-full items-center text-inpt">
                                <Row 
                                    data={
                                        {
                                            customerName: req.name,
                                            email: req.email,
                                            date: req.date,
                                            phone_number: req.phone_number,
                                            status: <StatusHolder status={req.status} />,
                                            interact: <Interact status={req.status} id={req.id} name={req.name}/>
                                        }}
                                    columnClassNames={{
                                        email: "flex-[2]",
                                        customerName: "flex-1",
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
            </Card>
        </div>
    )
}