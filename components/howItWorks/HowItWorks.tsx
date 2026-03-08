import { useEffect } from "react";
import HeaderText from "../home/HeaderText";
import Title from "../home/SectionTitle";
import SubHeader from "../home/SubHeader";
import Tip from "./Tip";
import { motion } from "framer-motion";

type workProp ={
    title: string,
    header: {text: string, color:string},
    subHeader: {text: string, color:string}
    tips: {num:number, title:string, text:string}[]
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Work({title , header, subHeader, tips}:workProp){
    const width = (100 / tips.length) - 6;
    return(
    <div dir="rtl" className="flex flex-col gap-11 bg-blue-1000 w-full items-center py-[3.336rem] px-4 md:px-8 lg:px-30">
        
        <div className="flex flex-col items-center text-center gap-2">
            <Title title={title}/>
            <HeaderText text={header.text} color={header.color} />
            <SubHeader text={subHeader.text} color={subHeader.color}/>
        </div>
        

        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col mb-10 gap-5 lg:gap-0 md:gap-5 lg:flex-row items-center justify-between w-full"
            >
            {tips.map((tip, index) => 
                <Tip key={index} tip={tip} width={width}/>
            )}
        </motion.div>
    </div>)
}