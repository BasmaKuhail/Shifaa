import Image from "next/image";
import plus from "@/public/icons/about/plus.svg"
import { useState } from "react";
import { motion } from "framer-motion";
export default function Quastion({question}:{question:{id:number, question:string, answer:string}}){

    const [viewAnswer, setViewAnswer] = useState(false);
    return(
        
        <div dir="rtl" className="bg-white p-5 px-10 rounded-[14px] flex flex-col text-btn gap-3 w-full" onClick={() => setViewAnswer(prev => !prev)}>
            <div className="flex flex-row justify-between gap-2 items-start">
                <p className="font-[500]">{question.id} . {question.question}</p>
                <motion.div
                    animate={{
                        rotate: viewAnswer ? 180  + 45 : 0
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeInOut"
                    }}
                    className="cursor-pointer"
                >
                    <Image src={plus} alt="" width={20}/>
                </motion.div>

            </div>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: viewAnswer ? "auto" : 0,
                    opacity: viewAnswer ? 1 : 0
                }}
                transition={{
                    duration: 1.0,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1] 
                }}
                className="px-5 text-black-400 overflow-hidden"
            >
                <p>{question.answer}</p>
            </motion.div>
        </div>
    )
}