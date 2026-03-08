import ButtonFull from "@/components/register/ButtonFull"
import HeaderText from "../HeaderText"
import Title from "../SectionTitle"
import SubHeader from "../SubHeader"
import GradientBrn from "../GradiantBtn"
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

type textSecProps ={
    secTitle: string,
    header: { text: string; color: string }[],
    paragraphText:string,
    button: {btnText: string, onClick: () => void},
    image:StaticImageData,
    dir:string
}
export default function TextSec({secTitle, header, paragraphText, button, image,dir}:textSecProps){
    const isMobile = useMediaQuery({ maxWidth: 1024 });
    const direction = isMobile ? "rtl" : dir;

    return(
        <motion.div
            dir={isMobile ? direction : dir}
            className="flex lg:flex-row md:flex-row flex-col justify-between mb-20 items-center"
            initial={{ opacity: 0, x: dir==="ltr" ? 60 : -60} }
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
        >
            <div className="hidden md:hidden lg:block">
                <Image className="rounded-[10px]" src={image} alt="image" width={570}/>
            </div>
            
            <div dir="rtl" className="flex flex-col gap-4 lg:gap-7 lg:w-[39%] w-full">
                <Title title={secTitle} />
                <nav className="flex flex-row gap-1">
                    {header?.map((item, index) => <HeaderText key={index} text={item.text} color={item.color}/>)}
                </nav>
                <div className="lg:hidden">
                    <Image className="rounded-[10px]" src={image} alt="image" width={570}/>
                </div>
                <p className="text-btn font-medium">{paragraphText}</p>
                <div className="lg:w-[50%] w-[60%] h-[51px]">
                    <GradientBrn text={button.btnText} onClick={button.onClick}/>
                </div>
            </div>
        
        </motion.div>
    )
}