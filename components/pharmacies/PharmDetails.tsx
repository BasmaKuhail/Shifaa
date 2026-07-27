import MobileHeader from "../header/MobileHeader";
import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import ImageProfile from "../EditProfile/Image";
import { useContext, useEffect, useMemo, useState } from "react";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";

import call from "@/public/icons/pharmacies/call.svg"
import location from "@/public/icons/pharmacies/location.svg"
import profile from "@/public/icons/pharmacies/profile.svg"
import verified from "@/public/icons/pharmacies/verified.svg";

import ContactCard, { ContactCardItem } from "./contactCard";
import SearchInput from "../home/search/SearchInput";
import { getPharmacyById } from "@/services/pharmacy";
import { Pharmacy } from "@/types/PharmacyType";
import { showAlert } from "../alerts/AlertContainer";
import { useRouter } from "next/router";
import Card from "../pharmacyDashboard/PharmacyInfo/CardContainer";
import Image from "next/image";
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
        {id:2, title:"المالك", text:pharmacy?.owner_name, icon:profile},
        {id:3, title:"العنوان", text:pharmacy?.address, icon:location},
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
                    <Card>
                        <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center md:items-start justify-start">
                            <div className="flex border border-black-50 p-1 rounded-[14px]">
                                <ImageProfile
                                    imageUrl={pharmacy?.logo || null}
                                    width={135}
                                    isUser={false}
                                    showBtns={false}
                                    isCircle={false}
                                />
                            </div>
                           
                            <div className="flex flex-col"> 
                                <div className="flex flex-row items-center gap-3">
                                    <p className="text-center text-27px md:text-[30px] font-bold">{pharmacy?.name || "اسم الصيدلية"}</p>
                                    <Image
                                        src={verified}
                                        alt="Verified pharmacy"
                                        width={20}
                                        height={20}
                                        className="mt-1 shrink-0"
                                    />
                                </div>  
                                <p className="hidden md:block md:w-[90%] lg:w-[60%]">
                                    {pharmacy?.name + " " || "اسم الصيدلية"}
                                    أحد صيدليات شفاء المعتمدة، تصفح ادوية الصيدلية بالأسفل ولا تتردد في تقديم طلب دواء في حال لم تجد دواءك الذي تبحث عنه
                                    
                                </p>
                            </div>
                            
                        </div>
                            <div
                                className="
                                    mt-5 grid grid-cols-2 gap-5
                                    md:mt-10 md:flex md:flex-row md:justify-between md:gap-10
                                "
                            >
                                {contact.map((item, index) => {
                                    const isLastCard = index === contact.length - 1;

                                    return (
                                        <div
                                            key={item.id}
                                            className={
                                                isLastCard
                                                    ? "col-span-2 md:col-span-1 md:flex-1"
                                                    : "md:flex-1"
                                            }
                                        >
                                            <ContactCard
                                                title={item.title}
                                                text={item.text}
                                                icon={item.icon}
                                                mobileRow={isLastCard}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        <div className="flex flex-col  gap-5 mt-10 w-full items-start justify-center">
                            <p className="font-[500] text-btn">ابحث عن الأدوية الموجودة في هذه الصيدلية </p>
                            <SearchInput label="ابحث عن دواء..." value= {userInput} onChange={(value) => setUserInput(value)}/>
                        </div>

                    </Card>
                </div>
            </div>

           
        </div>
    )
}
