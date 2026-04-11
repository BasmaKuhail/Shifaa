import Image from "next/image";
import plus from "@/public/icons/about/plus.svg"
import { useState } from "react";
import { motion } from "framer-motion";
export default function Quastion({question}:{question:{id:number, question:string, answer:string}}){

    const [viewAnswer, setViewAnswer] = useState(false);
    return(

        <div dir="rtl" className="bg-white p-5 lg:px-10 md:px-10 rounded-[14px] flex flex-col gap-3 w-full"  >
            <div className="flex flex-row justify-between gap-2 items-start">
                <p className="font-[500] text-btn">{question.id} . {question.question}</p>
                <motion.div
                    animate={{
                        rotate: viewAnswer ? 180  + 45 : 0
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeInOut"
                    }}
                    className="cursor-pointer p-2 touch-none pointer-events-auto"

                >
                    <div className="w-7 h-7 md:w-6 md:h-6 lg:w-6 lg:h-6" >
                        <Image src={plus} alt="" className="w-full h-full" onClick={() => {setViewAnswer(prev => !prev); console.log(question.id)}}/>
                    </div>
                </motion.div>

            </div>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: viewAnswer ? "auto" : 0,
                    opacity: viewAnswer ? 1 : 0
                }}
                className="px-5 text-black-400 text-inpt lg:text-btn md:text-btn"
            >
                <p>{question.answer}</p>
            </motion.div>
        </div>
    )
}