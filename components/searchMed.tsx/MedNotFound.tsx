import Image from "next/image";
import med from "@/public/images/MedNotFound.svg"
export default function MedNotFoundC2A(){
    return(
        <div dir="rtl" className="p-5 px-10 flex flex-row w-full bg-gradient-to-r from-[#329CCB] to-[#668DCA] rounded-[10px] justify-between">
            <div className="flex flex-col gap-5 text-white">
                <p className="text-title font-bold">لم تستطع ايجاد الدواء؟</p>
                <p className="text-21px">لا تفقد الأمل، قم بتعبئة النموذج وسنقوم بارسال طلب دواء لجميع صيدليات شفاء، ونخبرك عند ايجاده.</p>
                <div className="flex flex-row p-3 rounded-full w-fit px-15 bg-white text-center justify-center text-blue-500">
                    طلب الدواء
                </div>
            </div>
            <Image src={med} alt="medicine"/>

        </div>
    )
}