import PharmacistsSec from "./PharmacistsSec";
import PharmInfoSec from "./PharmInfoSec";

export default function PharmInfo(){
    return(
        <div className="flex flex-col gap-10 mt-13">
            <p className="font-semibold text-27px">معلومات الصيدلية</p>
            <PharmInfoSec/>
            <PharmacistsSec pharmacyName="شنن" />
        </div>
    )
}