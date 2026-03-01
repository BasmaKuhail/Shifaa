import search from "@/public/icons/search.svg"

import Image from "next/image";

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
    return(
        <div className="relative">
            <Image 
                alt=""
                width={15}
                src={search} 
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={handleSearch} />
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
                    top-1/2
                    -translate-y-1/2
                    h-[44px] md:h-[51px]
                    px-10
                    rounded-[30px]
                    bg-gradient-to-r
                    from-[#3E94B9]
                    to-[#04B6FF]
                    flex
                    items-center
                    justify-center
                    text-white
                    cursor-pointer
                    "
                onClick={()=> {}}>
                    ابدأ البحث
                
            </div>
            
        </div>
    )
}