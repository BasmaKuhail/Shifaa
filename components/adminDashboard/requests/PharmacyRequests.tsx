import StatusHolder from "@/components/pharmacyDashboard/MedicineRequests/StatusHolder";
import Row from "@/components/pharmacyDashboard/PharmacyInfo/pharmacistsTable/Row";
import PaginationRounded from "@/components/Paginantion";
import { AdminPharmacyRequestContext } from "@/contexts/AdminPharmcyRequestsContext";
import { useContext } from "react";

import Interact from "./Interact";
import Card from "@/components/pharmacyDashboard/PharmacyInfo/CardContainer";

const requestsCategories = [
  {
    text: "كل الطلبات",
    value: "all",
  },
  {
    text: "الطلبات المقبولة",
    value: "approved",
  },
  {
    text: "الطلبات المرفوضة",
    value: "rejected",
  },
  {
    text: "الطلبات قيد الانتظار",
    value: "pending",
  },
] as const;

export default function CreatePharmReq() {
  const {
    pharmacyRequests,
    loadingPharm,
    errorPharm,
    pagination,
    currentPage,
    setCurrentPage,
    statusFilter,
    setStatusFilter,
  } = useContext(AdminPharmacyRequestContext);

  return (
    <div className="mt-13 mb-40 flex w-full flex-col gap-10">
      <p className="text-27px font-semibold">
        إدارة طلبات الصيدلية
      </p>

      <Card title="طلبات انشاء صيدلية" scrollable>
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-row items-center justify-between rounded-[14px] border border-gray-200 p-2">
            {requestsCategories.map((category) => {
              const isSelected =
                statusFilter === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  className={`text-inpt cursor-pointer rounded-[10px] px-10 py-1 text-center font-semibold text-black-400 transition-colors ${
                    isSelected
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setStatusFilter(category.value)
                  }
                >
                  {category.text}
                </button>
              );
            })}
          </div>

          <div className="flex w-full flex-col px-10">
            <div className="text-inpt text-black-500">
              <Row
                isFirst
                data={{
                  pharmacyName: "اسم الصيدلية",
                  pharmaciestName: "اسم الصيدلي",
                  address: "العنوان",
                  date: "تاريخ الطلب",
                  phone_number: "رقم الهاتف",
                  status: "الحالة",
                  interact: "التفاعل",
                }}
                columnClassNames={{
                  pharmacyName: "flex-1",
                  pharmaciestName: "flex-1",
                  address: "flex-[2]",
                  date: "flex-1",
                  phone_number: "flex-1",
                  status: "flex-1",
                  interact: "flex-1",
                }}
              />
            </div>

            {loadingPharm && (
              <p className="py-6 text-center">
                جاري التحميل...
              </p>
            )}

            {!loadingPharm && errorPharm && (
              <p className="py-6 text-center text-red-500">
                {errorPharm}
              </p>
            )}

            {!loadingPharm &&
              !errorPharm &&
              pharmacyRequests.length === 0 && (
                <p className="py-6 text-center text-gray-500">
                  لا توجد طلبات
                </p>
              )}

            {!loadingPharm &&
              !errorPharm &&
              pharmacyRequests.map((request) => {
                const ownerName = request.owner
                  ? `${request.owner.first_name} ${request.owner.last_name}`.trim()
                  : request.owner_name;

                return (
                  <div
                    key={request.id}
                    className="text-inpt flex w-full items-center border-t border-gray-200"
                  >
                    <Row
                      data={{
                        pharmacyName: request.pharmacy_name,
                        pharmaciestName: ownerName,
                        address: request.address,
                        date: request.date,
                        phone_number: request.phone_number,
                        status: (
                          <StatusHolder
                            status={request.status}
                          />
                        ),
                        interact: (
                          <Interact
                            status={request.status}
                            id={request.id}
                            name={ownerName}
                            type="pharmacy"
                          />
                        ),
                      }}
                      columnClassNames={{
                        pharmacyName: "flex-1",
                        pharmaciestName: "flex-1",
                        address: "flex-[2]",
                        date: "flex-1",
                        phone_number: "flex-1",
                        status: "flex-1",
                        interact: "flex-1",
                      }}
                    />
                  </div>
                );
              })}

            {!loadingPharm &&
              !errorPharm &&
              pagination &&
              pagination.lastPage > 1 && (
                <div className="flex w-full justify-start pt-5">
                  <PaginationRounded
                    count={pagination.lastPage}
                    page={currentPage}
                    onChange={setCurrentPage}
                  />
                </div>
              )}
          </div>
        </div>
      </Card>
    </div>
  );
}