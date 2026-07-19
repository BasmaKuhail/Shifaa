import Image from "next/image";
import MobileHeader from "../header/MobileHeader";
import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import { motion } from "framer-motion";

import search from "@/public/icons/search.svg"
import arrow from "@/public/icons/arrowLeft.svg"

import left from "@/public/images/About/left.png"
import right from "@/public/images/About/right.png"
import { useEffect, useState } from "react";
import HeaderText from "../home/HeaderText";
import SubHeader from "../home/SubHeader";
import PharmCard from "./PharmCard";
import { getAllPharmacies, searchPharmacies } from "@/services/pharmacies";
import { PharmacyApiResponse } from "@/services/pharmacy";
import GradientBtn from "../home/GradiantBtn";
import PharmCardSkeleton from "./CardSkelleton";
export default function Pharmacies() {
    const [userInput, setUserInput] = useState("");
    const [pharmacies, setPharmacies] = useState<PharmacyApiResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
    const normalizedInput = userInput.trim();
    let isCancelled = false;

    setLoading(true);

    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        if (!normalizedInput) {
          const data = await getAllPharmacies();

          if (!isCancelled) {
            setPharmacies(data);
          }

          return;
        }

        const result = await searchPharmacies({
          input: normalizedInput,
        });

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
  }, [userInput]);

    const skeletonCount = Math.max(pharmacies.length, 8);

    return (
        <div dir="rtl" className='w-full flex flex-col overflow-x-hidden '>
            <div className="bg-blue-100 relative inline-block w-full">
                <div className="pt-[75px] hidden lg:block">
                    <div className="px-4 md:px-8 lg:px-20 xl:px-30 pt-4 relative z-40"><SecondaryHeader/></div>
                </div>
                {/* mobile view */}
                <div className="absolute inset-0 -top-full block lg:hidden w-full flex items-center justify-center">
                    <MobileHeader/>
                </div>
                <div className="flex flex-col items-center justify-center px-5 md:px-10 lg:px-30 xl:px-50">
                    <div className="flex flex-col items-center justify-center mt-40 gap-10 ">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute top-0 lg:-left-30 xl:left-0 hidden lg:block z-0"
                        >
                            <Image src={left} alt=""/>
                        </motion.div>
                        <div className="flex flex-col text-center justify-center items-center w-full">
                            <div className="flex flex-col gap-4 mb-10">
                                <HeaderText text="شبكة صيدليات شفاء" color="black"/>
                                <div className="flex lg:px-20">
                                    <SubHeader text="تصفح قائمتنا الشاملة للصيدليات المعتمدة في جميع أنحاء قطاع غزة. هنا، يمكنك العثور على تفاصيل الاتصال، واستعراض المواقع، ومعرفة الصيدليات النشطة حاليًا في شبكتنا لتلبية احتياجاتك الصحية." color="black"/>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-center">
                                <div dir="rtl" className="relative w-full">
                                    <Image 
                                        alt=""
                                        width={15}
                                        src={search} 
                                        className="hidden lg:block md:block absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                                        onClick={() => searchPharmacies} />
                                    
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
                                    <div 
                                        className="
                                            absolute
                                            left-2
                                            lg:left-2
                                            md:left-2
                                            top-7
                                            lg:top-1/2
                                            md:top-1/2
                                            -translate-y-1/2
                                            w-auto
                                            h-[44px] md:h-[51px]"
                                    >
                                        <div className="hidden lg:block md:block  h-full">
                                            <GradientBtn text="ابدأ البحث" onClick={() => {}} px={10} rounded="30"/>
                                        </div>
                                        <div className="block lg:hidden md:hidden h-[90%]">
                                            <GradientBtn image={arrow} onClick={() => {}} px={5} rounded="30"/>
                                        </div>

                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1}}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute top-0 lg:-right-30 xl:right-0 hidden lg:block"
                        >
                            <Image src={right} alt=""/>
                        </motion.div>
                    </div>
                </div>
                <div aria-busy={loading} className="px-4 md:px-8 lg:px-20 xl:px-30 mt-20 mb-20 grid min-h-[360px] w-full content-start grid-cols-1 items-stretch gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

                    {!loading && pharmacies.map((pharmacy) =>
                        <PharmCard key={pharmacy.id} pharmacy={pharmacy}/>
                    )}
                    
                </div>
            </div>
        </div>
    )
}
