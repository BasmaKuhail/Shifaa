import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import Title from "../home/SectionTitle";
import TextArea from "./TextArea";
import AboutText from "./TextGroup";
import { motion } from "framer-motion";

import left from "@/public/images/About/left.png"
import right from "@/public/images/About/right.png"
import Image from "next/image";
import MobileHeader from "../header/MobileHeader";
import HeaderText from "../home/HeaderText";

import leftBubble from "@/public/images/About/leftBubble.png"
import rightBubble from "@/public/images/About/rightBubble.png"
import GradientBrn from "../home/GradiantBtn";
import FAQ from "./FAQs/FAQ";
import Request from "./Request";
export default function WhoAreWe(){
    return(
        <div className='w-full flex flex-col overflow-x-hidden '>
            <div className="bg-blue-100 relative inline-block ">
                <div className="pt-[75px] hidden lg:block">
                    <SecondaryHeader />
                </div>
                {/* mobile view */}
                <div className="absolute inset-0 -top-full block lg:hidden w-full flex items-center justify-center">
                    <MobileHeader/>
                </div>
                <div className="flex flex-col items-center justify-center px-5 md:px-10 lg:px-30 xl:px-50">
                    <div className="flex flex-col items-center justify-center mt-40 gap-10 ">
                        <div className="flex flex-col items-center justify-center">
                            <Title  title="من نحن؟" bgColor="white"/>
                            <AboutText 
                                titleBlack="رعايتكم الصحية في غزة.." 
                                titleBlue="أولويتنا" 
                                sentence="رعايتكم الصحية في غزة.. أولويتن ارعايتكم الصحية في غزة.. أولويتنا"
                            />
                        </div>
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute top-0 lg:-left-30 xl:left-0 hidden lg:block"
                        >
                            <Image src={left} alt=""/>
                        </motion.div>
                        <div className="bg-white py-12 rounded-[10px]">
                            <TextArea/>
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
                    <div className="flex flex-col items-center justify-center mt-30 gap-7 w-full ">
                        <div className="flex flex-col gap-1 w-full items-center">
                            <Title  title="البحث عن الدواء" bgColor="white"/>
                            <div className="flex flex-row gap-3 items-center justify-between w-full lg:w-[50%] md:w-[80%]">
                                <Image src={leftBubble} alt=""/>
                                <HeaderText text="هل أنت مستعد للبحث؟" color="black"/>
                                <Image src={rightBubble} alt=""/>
                            </div>
                        </div>
                        <p className="text-center text-btn font-[500] w-full lg:w-[50%]">لا تدع البحث عن الدواء يستنزف وقتك وطاقتك. ابدأ بحثك الآن لتجد أقرب صيدلية توفر الدواء الذي تحتاجه بضغطة زر واحدة.</p>
                        <div className="h-[45px]"><GradientBrn text="ابحث الان" onClick={() => {}} px={20}/></div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-30 gap-7 w-full">
                        <div className="flex flex-col gap-1 w-full items-center">
                            <Title  title="FAQs" bgColor="white"/>
                            <HeaderText text="الأسئلة الشائعة" color="black"/>
                        </div>
                        <div className="w-full">
                            <FAQ/>
                        </div>  
                    </div>
                    
                </div>
                <div className="flex flex-col items-center justify-center mt-30 w-full bg-blue-1000"><Request/></div>
            </div>
        </div>
    )
}