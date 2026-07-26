import StatusHolder from "@/components/pharmacyDashboard/MedicineRequests/StatusHolder";
import Row from "@/components/pharmacyDashboard/PharmacyInfo/pharmacistsTable/Row";
import Interact from "./Interact";
import { useContext, useEffect, useMemo, useState } from "react";
import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";
import PaginationRounded from "@/components/Paginantion";

export default function PharmacistsRequests () {
    const requestsCategories =[
        {text:"كل الطلبات", value:"all"}, 
        {text:"الطلبات المقبولة", value:"active"}, 
        {text:"الطلبات المرفوضة", value:"rejected"}, 
        {text:"الطلبات قيد الانتظار", value:"pending"}
    ];
    type RequestCategory = (typeof requestsCategories)[number];

    const REQUESTS_PER_PAGE = 7;
    const { requests, loading, error } = useContext(AdminRequestContext);
    const [selectedCategory, setSelectedCategory] = useState<(typeof requestsCategories[number])>(
        requestsCategories[0]
    );
    const [currentPage, setCurrentPage] = useState(1);
    const filteredResults = requests.filter((request) => {
        return selectedCategory.value === "all" || request.status === selectedCategory.value;
    });

    const pageCount = Math.max(
        1,
        Math.ceil(filteredResults.length / REQUESTS_PER_PAGE),
    );

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * REQUESTS_PER_PAGE;
    const endIndex = startIndex + REQUESTS_PER_PAGE;

    return filteredResults.slice(startIndex, endIndex);
  }, [filteredResults, currentPage]);

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
  }, [currentPage, pageCount]);

  const handleCategoryChange = (category: RequestCategory): void => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }
    return(
        <div className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-row items-center justify-between border border-gray-200 rounded-[14px] p-2">
                        {requestsCategories.map((category, index) => (
                            <p key={index} className={`text-center px-10 p-1 text-inpt font-semibold text-black-400 cursor-pointer ${selectedCategory.value === category.value ? "bg-blue-100 rounded-[10px]" : ""}`} onClick={() => handleCategoryChange(category)}>{category.text}</p>    
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
                        {paginatedResults.map((req) => (
                            <div key={req.id} className="flex border-t border-gray-200 w-full items-center text-inpt">
                                <Row 
                                    data={
                                        {
                                            customerName: req.name,
                                            email: req.email,
                                            date: req.date,
                                            phone_number: req.phone_number,
                                            status: <StatusHolder status={req.status} />,
                                            interact: <Interact status={req.status} id={req.id} name={req.name} type="pharmacist"/>
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
                        <div className="w-full flex items-start">
                            {!loading && !error && filteredResults.length > 0 && (
                                <PaginationRounded
                                    count={pageCount}
                                    page={currentPage}
                                    onChange={setCurrentPage}
                                />
                            )}
                        </div>
                        
                    </div>
            
        </div>
    )
}