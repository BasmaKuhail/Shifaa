import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import Title from "../home/SectionTitle";
import TextArea from "./TextArea";
import AboutText from "./TextGroup";
import { motion } from "framer-motion";

import left from "@/public/images/About/left.svg"
import right from "@/public/images/About/right.svg"
import Image from "next/image";
import MobileHeader from "../header/MobileHeader";
import HeaderText from "../home/HeaderText";

import leftBubble from "@/public/images/About/leftBubble.png"
import rightBubble from "@/public/images/About/rightBubble.png"
import GradientBtn from "../home/GradiantBtn";
import FAQ from "./FAQs/FAQ";
import Request from "./Request";
import { useRouter } from "next/router";
export default function WhoAreWe(){
    const router = useRouter()
    return(
        <div className='w-full flex flex-col overflow-x-hidden '>
            <div className="bg-blue-100 relative inline-block ">
                <div className="pt-[75px] hidden lg:block">
                    <div className="px-4 md:px-8 lg:px-20 xl:px-30 pt-4 relative z-20"><SecondaryHeader/></div>
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
                            className="absolute top-0 lg:-left-30 xl:left-0 hidden lg:block z-0"
                        >
                            <Image src={left} alt=""/>
                        </motion.div>
                        <div className="bg-white py-10 lg:py-12 md:py-12 rounded-[10px]">
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
                    <div className="flex flex-col items-center justify-center mt-20 lg:mt-30 gap-7 w-full ">
                        <div className="flex flex-col gap-1 w-full items-center">
                            <Title  title="البحث عن الدواء" bgColor="white"/>
                            <div className="flex flex-row gap-3 items-center justify-between w-full lg:w-[80%] xl:w-[50%] md:w-[80%]">
                                <Image src={leftBubble} alt=""/>
                                <HeaderText text="هل أنت مستعد للبحث؟" color="black"/>
                                <Image src={rightBubble} alt=""/>
                            </div>
                        </div>
                        <p className="text-center text-btn font-[500] w-full lg:w-[50%]">لا تدع البحث عن الدواء يستنزف وقتك وطاقتك. ابدأ بحثك الآن لتجد أقرب صيدلية توفر الدواء الذي تحتاجه بضغطة زر واحدة.</p>
                        <div className="h-[45px] w-full flex flex-row items-center justify-center"><GradientBtn text="ابحث الان" onClick={() => {router.push("/#search"); console.log("clicked")}} px={10} rounded="30"/></div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-20 lg:mt-30 gap-7 w-full">
                        <div className="flex flex-col gap-1 w-full items-center">
                            <Title  title="FAQs" bgColor="white"/>
                            <HeaderText text="الأسئلة الشائعة" color="black"/>
                        </div>
                        <div className="w-full">
                            <FAQ/>
                        </div>  
                    </div>
                    
                </div>
                <div className="flex flex-col items-center justify-center mt-20 lg:mt-30 w-full bg-gradient-to-r from-[#329CCB] to-[#668DCA] py-20"><Request/></div>
            </div>
        </div>
    )
}