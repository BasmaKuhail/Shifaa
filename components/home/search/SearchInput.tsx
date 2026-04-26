import search from "@/public/icons/search.svg"
import fillter from "@/public/icons/fillterBlue.svg"
import arrow from "@/public/icons/arrowLeft.svg"

import Image from "next/image";
import GradientBtn from "../GradiantBtn";
import { useState } from "react";
import MobileFilter from "./mobileFilter/MobileFilter";

type SearchInputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

function handleSearch (){
    console.log("search")
    return;
}
export default function SearchInput({label, value, onChange}:SearchInputProps){
    const [isFilterOpened, setIsFilterOpened] = useState(false);
    return(<>
        <div dir="rtl" className="relative">
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
                    h-[52px] md:h-[65px]
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
                    lg:left-2
                    md:left-2
                    top-7
                    lg:top-1/2
                    md:top-1/2
                    -translate-y-1/2
                    w-auto
                    h-[44px] md:h-[51px]"
            >
                <div className="hidden lg:block md:block  h-full">
                    <GradientBtn text="ابدأ البحث" onClick={() => {}} px={10} rounded="30"/>
                </div>
                <div className="block lg:hidden md:hidden h-[90%]">
                    <GradientBtn image={arrow} onClick={() => {}} px={5} rounded="30"/>
                </div>

            </div>
            
            
        </div>
        {isFilterOpened && <MobileFilter isFilterOpened={isFilterOpened} setIsFilterOpened={setIsFilterOpened}/>}</>
    )
}