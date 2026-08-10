import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import MobileHeader from "../header/MobileHeader";
import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import SearchHome from "../home/search/Search";
import MedNotFoundC2A from "../searchMed.tsx/MedNotFound";
import SearchResultsContainer from "./SearchResults";
import MedCard from "../medicen/MedCard";

import homeBgImg from "@/public/images/homeBgImg.webp";

import {
  Medicine,
  MedicinesPaginationMeta,
} from "@/services/medication";
import { searchMedicines } from "@/services/searchMedicine";

const MEDICINES_PER_PAGE = 9;
const SEARCH_DEBOUNCE_MS = 400;

export default function SearchMed() {
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [userInput, setUserInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedDosageForm, setSelectedDosageForm] = useState("");

  const [results, setResults] = useState<Medicine[]>([]);
  const [pagination, setPagination] =
    useState<MedicinesPaginationMeta | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const searchRequestIdRef = useRef(0);

  const hasMoreMedicines =
    pagination !== null &&
    pagination.current_page < pagination.last_page;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const querySearch =
      typeof router.query.search_input === "string"
        ? router.query.search_input
        : "";

    const normalizedSearch = querySearch.trim();
    setUserInput(normalizedSearch);
    setDebouncedSearch(normalizedSearch);

    const dosageForm = 
      typeof router.query.dosage_form === "string"
        ? router.query.dosage_form
        : "";
    setSelectedDosageForm(dosageForm);
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(userInput.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [userInput, router.isReady]);

  useEffect(() => {
    if (!router.isReady) {
        return;
    }

    const currentDosage =
        typeof router.query.dosage_form === "string"
            ? router.query.dosage_form
            : "";

    if (currentDosage === selectedDosageForm) {
        return;
    }

    const nextQuery = {
        ...router.query,
    };

    if (selectedDosageForm) {
        nextQuery.dosage_form = selectedDosageForm;
    } else {
        delete nextQuery.dosage_form;
    }

    void router.replace(
        {
            pathname: router.pathname,
            query: nextQuery,
        },
        undefined,
        {
            shallow: true,
        },
    );
}, [selectedDosageForm, router.isReady]);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const currentQuery =
      typeof router.query.search_input === "string"
        ? router.query.search_input.trim()
        : "";

    if (currentQuery === debouncedSearch) {
      return;
    }

    const nextQuery = { ...router.query };

    if (debouncedSearch) {
      nextQuery.search_input = debouncedSearch;
    } else {
      delete nextQuery.search_input;
    }

    void router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      {
        shallow: true,
      },
    );
  }, [debouncedSearch, router]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const requestId = ++searchRequestIdRef.current;

    const fetchResults = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await searchMedicines({
          page: 1,
          perPage: MEDICINES_PER_PAGE,
          search: debouncedSearch,
          dosageForm: selectedDosageForm
        });

        if (requestId !== searchRequestIdRef.current) {
          return;
        }

        setResults(response.data);
        setPagination(response.meta);
      } catch (error: unknown) {
        if (requestId !== searchRequestIdRef.current) {
          return;
        }

        console.error("Failed to search medicines:", error);

        setResults([]);
        setPagination(null);

        setError(
          error instanceof Error
            ? error.message
            : "تعذر إيجاد الأدوية",
        );
      } finally {
        if (requestId === searchRequestIdRef.current) {
          setLoading(false);
        }
      }
    };

    void fetchResults();
  }, [router.isReady, debouncedSearch, selectedDosageForm,]);


  const handleLoadMore = async () => {
    if (
      loading ||
      loadingMore ||
      !pagination ||
      pagination.current_page >= pagination.last_page
    ) {
      return;
    }

    const nextPage = pagination.current_page + 1;

    setLoadingMore(true);
    setError("");

    try {
      const response = await searchMedicines({
        page: nextPage,
        perPage: MEDICINES_PER_PAGE,
        search: debouncedSearch,
        dosageForm: selectedDosageForm,
      });

      setResults((currentResults) => {
        const medicinesById = new Map<number, Medicine>();

        currentResults.forEach((medicine) => {
          medicinesById.set(medicine.id, medicine);
        });

        response.data.forEach((medicine) => {
          medicinesById.set(medicine.id, medicine);
        });

        return Array.from(medicinesById.values());
      });

      setPagination(response.meta);
    } catch (error: unknown) {
      console.error("Failed to load more medicines:", error);

      setError(
        error instanceof Error
          ? error.message
          : "تعذر تحميل المزيد من الأدوية",
      );
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      <div className="relative inline-block bg-blue-100">
        {/* Desktop */}
        <Image
          src={homeBgImg}
          alt="home hero image"
          width={610.77}
          className="-mt-10 relative z-20 block rotate-180 scale-y-[-1] pointer-events-none lg:pt-[50px]"
          loading="eager"
          fetchPriority="high"
        />

        <div className="absolute inset-0 z-40 hidden pt-[75px] pointer-events-none lg:block">
        <div className="pointer-events-auto px-4 pt-4 md:px-8 lg:px-20 xl:px-30">
            <SecondaryHeader />
        </div>

        <div
            id="search"
            className="pointer-events-auto mt-20"
        >
            <SearchHome
              isHome={false}
              userInputProp={userInput}
              onSearchChange={setUserInput}
              dosage={selectedDosageForm}
              setSelectedDosageForm={setSelectedDosageForm}
            />
        </div>
        </div>

        {/* Mobile */}
        <div className="absolute inset-0 -top-full z-30 flex w-full items-center justify-center lg:hidden">
          <MobileHeader />
        </div>

        <div
          id="search"
          className="relative z-30 -mt-10 mb-40 block lg:hidden"
        >
          <SearchHome
            isHome={false}
            userInputProp={userInput}
            onSearchChange={setUserInput}
            dosage={selectedDosageForm}
            setSelectedDosageForm={setSelectedDosageForm}
          />
        </div>

        <div className="relative z-10 -mt-17 px-4 pt-4 pb-10 md:px-8 lg:px-20 xl:px-30">
          <SearchResultsContainer>
            {loading && (
              <div className="flex min-h-[360px] items-center justify-center">
                <p>جاري البحث...</p>
              </div>
            )}

            {!loading && error && results.length === 0 && (
              <div className="flex min-h-[360px] items-center justify-center">
                <p className="text-red-500">
                  {error}
                </p>
              </div>
            )}

            {!loading &&
              !error &&
              results.length === 0 && (
                <div className="flex min-h-[60px] items-center justify-center">
                  <p>لا توجد نتائج</p>
                </div>
              )}

            {!loading && results.length > 0 && (
              <>
                <div
                  className={`mb-5 min-h-[360px] w-full content-start ${
                    viewMode === "grid"
                      ? "grid grid-cols-1 items-stretch gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "flex flex-col gap-4"
                  }`}
                >
                  {results.map((medicine) => (
                    <MedCard
                      key={medicine.id}
                      dosageFprm={medicine.dosage_form}
                      image={medicine.medication_photo}
                      scintifcName={medicine.scientific_name}
                      medName={medicine.trade_name}
                      isList={viewMode === "list"}
                      price={medicine.price}
                      availablity={medicine.is_available}
                      pharmacyName={medicine.pharmacy?.name}
                      location={medicine.pharmacy?.address}
                      pharmacyId={medicine.pharmacy?.id}
                    />
                  ))}
                </div>

                {error && (
                  <p className="mb-4 text-center text-red-500">
                    {error}
                  </p>
                )}

                {hasMoreMedicines && (
                  <div className="flex w-full items-center justify-center">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="
                        mb-20 flex w-fit cursor-pointer items-center
                        gap-2 rounded-full bg-white px-6 py-2
                        text-white transition-colors
                        bg-gradient-to-r from-[#329CCB] to-[#668DCA]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {loadingMore
                        ? "جاري التحميل..."
                        : "عرض المزيد"}
                    </button>
                  </div>
                )}
              </>
            )}

            <MedNotFoundC2A />
          </SearchResultsContainer>
        </div>
      </div>
    </div>
  );
}