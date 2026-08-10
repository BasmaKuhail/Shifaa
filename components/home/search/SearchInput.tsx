import search from "@/public/icons/search.svg"
import fillter from "@/public/icons/fillterBlue.svg"
import arrow from "@/public/icons/arrowLeft.svg"

import Image from "next/image";
import GradientBtn from "../GradiantBtn";
import { useState } from "react";
import MobileFilter from "./mobileFilter/MobileFilter";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

type SearchInputProps = {
    isHome?:boolean;
    label: string;
    value: string;
    onChange: (value: string) => void;
    dosageForm?:string | null,
    setSelectedDosageForm?: Dispatch<SetStateAction<string>>
}

function handleSearch (){
    console.log("search")
    return;
}
export default function SearchInput({
    isHome=true,
    label,
    value,
    onChange,
    dosageForm,
    setSelectedDosageForm
}:SearchInputProps){
    const [isFilterOpened, setIsFilterOpened] = useState(false);

    const router = useRouter()

    const handleSearchClick = () => {
        if(value.trim() === ""){
            return
        }
        if (isHome){
            const query = new URLSearchParams();
            query.set("search_input", value.trim());
            if (dosageForm) {
                query.set("dosage_form", dosageForm);
            }

            void router.push(`/search-medicine?${query.toString()}`);
        }
            // router.push(`/search-medicine?search_input=${encodeURIComponent(String(value))}&dosageForm=${encodeURIComponent(String(dosageForm))}`)
    }
    return(<>
        <div dir="rtl" className="relative w-full">
            <Image 
                alt=""
                width={15}
                src={search} 
                className="hidden lg:block md:block absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={handleSearch} />
            <div onClick={() => setIsFilterOpened(!isFilterOpened)}>
                <Image 
                    alt=""
                    src={fillter} 
                    className="lg:hidden md:hidden block absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                    onClick={handleSearch} />
             </div>
             
            <input 
                onChange={(e) => {onChange(e.target.value)} }
                type="text" 
                value={value}
                placeholder={label}
                className='w-full
                    h-[52px] md:h-[55px]
                    bg-white
                    border border-black-200
                    rounded-[30px]
                    text-right
                    pr-12 
                    pl-32
                    focus:outline-none
                    text-sm
                    text-black-500
                    '
            />
            <div 
                className="
                    absolute
                    left-2
                    lg:left-1
                    md:left-2
                    top-7
                    lg:top-1/2
                    md:top-1/2
                    -translate-y-1/2
                    w-auto
                    h-[44px] md:h-[49px]"
            >
                <div className="hidden lg:block md:block  h-full">
                    <GradientBtn 
                    text="ابدأ البحث" 
                        onClick={handleSearchClick} px={10} rounded="30"/>
                </div>
                <div className="block lg:hidden md:hidden h-[90%]">
                    <GradientBtn image={arrow} onClick={handleSearchClick} px={5} rounded="30"/>
                </div>
            </div>
            
            
        </div>
        {isFilterOpened && setSelectedDosageForm && (
            <MobileFilter
                isFilterOpened={isFilterOpened}
                setIsFilterOpened={setIsFilterOpened}
                dosage={dosageForm ?? ""}
                setSelectedDosageForm={setSelectedDosageForm}
            />
        )}</>
    )
}
