import SubHeader from "../SubHeader"
import { motion , Variants  } from "framer-motion";

type tipProps = {
    tip:{num:number, title:string, text:string},
    width: number
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

function NumberContainer({num}:{num:number}){
    return(
        <div className="flex items-center p-3 bg-white text-blue-1000 text-27px py-[7px] px-[20px] justify-center aspect-square rounded-[14px]">
            <p className="font-[500]">{num}</p>
        </div>
    )
}
export default function Tip({tip, width}:tipProps){
    return(
        <motion.div
            variants={item}
            dir="rtl"
            style={{ ["--tip-width" as any]: `${width}%` }}
            className="flex flex-col gap-6 items-center text-center w-full lg:w-[var(--tip-width)]"
        >
            <NumberContainer num={tip.num}/>
            <p className="text-white text-21px font-semibold">{tip.title}</p>
            <p className="text-white text-btn">{tip.text}</p>
        </motion.div>
    )
}