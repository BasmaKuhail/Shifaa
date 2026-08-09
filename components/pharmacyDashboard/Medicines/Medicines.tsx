import { useRouter } from "next/router";
import Card from "../PharmacyInfo/CardContainer";
import PetrolBtn from "../PharmacyInfo/invitePopup/PetrolBtn";
import { useContext, useEffect, useRef, useState } from "react";
import Row from "../PharmacyInfo/pharmacistsTable/Row";
import add from "@/public/icons/medicine/add.svg"
import search from "@/public/icons/medicine/search.svg"
import Image from "next/image";
import InteractMed from "./interactMed";

import { editMedicine, getPharmacyMedicines, Medicine, MedicinesPaginationMeta } from "@/services/medication";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";
import PaginationRounded from "@/components/Paginantion";
import ExportMedicinesButton from "./ExportMedicinesButton";
import StatusHolder from "../MedicineRequests/StatusHolder";
import MedAvailability from "./MedAvailabilityStatus";
import { showAlert } from "@/components/alerts/AlertContainer";

export default function Medicines() {
    const MEDICINES_PER_PAGE = 9;
    const SEARCH_DEBOUNCE_MS = 500;


    const router = useRouter();
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loadingMed, setLoadingMed] = useState(false);
    const [errorMed, setErrorMed] = useState<string>("");

    const [pagination, setPagination] = useState<MedicinesPaginationMeta | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const { pharmacy, loading } = useContext(PharmacyContext);

    const latestRequestIdRef = useRef(0);
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDebouncedSearch(searchInput.trim());
            setCurrentPage(1);
        }, SEARCH_DEBOUNCE_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [searchInput]);

    useEffect(() => {
        const fetchMedicines = async () => {
            setLoadingMed(true);
            if(!loading && pharmacy) {
                const requestId = ++latestRequestIdRef.current;
                try {
                    const response = await getPharmacyMedicines(pharmacy.id, {
                        page: currentPage,
                        perPage: MEDICINES_PER_PAGE,
                        search: debouncedSearch,
                    });
                    if (requestId !== latestRequestIdRef.current) {
                        return;
                    }
                    setMedicines(response.data);
                    setPagination(response.meta);
                    console.log("Medicines:", response.data);

                } catch (error: any) {
                    if (requestId !== latestRequestIdRef.current) {
                        return;
                    }
                    setMedicines([]);
                    setPagination(null);
                    setErrorMed(error|| "تعذر تحميل الأدوية");
                } finally {
                    if (requestId === latestRequestIdRef.current) {
                        setLoadingMed(false);
                    }
                }
            }
        }
        fetchMedicines();
    }, [currentPage, debouncedSearch, pharmacy, loading]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleAvailabilityChange = async (
  medicineId: number,
  isAvailable: boolean,
) => {
  if (!pharmacy?.id) {
    return;
  }

  try {
    await editMedicine({
      pharmacyId: pharmacy.id,
      medicineId,
      medicine: {
        is_available: isAvailable,
      },
    });

    setMedicines((previousMedicines) =>
      previousMedicines.map((medicine) =>
        medicine.id === medicineId
          ? {
              ...medicine,
              is_available: isAvailable,
            }
          : medicine,
      ),
    );

    showAlert({
      type: "Success",
      title: "نجاح",
      message: "تم تحديث حالة توفر الدواء",
    });
  } catch (error) {
    console.error(
      "Failed to update medicine availability:",
      error,
    );

    showAlert({
      type: "Error",
      title: "خطأ",
      message: "تعذر تحديث حالة توفر الدواء",
    });
  }
};
    return(
        <div className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <p className="font-semibold text-27px">إدارة أدوية الصيدلية</p>
            <Card 
                title="أدوية الصيدلية"
                scrollable
                actions={
                    <div className="flex flex-row justify-between items-center gap-5">
                        <PetrolBtn
                            text="إضافة دواء"
                            icon={add}
                            onClick={() => router.push("/pharmacy-dashboard/add-medicine")}
                        />
                        <ExportMedicinesButton
                            pharmacyId={pharmacy?.id}
                            pharmacyName={pharmacy?.name}
                            medicines={medicines}
                            search={debouncedSearch}
                            isLoading={loadingMed}
                        />
                        <div className="relative flex flex-row items-center gap-2">
                            <Image src={search} alt="search" className="absolute mr-2 z-10 cursor-pointer"/>
                            <input
                                value={searchInput}
                                type="search"
                                placeholder="ابحث عند دواء"
                                onChange={(event) => {
                                    setSearchInput(event.target.value);
                                }}
                                className="relative h-[40px] text-black-500 rounded-[12px] bg-black-100 px-10 text-sm text-right text-black-500 focus:outline-none"
                            />
                        </div>
                    </div>
                }
            >
                <div className="flex w-full flex-col mt-5">
                        <Row
                            isFirst
                            data={{
                                medScientificName: "الاسم العلمي",
                                tradeName: "الاسم التجاري",
                                dosageForm: "شكل الجرعة",
                                strength: "التركيز",
                                price: "السعر",
                                availability: "توافر",
                                interact: "التفاعل",
                            }}
                            columnClassNames={{
                                medScientificName: "flex-2",
                                tradeName: "flex-2",
                                dosageForm: "flex-2",
                                strength:"flex-1",
                                price: "flex-1",
                                availability: "flex-1",
                                interact: "flex-1",
                            }}
                        />
                        <div
                            key={1}
                            className="flex flex-col text-inpt flex w-full items-center border-t border-gray-200"
                        >
                            {loadingMed ? (
                                <p className="text-black-500 text-sm py-2">جاري تحميل الأدوية...</p>
                            ) : errorMed ? (
                                <p className="text-red-500 text-sm py-2">{errorMed}</p>
                            ) : (
                                medicines.length === 0 ? (
                                    <p className="text-black-500 text-sm py-2">لا توجد أدوية في صيدليتك</p>
                                ) : (
                                    medicines.map((medicine) => (
                                        <Row
                                            key={medicine.id}
                                            data={{
                                                medScientificName: medicine.scientific_name,
                                                tradeName: medicine.trade_name,
                                                dosageForm: medicine.dosage_form,
                                                strength:medicine.strength,
                                                price: medicine.price + "₪",
                                                availability: (
                                                    <MedAvailability
                                                        isAvailable={medicine.is_available}
                                                        onChange={(isAvailable) =>
                                                        handleAvailabilityChange(
                                                            medicine.id,
                                                            isAvailable,
                                                        )
                                                        }
                                                    />
                                                    ),
                                                interact: <InteractMed pharmId={pharmacy?.id} id={medicine.id} name={medicine.trade_name}/>,
                                            }}
                                            columnClassNames={{
                                                medScientificName: "flex-2",
                                                tradeName: "flex-2",
                                                dosageForm: "flex-2",
                                                price: "flex-1",
                                                availability: "flex-1",
                                                interact: "flex-1",
                                            }}
                                        />
                                    ))
                                )
                            )}
                        </div>
                    {!loadingMed &&
                    !errorMed &&
                    pagination &&
                    pagination.last_page > 1 && (
                        <div className="flex w-full justify-start pt-5">
                            <PaginationRounded
                                count={pagination.last_page}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}
