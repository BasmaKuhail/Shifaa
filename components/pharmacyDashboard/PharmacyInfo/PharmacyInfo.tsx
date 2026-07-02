import Branches from "./Branches";
import ContactInfo from "./ContactDeatils";
import PharmacistsSec from "./PharmacistsSec";
import PharmInfoSec from "./PharmInfoSec";

export default function PharmInfo(){
    return(
        <div className="w-full flex flex-col gap-10 mt-13 mb-40">
            <p className="font-semibold text-27px">معلومات الصيدلية</p>
            <PharmInfoSec/>
            <ContactInfo/>
            <PharmacistsSec pharmacyName="شنن" />
            <Branches/>
        </div>
    )
}