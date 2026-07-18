import Image from "next/image";
import MobileHeader from "../header/MobileHeader";
import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import { motion } from "framer-motion";

import left from "@/public/images/About/left.png"
import right from "@/public/images/About/right.png"
import SearchInput from "../home/search/SearchInput";
import { useEffect, useState } from "react";
import Title from "../home/SectionTitle";
import HeaderText from "../home/HeaderText";
import SubHeader from "../home/SubHeader";
import Pharm from "@/public/icons/dashboard/dashboard";
import PharmCard from "./PharmCard";
import { getAllPharmacies } from "@/services/pharmacies";
import { Pharmacy } from "@/types/PharmacyType";
import { PharmacyApiResponse } from "@/services/pharmacy";
export default function Pharmacies() {
    const [userInput, setUserInput] = useState("");
    const [pharmacies, setPharmacies] = useState<PharmacyApiResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isCancelled = false;

        const fetchPharmacies = async () => {
            setLoading(true);
            setErrorMessage("");

            try {
                const data = await getAllPharmacies();

                console.log(data)
                if (!isCancelled) {
                    setPharmacies(data);
                }
            } catch (error: unknown) {
                console.error("Failed to fetch pharmacies:", error);

                if (!isCancelled) {
                    setPharmacies([]);
                    setErrorMessage(
                        error instanceof Error
                        ? error.message
                        : "تعذر تحميل الصيدليات",
                    );
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        void fetchPharmacies();

        return () => {
            isCancelled = true;
        };
    }, []);
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
                                <SearchInput label=" ابحث عن صيدليات" value= {userInput} onChange={(value) => setUserInput(value)}/>
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
                <div className="px-4 md:px-8 lg:px-20 xl:px-30 flex w-full flex-col flex-wrap md:flex-row items-center gap-5 justify-center md:justify-between mt-20 mb-20">
                    {loading && <p>جاري تحميل الصيدليات...</p>}
                    {errorMessage && <p>{errorMessage || "حدث خطأ في تحميل صيدليات شفاء"}</p>}
                    {!loading && pharmacies.length === 0 && <p>لم يتم اضافة صيدليات</p>}

                    {pharmacies.map((pharmacy) => 
                        <PharmCard key={pharmacy.id} pharmacy={pharmacy}/>
                    )}
                    
                </div>
            </div>
        </div>
    )
}