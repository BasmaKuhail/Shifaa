import { useContext } from "react";

import StatusHolder from "@/components/pharmacyDashboard/MedicineRequests/StatusHolder";
import Row from "@/components/pharmacyDashboard/PharmacyInfo/pharmacistsTable/Row";
import PaginationRounded from "@/components/Paginantion";

import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";

import Interact from "./Interact";

const requestsCategories = [
  {
    text: "كل الطلبات",
    value: "all",
  },
  {
    text: "الطلبات المقبولة",
    value: "active",
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

export default function PharmacistsRequests() {
  const {
    requests,
    loading,
    error,
    pagination,
    currentPage,
    setCurrentPage,
    statusFilter,
    setStatusFilter,
  } = useContext(AdminRequestContext);

  return (
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
              customerName: "اسم العميل",
              email: "البريد الإلكتروني",
              date: "تاريخ الطلب",
              phone_number: "رقم الهاتف",
              status: "الحالة",
              interact: "التفاعل",
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

        {loading && (
          <p className="py-6 text-center">
            جاري التحميل...
          </p>
        )}

        {!loading && error && (
          <p className="py-6 text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && requests.length === 0 && (
          <p className="py-6 text-center text-gray-500">
            لا توجد طلبات
          </p>
        )}

        {!loading &&
          !error &&
          requests.map((request) => (
            <div
              key={request.id}
              className="text-inpt flex w-full items-center border-t border-gray-200"
            >
              <Row
                data={{
                  customerName: request.name,
                  email: request.email,
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
                      name={request.name}
                      type="pharmacist"
                    />
                  ),
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

        {!loading &&
          !error &&
          pagination &&
          pagination.lastPage > 1 && (
            <div className="flex w-full items-start pt-5">
              <PaginationRounded
                count={pagination.lastPage}
                page={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
      </div>
    </div>
  );
}