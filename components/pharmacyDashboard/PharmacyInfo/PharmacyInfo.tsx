import { useContext } from "react";
import Branches from "./Branches";
import ContactInfo from "./ContactDeatils";
import PharmacistsSec from "./PharmacistsSec";
import PharmInfoSec from "./PharmInfoSec";
import { UserContext } from "@/contexts/UserContext";

export default function PharmInfo(){
    const {user, loading} = useContext(UserContext)
    return(
        <div className="w-full flex flex-col gap-10 mt-13 mb-40">
            <p className="font-semibold text-27px">معلومات الصيدلية</p>
            {!loading && 
                <>
                    <PharmInfoSec pharmacistRole={user?.pharmacy_role}/>
                    <PharmacistsSec pharmacistRole={user?.pharmacy_role}/>
                </>
            }
            {/* <Branches/> */}            
            {/* <ContactInfo/> */}

        </div>
    )
}