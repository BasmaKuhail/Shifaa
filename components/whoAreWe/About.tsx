import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import Title from "../home/SectionTitle";
import TextArea from "./TextArea";
import AboutText from "./TextGroup";
import { motion } from "framer-motion";

import left from "@/public/images/About/left.png"
import right from "@/public/images/About/right.png"
import Image from "next/image";
import MobileHeader from "../header/MobileHeader";
export default function WhoAreWe(){
    return(
        <div className='w-full flex flex-col overflow-x-hidden '>
            <div className="bg-blue-100 relative inline-block pb-100 px-4 md:px-8 lg:px-20 xl:px-30 pt-4">
                <div className="pt-[75px] hidden lg:block">
                    <SecondaryHeader />
                </div>
                {/* mobile view */}
                <div className="absolute inset-0 -top-full block lg:hidden w-full flex items-center justify-center">
                    <MobileHeader/>
                </div>
                <div className="flex flex-col items-center justify-center mt-40 gap-10 md:px-10 lg:px-30 xl:px-50">
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
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-0 lg:-left-30 xl:left-0 hidden lg:block"
                    >
                        <Image src={left} alt="" className="absolute top-0 lg:-left-30 xl:left-0 hidden lg:block"/>
                    </motion.div>
                    <div className="bg-white py-12 rounded-[10px]">
                        <TextArea/>
                    </div>
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                            repeat: Infinity
                        }}
                        className="absolute top-0 lg:-right-30 xl:right-0 hidden lg:block"
                    >
                        <Image src={right} alt="" className="absolute top-0 lg:-right-30 xl:right-0 hidden lg:block"/>
                    </motion.div>
                </div>
                
            </div>
        </div>
    )
}