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
    setSelectedDosageForm?: Dispatch<SetStateAction<string>>,
    min?:number,
    max?:number,
    setMin?:Dispatch<SetStateAction<number>>,
    setMax?:Dispatch<SetStateAction<number>>,
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
    setSelectedDosageForm,
    min,
    max,
    setMin,
    setMax
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
            query.set("min_price", String(min));
            query.set("max_price", String(max));
            
            void router.push(`/search-medicine?${query.toString()}`);
            
        }
    }
    return(<>
        <div dir="rtl" className="relative w-full">
            <Image 
                alt=""
                width={15}
                src={search} 
                className="hidden lg:block md:block absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={handleSearchClick} />
            <button
                type="button"
                aria-label="Open filters"
                onClick={() => setIsFilterOpened((opened) => !opened)}
                className="absolute right-5 top-1/2 z-10 block -translate-y-1/2 cursor-pointer lg:hidden md:hidden"
            >
                <Image 
                    alt=""
                    src={fillter} 
                />
            </button>
             
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
        {isFilterOpened && setSelectedDosageForm && setMin && setMax && (
            <MobileFilter
                setIsFilterOpened={setIsFilterOpened}
                dosage={dosageForm ?? ""}
                setSelectedDosageForm={setSelectedDosageForm}
                min={min ?? 1}
                setMin={setMin}
                max={max?? 200}
                setMax={setMax}
            />
        )}</>
    )
}
