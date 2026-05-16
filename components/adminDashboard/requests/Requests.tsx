import StatusHolder from "@/components/dashboard/MedicineRequests/StatusHolder";
import Card from "@/components/dashboard/PharmacyInfo/CardContainer";
import Row from "@/components/dashboard/PharmacyInfo/pharmacistsTable/Row";
import { useEffect, useState } from "react";
import {pharmacistApplications} from "@/services/admin";
export default function Requests() {
    const [requests, setRequests] = useState<{ id: number; name: string; email: string; date: string; licenseNumber: string; status: string; }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(()=>{
        pharmacistApplications().then(res => {
            setRequests(res);
            console.log(res);
        }).catch(err => {
            setError(err.message || "حدث خطأ غير متوقع");
            console.error(err);
        }).finally(() => setLoading(false));
    }, []);

    const requestsCategory =[
        {text:"كل الطلبات", value:"all"}, 
        {text:"الطلبات المقبولة", value:"accepted"}, 
        {text:"الطلبات الملغاة", value:"ignored"}, 
        {text:"الطلبات الغير مقروءة", value:"unread"}, 
        {text:"الطلبات قيد التنفيذ", value:"pending"}
    ];


    const [selectedCategory, setSelectedCategory] = useState<(typeof requestsCategory[number])>(requestsCategory[0]);
    const filteredResults = requests.filter((request) => {
        return selectedCategory.value === "all" || request.status === selectedCategory.value;
    });
    return(
        <div className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <p className="font-semibold text-27px">إدارة الدعوات</p>
            <Card title="طلبات الانضمام كصيدلي">
                <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex flex-row items-center justify-between border border-gray-200 rounded-[14px] p-2">
                        {requestsCategory.map((category, index) => (
                            <p key={index} className={`px-10 p-2 text-inpt font-semibold text-black-400 cursor-pointer ${selectedCategory.value === category.value ? "bg-blue-100" : ""}`} onClick={() => setSelectedCategory(category)}>{category.text}</p>    
                        ))}
                    </div>
                    <div className="flex w-full flex-col px-10">
                        <div className="text-black-500 text-inpt">
                            <Row data={{customerName: "اسم العميل", PhoneNum: "رقم التواصل", date: "تاريخ الطلب", brief: "رقم الرخصة", status: "الحالة"}} />
                        </div>
                        {loading && <p className="py-6 text-center">جاري التحميل...</p>}

                        {error && <p className="py-6 text-center text-red-500">{error}</p>}

                        {!loading && !error && filteredResults.length === 0 && (
                            <p className="py-6 text-center text-gray-500">لا توجد طلبات</p>
                        )}
                        {filteredResults.map((req) => (
                            <div className="flex border-t border-gray-200 w-full items-center text-inpt">
                                <Row 
                                    key={req.id} 
                                    data={
                                        {
                                            customerName: req.name,
                                            email: req.email,
                                            date: req.date,
                                            licenseNumber: req.licenseNumber,
                                            status: <StatusHolder status={req.status} />
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