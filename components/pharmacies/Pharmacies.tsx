import Image from "next/image";
import MobileHeader from "../header/MobileHeader";
import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";

import search from "@/public/icons/search.svg"
import { useEffect, useState } from "react";
import HeaderText from "../home/HeaderText";
import SubHeader from "../home/SubHeader";
import PharmCard from "./PharmCard";
import { getAllPharmacies, searchPharmacies } from "@/services/pharmacies";
import { PharmacyApiResponse } from "@/services/pharmacy";
import PharmCardSkeleton from "./CardSkelleton";
import Sort from "@/public/icons/sort";

import pharmaciesBg from "@/public/images/pharmaciesbg.svg"
import verifyIcon from "@/public/icons/pharmacies/verify.svg";
import locationIcon from "@/public/icons/pharmacies/location2.svg";
import timeIcon from "@/public/icons/pharmacies/time.svg";
import PharmacyNetworkFeature, {
  PharmacyNetworkFeatureItem,
} from "./PharmacyNetworkFeature";
import GridIcon from "@/public/icons/pharmacies/grid";
import ListIcon from "@/public/icons/pharmacies/list";

const pharmacyNetworkFeatures: PharmacyNetworkFeatureItem[] = [
  {
    icon: verifyIcon,
    title: "صيدليات موثوقة",
    description: "جميع الصيدليات موثوقة لضمان سلامتك",
  },
  {
    icon: locationIcon,
    title: "مواقع دقيقة",
    description: "اعثر على الصيدليات القريبة منك بسهولة",
  },
  {
    icon: timeIcon,
    title: "معلومات محدثة",
    description: "تعرّف على الصيدليات النشطة حالياً",
  },
];

export default function Pharmacies() {
    const [userInput, setUserInput] = useState("");
    const [pharmacies, setPharmacies] = useState<PharmacyApiResponse[]>([]);
    const [isSortedDescending, setIsSortedDescending] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<"alphabetical">("alphabetical");

    useEffect(() => {
    const normalizedInput = userInput.trim();
    let isCancelled = false;

    setLoading(true);

    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        if (!normalizedInput) {
          const data = await getAllPharmacies(isSortedDescending,);

          if (!isCancelled) {
            setPharmacies(data);
          }

          return;
        }

        const result = await searchPharmacies({
          input: normalizedInput,
        });

        const sortedPharmacies = isSortedDescending
          ? [...result.pharmacies].sort((firstPharmacy, secondPharmacy) =>
              secondPharmacy.name.localeCompare(firstPharmacy.name, "ar"),
            )
          : result.pharmacies;

        if (!isCancelled) {
          setPharmacies(result.pharmacies);
        }
      } catch (error: unknown) {
        if (isCancelled) {
          return;
        }

        console.error("Failed to load pharmacies:", error);

        setPharmacies([]);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "تعذر تحميل الصيدليات",
        );
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [userInput, isSortedDescending]);

    const skeletonCount = Math.max(pharmacies.length, 8);
    const visiblePharmacies = [...pharmacies].sort((firstPharmacy, secondPharmacy) =>
        firstPharmacy.name.localeCompare(secondPharmacy.name, "ar"),
    );
    const sort = async() => {
                const sort = await getAllPharmacies(true)
        setPharmacies(sort)
    }
    return (
       <div dir="rtl" className='w-full flex flex-col overflow-x-hidden'>
            <div className="bg-blue-100 relative inline-block ">
                <div className="relative overflow-hidden w-full flex flex-col gap-20 pb-30 ">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 mt-0 hidden bg-cover bg-center bg-no-repeat md:block"
                        style={{
                            backgroundImage: `url(${pharmaciesBg.src})`,
                            transform: "scale(-1, 1)",
                        }}
                    />
                    <div className="absolute inset-0 z-10 pt-[75px] hidden lg:block">
                        <div className="px-4 md:px-8 lg:px-20 xl:px-30 pt-4"><SecondaryHeader/></div>
                    </div>
                    {/* mobile view */}

                    <div className="absolute inset-0 -top-full block lg:hidden w-full flex items-center justify-center">
                        <MobileHeader/>
                    </div>
                    <div className="mt-30 lg:mt-50 xl:mt-50 flex flex-col items-start justify-start gap-10 px-4 md:px-8 lg:pl-100 xl:pl-180 lg:px-20 xl:px-30">     
                        <div className="relative z-10 flex w-full flex-col items-start justify-start gap-0">
                            <div className="flex flex-col items-start gap-4 mb-10">
                                <HeaderText text="شبكة صيدليات شفاء" color="black"/>
                                <div className="flex items-start">
                                   <SubHeader text="تصفح شبكة صيدليات شفاء الموثقة." color="black"/>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-center pb-10">
                                <div dir="rtl" className="relative w-full">
                                    <Image 
                                        alt=""
                                        width={15}
                                        src={search} 
                                        className="hidden lg:block md:block absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                                        onClick={() => searchPharmacies} 
                                    />                 
                                    <input 
                                        onChange={(e) => setUserInput(e.target.value)}
                                        type="text" 
                                        value={userInput}
                                        placeholder="ابحث باسم الصيدلية"
                                        className='w-full
                                            h-[52px] md:h-[65px]
                                            bg-white
                                            border border-black-200
                                            rounded-[30px]
                                            text-right
                                            pr-12 
                                            pl-32
                                            focus:outline-none
                                            text-sm
                                            text-black-500
                                        '
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full relative z-20 -mt-17 flex w-full justify-center px-4 md:px-8 lg:px-20 xl:px-30">
                    <div
                      dir="rtl"
                      className="flex w-full flex-col divide-y divide-black-200 rounded-[10px] bg-white px-2 py-5 shadow-sm md:flex-row md:divide-x md:divide-y-0 md:px-4"
                    >
                      {pharmacyNetworkFeatures.map((feature) => (
                        <PharmacyNetworkFeature
                          key={feature.title}
                          {...feature}
                        />
                      ))}
                    </div>
                </div>
                <div className="mt-8 flex w-full items-center justify-start gap-5 px-4 md:px-8 xl:pl-180 lg:px-20 xl:px-30">
                    <div className="flex items-center rounded-[10px] border border-black-200 bg-white">
                        <button
                            type="button"
                            aria-label="Grid view"
                            aria-pressed={viewMode === "grid"}
                            onClick={() => setViewMode("grid")}
                            className={`flex h-10 w-10 items-center justify-center rounded-[8px] ${viewMode === "grid" ? "bg-blue-100" : "bg-white"}`}
                        >
                            <GridIcon active={viewMode === "grid"} />
                        </button>
                        <button
                            type="button"
                            aria-label="List view"
                            aria-pressed={viewMode === "list"}
                            onClick={() => setViewMode("list")}
                            className={`flex h-10 w-10 items-center justify-center rounded-[8px] ${viewMode === "list" ? "bg-blue-100" : "bg-white"}`}
                        >
                            <ListIcon active={viewMode === "list"} />
                        </button>
                    </div>
                    <label className="relative flex h-10 shrink-0 items-center rounded-[10px] border border-black-200 bg-white px-4 text-inpt text-black-500">
                        <span className="pointer-events-none whitespace-nowrap ml-5">ترتيب حسب:</span>
                        <select
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value as "alphabetical")}
                            aria-label="ترتيب الصيدليات حسب"
                            className="w-full cursor-pointer appearance-none bg-transparent pl-5 text-inpt font-medium text-black-600 outline-none"
                        >
                            <option value="alphabetical">أبجدي</option>
                        </select>
                        <span className="pointer-events-none absolute left-4 top-1/2 h-2 w-2 -translate-y-3/4 rotate-45 border-b-2 border-r-2 border-black-600" />
                    </label>
                </div>
                <div aria-busy={loading} className={`${viewMode === "grid" ? "grid grid-cols-1 items-stretch gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-4"} px-4 md:px-8 lg:px-20 xl:px-30 mt-8 mb-20 min-h-[360px] w-full content-start`}>
                    {loading && Array.from({ length: skeletonCount }, (_, index) => (
                        <PharmCardSkeleton key={`pharmacy-skeleton-${index}`} />
                    ))}
                    {!loading && errorMessage && (
                        <p role="alert" className="col-span-full flex min-h-[260px] w-full items-center justify-center px-6 text-center text-base font-semibold text-red">
                            {errorMessage || "حدث خطأ في تحميل صيدليات شفاء"}
                        </p>
                    )}
                    {!loading && !errorMessage && pharmacies.length === 0 && (
                        <p role="status" className="col-span-full flex min-h-[260px] w-full items-center justify-center px-6 text-center text-base font-semibold text-blue-800">
                            لم يتم ايجاد صيدليات
                        </p>
                    )}

                    {!loading && visiblePharmacies.map((pharmacy) =>
                        <PharmCard key={pharmacy.id} pharmacy={pharmacy} isList={viewMode === "list"}/>
                    )}
                    
                </div>
            </div>
        </div>
    )
}
