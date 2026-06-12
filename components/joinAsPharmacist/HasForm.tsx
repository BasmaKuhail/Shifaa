import { useRouter } from "next/router";
import PetrolBtn from "../dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import Image from "next/image";
import Success from "@/public/icons/submited/success";
export default function HasPharmacistApplication() {
    const router = useRouter();
    return(
        <div className="flex flex-col items-center gap-7 text-27px font-[500]">
            <p className="text-27px font-[500]">وصلنا طلبك بنجاح!</p>
            {/* <Image alt="" src={}/> */}
            {/* make radial Gradiant color to the #91B8F478  circele's center #39B7EE and #67B7F2B8  to the center*/}
            {/* add shadow #B4E8FF */}
            <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#39B7EE] to-[#67B7F2B8] flex items-center justify-center shadow-[0_4px_50px_-4px_#B4E8FF] ">
                <Success className="w-[100px] h-[100px] text-white"/>
            </div>
            <p className="text-27px font-[500]">الرجاء الانتظار إلى أن نقوم بمراجعة الطلب</p>

            <PetrolBtn text="العودة للصفحة الرئيسية" onClick={() => router.push("/")}/>
        </div>
    )
}