import Image from "next/image";
import Title from "../home/SectionTitle";
import HeaderText from "../home/HeaderText";

import bubble from "@/public/images/About/bubble.svg"

export default function Request(){
    return(<div className="flex flex-col py-10 items-center justify-center gap-5 w-full md:px-10 lg:px-30 xl:px-50 px-5">
                
                <div className="flex flex-col gap-1 w-full items-center">
                    <Title title="طلب الدواء" bgColor="white"/>
                    <div className="flex flex-row gap-3 items-center justify-between w-full lg:w-[40%] md:w-[80%]">
                        <Image src={bubble} alt=""/>
                        <HeaderText text="اطلب دواءك الان" color="white"/>
                        <Image src={bubble} alt=""/>
                    </div>
                </div>
                <p className="text-white text-btn text-center lg:w-[40%] md:w-[80%]"> إذا لم تجد دواءك، يمكنك تقديم طلب وسوف تعمل أقرب الصيدليات على توفيره لك.</p>

                <div
                    className="bg-blue-100 font-[500] text-blue-1100 font-btn px-10 py-3 rounded-full cursor-pointer hover:bg-white"
                    onClick={() => console.log("pressed")}
                >
                    اطلب الدواء
                </div>
            </div>)
}