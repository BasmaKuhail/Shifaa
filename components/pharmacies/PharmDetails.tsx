import MobileHeader from "../header/MobileHeader";
import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import ImageProfile from "../EditProfile/Image";
import { useContext, useEffect, useMemo, useState } from "react";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";

import call from "@/public/icons/pharmacies/call.svg"
import location from "@/public/icons/pharmacies/location.svg"
import profile from "@/public/icons/pharmacies/profile.svg"

import ContactCard, { ContactCardItem } from "./contactCard";
import SearchInput from "../home/search/SearchInput";
import { getPharmacyById } from "@/services/pharmacy";
import { Pharmacy } from "@/types/PharmacyType";
import { showAlert } from "../alerts/AlertContainer";
import { useRouter } from "next/router";
export default function PharmacyDetails (){
    const [pharmacy, setPharmacy] = useState<Pharmacy | null>();
    const [loading, setIsLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        const { id } = router.query;

        if (typeof id !== "string") {
            console.error("Invalid pharmacy ID:", id);
            return;
        }

        const pharmacyId = Number(id);

        if (!Number.isInteger(pharmacyId) || pharmacyId <= 0) {
            console.error("Invalid pharmacy ID number:", pharmacyId);
            return;
        }

        let isCancelled = false;

        const fetchPharmacy = async () => {
            setIsLoading(true);

            try {
                console.log("Fetching pharmacy:", pharmacyId);

                const pharmacyData = await getPharmacyById(pharmacyId);

                console.log("Fetched pharmacy:", pharmacyData);

            if (!isCancelled) {
                setPharmacy(pharmacyData);
            }
            } catch (error) {
                console.error("Failed to fetch pharmacy:", error);

            if (!isCancelled) {
                setPharmacy(null);

                showAlert({
                type: "Error",
                title: "خطأ",
                message: "خطأ في إيجاد الصيدلية",
                });
            }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        void fetchPharmacy();

        return () => {
            isCancelled = true;
        };
    }, [router.isReady, router.query.id]);

    const ownerName = useMemo(() => {
        if (!pharmacy?.owner) {
            return "غير متوفر";
        }

        return [
            pharmacy.owner.first_name,
            pharmacy.owner.last_name,
        ]
            .filter(Boolean)
            .join(" ");
    }, [pharmacy?.owner]);

    const contact: ContactCardItem[] = [
        {id:1, title:"رقم الهاتف", text:pharmacy?.phone, icon:call},
        {id:2, title:"العنوان", text:pharmacy?.address, icon:location},
        {id:3, title:"المالك", text:ownerName, icon:profile},
    ]
    const [userInput, setUserInput] = useState("");
    return(
        <div dir="rtl" className='w-full flex flex-col overflow-x-hidden '>
            <div className="bg-blue-100 relative inline-block pb-20 ">
                <div className="pt-[75px] hidden lg:block">
                    <div className="px-4 md:px-8 lg:px-20 xl:px-30 pt-4 relative z-40"><SecondaryHeader/></div>
                </div>
                {/* mobile view */}
                <div className="absolute inset-0 -top-full block lg:hidden w-full flex items-center justify-center">
                    <MobileHeader/>
                </div> 
                <div className="flex w-full px-4 md:px-8 lg:px-20 xl:px-30 mt-20">
                    <div 
                        className="
                            bg-white rounded-normal w-full
                            p-10 
                            md:p-20
                            flex flex-col gap-5 md:gap-10
                            md:mt-0
                            shadow-lg"
                    >
                        <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-start">
                            <ImageProfile
                                imageUrl={pharmacy?.logo || null}
                                width={150}
                                isUser={false}
                                isCircle={true}
                                showBtns={false}
                            />
                                <p className="text-center text-27px md:text-[35px] font-bold">{pharmacy?.name || "اسم الصيدلية"}</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 md:gap-10 justify-between mt-5 md:mt-10">
                            {contact.map((item) => 
                                <ContactCard key={item.id} title={item.title} text={item.text} icon={item.icon}/>
                            )}
                            
                        </div>
                        <div className="flex flwx-row w-full items-center justify-center mt-5">
                            <div className="flex w-full md:w-[80%] items-center justify-center">
                                <SearchInput label="ابحث عن دواء..." value= {userInput} onChange={(value) => setUserInput(value)}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

           
        </div>
    )
}
