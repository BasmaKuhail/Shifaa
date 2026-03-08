import { StaticImageData } from "next/image"
import Icon from "../Icon"

import { motion , Variants  } from "framer-motion";

type itemProps = {
    logo:StaticImageData,
    text:string
}

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
export default function Item ({logo, text}:itemProps){
    return(
        <motion.div
            variants={item}
            dir="rtl"
            className="bg-white rounded-full items-center flex flex-row gap-3 p-3 w-full lg:w-[30%] mb-5 lg:mb-0 "
        >
            <Icon icon={logo} width={30}/>
            <p className="w-[85%] text-start font-[500] lg:text-btn md:text-btn text-12px">{text}</p>
        </motion.div>
            
    )
}