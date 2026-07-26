import StatusHolder from "@/components/pharmacyDashboard/MedicineRequests/StatusHolder";
import Row from "@/components/pharmacyDashboard/PharmacyInfo/pharmacistsTable/Row";
import PaginationRounded from "@/components/Paginantion";
import { AdminPharmacyRequestContext } from "@/contexts/AdminPharmcyRequestsContext";
import { useContext, useEffect, useMemo, useState } from "react";

import Interact from "./Interact";

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

type RequestCategory = (typeof requestsCategories)[number];

const REQUESTS_PER_PAGE = 7;

export default function CreatePharmReq() {
  const {
    pharmacyRequests,
    loadingPharm,
    errorPharm,
  } = useContext(AdminPharmacyRequestContext);

  const [selectedCategory, setSelectedCategory] =
    useState<RequestCategory>(requestsCategories[0]);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredResults = useMemo(() => {
    if (selectedCategory.value === "all") {
      return pharmacyRequests;
    }

    return pharmacyRequests.filter(
      (request) => request.status === selectedCategory.value,
    );
  }, [pharmacyRequests, selectedCategory.value]);

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
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-row items-center justify-between rounded-[14px] border border-gray-200 p-2">
        {requestsCategories.map((category) => {
          const isSelected =
            selectedCategory.value === category.value;

          return (
            <button
              key={category.value}
              type="button"
              className={`cursor-pointer rounded-[10px] px-10 py-1 text-center text-inpt font-semibold text-black-400 transition-colors ${
                isSelected
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleCategoryChange(category)}
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
          filteredResults.length === 0 && (
            <p className="py-6 text-center text-gray-500">
              لا توجد طلبات
            </p>
          )}

        {!loadingPharm &&
          !errorPharm &&
          paginatedResults.map((request) => {
            const ownerName = request.owner
              ? `${request.owner.first_name} ${request.owner.last_name}`.trim()
              : request.owner_name;

            return (
              <div
                key={request.id}
                className="flex w-full items-center border-t border-gray-200 text-inpt"
              >
                <Row
                  data={{
                    pharmacyName: request.pharmacy_name,
                    pharmaciestName: request.owner_name,
                    address: request.address,
                    date: request.date,
                    phone_number: request.phone_number,
                    status: (
                      <StatusHolder status={request.status} />
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
          filteredResults.length > 0 && (
            <div className="flex w-full justify-start pt-5">
              <PaginationRounded
                count={pageCount}
                page={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
      </div>
    </div>
  );
}