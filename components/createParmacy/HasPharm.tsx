import { useRouter } from "next/router";
import PetrolBtn from "../pharmacyDashboard/PharmacyInfo/invitePopup/PetrolBtn";
import Image from "next/image";
import Success from "@/public/icons/submited/success";
export default function HasPharm() {
    const router = useRouter();
    return(
        <div className="flex flex-col items-center gap-7 text-27px font-[500]">
            <p className="text-27px font-[500]">أنت منضم لصيدلية!</p>
            <p className="text-27px font-[500]">انتقل للوحة التحكم الخاصة بالصيدلية</p>

            <PetrolBtn text="لوحة التحكم" onClick={() => router.push("/pharmacy-dashboard/pharmInfo")}/>
        </div>
    )
}