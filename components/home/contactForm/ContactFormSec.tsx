import ContactForm from "./Form";
import Image from "next/image";
import phsist from "@/public/images/phsist.png"
export default function ContatcSec(){
    return( 
        <div dir="rtl" className="flex flex-col lg:flex-row md:flex-row w-full items-stretch">
            <div className="lg:w-1/2 md:w-1/2">
                <ContactForm />
            </div>
                
            <div className="lg:w-1/2 md:w-1/2 flex flex-row items-center justify-center hidden lg:block md:block">
                <Image src={phsist} alt="phsist" className="rounded-r-[10px] h-full object-cover scale-x-[-1] "/>
            </div>
        </div>
    )
}