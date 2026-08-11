import MobileHeader from "../header/MobileHeader";
import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import ImageProfile from "../EditProfile/Image";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import call from "@/public/icons/pharmacies/call.svg";
import location from "@/public/icons/pharmacies/location.svg";
import profile from "@/public/icons/pharmacies/profile.svg";
import verified from "@/public/icons/pharmacies/verified.svg";

import ContactCard, { ContactCardItem } from "./contactCard";
import SearchInput from "../home/search/SearchInput";
import { getPharmacyById } from "@/services/pharmacy";
import { Pharmacy } from "@/types/PharmacyType";
import { showAlert } from "../alerts/AlertContainer";
import { useRouter } from "next/router";
import Image from "next/image";
import MedNotFoundC2A from "../searchMed.tsx/MedNotFound";
import MedCard from "../medicen/MedCard";

import {
    getPharmacyMedicines,
    Medicine,
    MedicinesPaginationMeta,
} from "@/services/medication";

export default function PharmacyDetails() {
    const MEDICINES_PER_PAGE = 9;
    const SEARCH_DEBOUNCE_MS = 500;

    const router = useRouter();

    const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
    const [loadingPharmacy, setLoadingPharmacy] = useState(false);

    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loadingMed, setLoadingMed] = useState(false);
    const [errorMed, setErrorMed] = useState("");

    const [pagination, setPagination] =
        useState<MedicinesPaginationMeta | null>(null);

    const [currentPage, setCurrentPage] = useState(1);

    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [viewMode] = useState<"grid" | "list">("grid");

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
        if (!router.isReady) {
            return;
        }

        const { id } = router.query;

        if (typeof id !== "string") {
            console.error("Invalid pharmacy ID:", id);
            return;
        }

        const pharmacyId = Number(id);

        if (!Number.isInteger(pharmacyId) || pharmacyId <= 0) {
            console.error("Invalid pharmacy ID number:", pharmacyId);
            return;
        }

        let isCancelled = false;

        const fetchPharmacy = async () => {
            setLoadingPharmacy(true);

            try {
                const pharmacyData = await getPharmacyById(pharmacyId);

                if (!isCancelled) {
                    setPharmacy(pharmacyData);
                }
            } catch (error) {
                console.error("Failed to fetch pharmacy:", error);

                if (!isCancelled) {
                    setPharmacy(null);

                    showAlert({
                        type: "Error",
                        title: "خطأ",
                        message: "خطأ في إيجاد الصيدلية",
                    });
                }
            } finally {
                if (!isCancelled) {
                    setLoadingPharmacy(false);
                }
            }
        };

        void fetchPharmacy();

        return () => {
            isCancelled = true;
        };
    }, [router.isReady, router.query.id]);

    useEffect(() => {
        if (loadingPharmacy || !pharmacy) {
            return;
        }

        const fetchMedicines = async () => {
            const requestId = ++latestRequestIdRef.current;

            setLoadingMed(true);
            setErrorMed("");

            try {
                const response = await getPharmacyMedicines(
                    pharmacy.id,
                    {
                        page: currentPage,
                        perPage: MEDICINES_PER_PAGE,
                        search: debouncedSearch,
                    },
                );

                if (requestId !== latestRequestIdRef.current) {
                    return;
                }

                setMedicines((previousMedicines) => {
                    if (currentPage === 1) {
                        return response.data;
                    }

                    const existingMedicineIds = new Set(
                        previousMedicines.map(
                            (medicine) => medicine.id,
                        ),
                    );

                    const newMedicines = response.data.filter(
                        (medicine) =>
                            !existingMedicineIds.has(medicine.id),
                    );

                    return [
                        ...previousMedicines,
                        ...newMedicines,
                    ];
                });

                setPagination(response.meta);
            } catch (error) {
                console.error(
                    "Failed to fetch pharmacy medicines:",
                    error,
                );

                if (requestId !== latestRequestIdRef.current) {
                    return;
                }

                if (currentPage === 1) {
                    setMedicines([]);
                    setPagination(null);
                }

                setErrorMed("تعذر تحميل الأدوية");
            } finally {
                if (requestId === latestRequestIdRef.current) {
                    setLoadingMed(false);
                }
            }
        };

        void fetchMedicines();
    }, [
        currentPage,
        debouncedSearch,
        pharmacy,
        loadingPharmacy,
    ]);

    const handleLoadMore = () => {
        if (
            loadingMed ||
            !pagination ||
            currentPage >= pagination.last_page
        ) {
            return;
        }

        setCurrentPage(
            (previousPage) => previousPage + 1,
        );
    };

    const hasMoreMedicines =
        pagination !== null &&
        currentPage < pagination.last_page;

    const ownerName = useMemo(() => {
        if (!pharmacy?.owner) {
            return "غير متوفر";
        }

        return [
            pharmacy.owner.first_name,
            pharmacy.owner.last_name,
        ]
            .filter(Boolean)
            .join(" ");
    }, [pharmacy?.owner]);

    const contact: ContactCardItem[] = [
        {
            id: 1,
            title: "رقم الهاتف",
            text: pharmacy?.phone,
            icon: call,
        },
        {
            id: 2,
            title: "المالك",
            text:
                pharmacy?.owner_name ||
                ownerName,
            icon: profile,
        },
        {
            id: 3,
            title: "العنوان",
            text: pharmacy?.address,
            icon: location,
        },
    ];

    return (
        <div
            dir="rtl"
            className="flex w-full flex-col overflow-x-hidden"
        >
            <div className="relative inline-block bg-blue-100 pb-20">
                <div className="hidden pt-[75px] lg:block">
                    <div className="relative z-40 px-4 pt-4 md:px-8 lg:px-20 xl:px-30">
                        <SecondaryHeader />
                    </div>
                </div>

                {/* Mobile view */}
                <div className="absolute inset-0 -top-full flex w-full items-center justify-center lg:hidden">
                    <MobileHeader />
                </div>

                <div className="mt-20 flex w-full px-4 md:px-8 lg:px-20 xl:px-30">
                    <div
                        dir="rtl"
                        className="flex w-full flex-col justify-start rounded-[14px] bg-white p-15 shadow-sm"
                    >
                        {/* Pharmacy header */}
                        <div className="flex flex-col items-center justify-start gap-5 md:flex-row md:items-start md:gap-10">
                            <div className="flex rounded-[14px] border border-black-50 p-1">
                                <ImageProfile
                                    imageUrl={
                                        pharmacy?.logo || null
                                    }
                                    width={135}
                                    isUser={false}
                                    showBtns={false}
                                    isCircle={false}
                                />
                            </div>

                            <div className="flex flex-col">
                                <div className="flex flex-row items-center gap-3">
                                    <p className="text-center text-27px font-bold md:text-[30px]">
                                        {pharmacy?.name ||
                                            "اسم الصيدلية"}
                                    </p>

                                    <Image
                                        src={verified}
                                        alt="Verified pharmacy"
                                        width={20}
                                        height={20}
                                        className="mt-1 shrink-0"
                                    />
                                </div>

                                <p className="hidden md:block md:w-[90%] lg:w-[60%]">
                                    {pharmacy?.name
                                        ? `${pharmacy.name} `
                                        : "اسم الصيدلية "}

                                    أحد صيدليات شفاء المعتمدة،
                                    تصفح أدوية الصيدلية بالأسفل
                                    ولا تتردد في تقديم طلب دواء
                                    في حال لم تجد الدواء الذي
                                    تبحث عنه.
                                </p>
                            </div>
                        </div>

                        {/* Contact information */}
                        <div className="mt-5 grid grid-cols-2 gap-5 md:mt-10 md:flex md:flex-row md:justify-between md:gap-10">
                            {contact.map((item, index) => {
                                const isLastCard =
                                    index ===
                                    contact.length - 1;

                                return (
                                    <div
                                        key={item.id}
                                        className={
                                            isLastCard
                                                ? "col-span-2 md:col-span-1 md:flex-1"
                                                : "md:flex-1"
                                        }
                                    >
                                        <ContactCard
                                            title={
                                                item.title
                                            }
                                            text={item.text}
                                            icon={item.icon}
                                            mobileRow={
                                                isLastCard
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Medicine search */}
                        <div className="mt-10 mb-10 flex w-full flex-col items-start justify-center gap-5">
                            <p className="text-btn font-[500]">
                                ابحث عن الأدوية الموجودة في
                                هذه الصيدلية
                            </p>

                            <SearchInput
                                isHome={false}
                                label="ابحث عن دواء..."
                                value={searchInput}
                                onChange={
                                    setSearchInput
                                }
                            />
                        

                        {/* Initial loading */}
                        {loadingMed &&
                            currentPage === 1 && (
                                <div className="flex min-h-[200px] w-full items-center justify-center">
                                    <p className="text-black-300">
                                        جاري تحميل الأدوية...
                                    </p>
                                </div>
                            )}
                        {/* No medicines */}
                        {!loadingMed &&
                            !errorMed &&
                            medicines.length === 0 && (
                                <div className="flex min-h-[200px] w-full items-center justify-center">
                                    <p className="text-black-300">
                                        لا توجد أدوية
                                    </p>
                                </div>
                        )}

                        {/* Error */}
                        {!loadingMed &&
                            errorMed &&
                            medicines.length === 0 && (
                                <div className="flex min-h-[200px] w-full items-center justify-center">
                                    <p className="text-red-500">
                                        {errorMed}
                                    </p>
                                </div>
                            )}

                        {/* Medicines */}
                        {!(loadingMed && currentPage === 1) && medicines.length !=0 &&
                            <div
                                aria-busy={loadingMed}
                                className={`
                                    mb-5 min-h-[360px] w-full content-start
                                    ${
                                        viewMode === "grid"
                                            ? "grid grid-cols-1 items-stretch gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                            : "flex flex-col gap-4"
                                    }
                                `}
                            >
                                {medicines.map(
                                    (medicine) => (
                                        <MedCard
                                            key={medicine.id}
                                            dosageFprm={medicine.dosage_form}
                                            image={medicine.medication_photo}
                                            medName={medicine.trade_name}
                                            pharmacyName={pharmacy?.name}
                                            isList={viewMode ==="list"}
                                            location={pharmacy?.address || ""}
                                            pharmacyId={pharmacy?.id}
                                            price={medicine.price}
                                            availablity={medicine.is_available}
                                            scintifcName={medicine.scientific_name}
                                        />
                                    ),
                                )}
                            </div>
                        }
                        {/* Load more */}
                        {hasMoreMedicines && (
                            <div className="mb-10 flex w-full items-center justify-center">
                                <button
                                    type="button"
                                    onClick={
                                        handleLoadMore
                                    }
                                    disabled={
                                        loadingMed
                                    }
                                    className="
                                        mt-5
                                        cursor-pointer
                                        rounded-full
                                        bg-blue-1000
                                        px-4
                                        py-2
                                        text-btn
                                        text-white
                                        transition
                                        ease-out
                                        hover:bg-blue-500
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                        md:px-6
                                    "
                                >
                                    {loadingMed
                                        ? "جاري التحميل..."
                                        : "عرض المزيد"}
                                </button>
                            </div>
                        )}
                    </div>
                        <MedNotFoundC2A />
                    </div>
                </div>
            </div>
        </div>
    );
}