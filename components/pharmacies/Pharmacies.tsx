import Image from "next/image";
import MobileHeader from "../header/MobileHeader";
import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import { motion } from "framer-motion";

import left from "@/public/images/About/left.png"
import right from "@/public/images/About/right.png"
import SearchInput from "../home/search/SearchInput";
import { useState } from "react";
import Title from "../home/SectionTitle";
import HeaderText from "../home/HeaderText";
import SubHeader from "../home/SubHeader";
import Pharm from "@/public/icons/dashboard/dashboard";
import PharmCard from "./PharmCard";
export default function Pharmacies() {
    const [userInput, setUserInput] = useState("");
    return (
        <div dir="rtl" className='w-full flex flex-col overflow-x-hidden '>
            <div className="bg-blue-100 relative inline-block ">
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
                        <div className="flex flex-col text-center justify-center items-center lg:px-30 md:px-15 sm:px-5 w-full">
                            <div className="flex flex-col gap-4 mb-10  ">
                                <HeaderText text="شبكة صيدليات شفاء" color="black"/>
                                <SubHeader text="تصفح قائمتنا الشاملة للصيدليات المعتمدة في جميع أنحاء قطاع غزة. هنا، يمكنك العثور على تفاصيل الاتصال، واستعراض المواقع، ومعرفة الصيدليات النشطة حاليًا في شبكتنا لتلبية احتياجاتك الصحية." color="black"/>
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
                <div className="flex flex-wrap flex-row items-center gap-5 px-30 justify-between mt-20 mb-20">
                    <PharmCard/>
                    <PharmCard/>
                    <PharmCard/>
                    <PharmCard/>
                    <PharmCard/>     
                    <PharmCard/>
                    <PharmCard/>
                    <PharmCard/>
                </div>
            </div>
        </div>
    )
}