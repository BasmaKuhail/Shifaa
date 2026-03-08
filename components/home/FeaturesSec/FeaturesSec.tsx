import Title from "../SectionTitle"
import featuresImg from "@/public/images/featuresImg.png"
import Image, { StaticImageData } from "next/image";
import Item from "./CardItem";
import { motion } from "framer-motion";

type featuresProp = {
    featuresArr : {logo: StaticImageData, text:string}[]
}
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Features ({featuresArr}:featuresProp){
    return(<div dir="rtl" className="flex flex-col gap-2 items-center text-center">
        <div className="flex justify-between items-center justify-center border border-blue-900 rounded-full w-[13rem]">
            <Title title="مميزات المنصة"/>
        </div>
        <Image src={featuresImg} alt="med"/>
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row md:flex-col justify-between items-center"
            >
                {featuresArr.map((item, index)=><Item key={index} logo={item.logo} text={item.text}/>)}
            </motion.div>
    </div>)
}