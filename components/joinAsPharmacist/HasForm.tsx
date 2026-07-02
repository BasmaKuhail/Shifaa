import { useRouter } from "next/router";
import PetrolBtn from "../pharmacyDashboard/PharmacyInfo/invitePopup/PetrolBtn";
import Image from "next/image";
import Success from "@/public/icons/submited/success";
export default function HasPharmacistApplication() {
    const router = useRouter();
    return(
        <div className="flex flex-col items-center gap-7 text-27px font-[500]">
            <p className="text-27px font-[500]">وصلنا طلبك بنجاح!</p>
            <div
                className="
                flex h-[200px] w-[200px] items-center justify-center rounded-full
                bg-[radial-gradient(circle_at_center,#91B8F478_0%,#67B7F2B8_35%,#39B7EE_100%)]
                shadow-[0_4px_50px_-4px_#B4E8FF]
                "
            >
                <Success className="w-[100px] h-[100px] text-white"/>
                
            </div>
            <p className="text-27px font-[500]">الرجاء الانتظار إلى أن نقوم بمراجعة الطلب</p>

            <PetrolBtn text="العودة للصفحة الرئيسية" onClick={() => router.push("/")}/>
        </div>
    )
}