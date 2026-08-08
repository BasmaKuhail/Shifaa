import Image from "next/image";
import MobileHeader from "../header/MobileHeader";
import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import homeBgImg from "@/public/images/homeBgImg.webp"
import SearchHome from "../home/search/Search";
import MedNotFoundC2A from "../searchMed.tsx/MedNotFound";
import SearchResultsContainer from "./SearchResults";
import MedCard from "../medicen/MedCard";


import Insulin from "@/public/icons/pharmacies/Insulin.png"
import no from "@/public/icons/pharmacies/no.png"
import Hydrocortisone from "@/public/icons/pharmacies/Hydrocortisone.png"
import Diphenhydramine from "@/public/icons/pharmacies/Diphenhydramine.png"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function Search (){
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [userInput, setUserInput] = useState<string>("")

    const router = useRouter();
    useEffect(()=>{
        if (!router.isReady) {
            return;
        }
        const userInputRoute = String(router.query.search_input);
        setUserInput(userInputRoute);
        console.log(userInputRoute)
        
    },[])
    return(
        <div className='w-full flex flex-col overflow-x-hidden'>
            <div className="bg-blue-100 relative inline-block ">
                {/* web view */}
                <Image
                    src={homeBgImg}
                    alt='home hero image'
                    width={610.77}
                    className='-mt-10 relative z-20 block pointer-events-none lg:pt-[50px] rotate-180 scale-y-[-1]'
                    loading="eager"
                    fetchPriority="high"
                />
                <div className="absolute inset-0 z-40 pt-[75px] hidden lg:block">
                    <div className="px-4 md:px-8 lg:px-20 xl:px-30 pt-4"><SecondaryHeader/></div>
                    
                    <div id="search" className='mt-20'>
                        <SearchHome />
                    </div>
                </div>
                {/* mobile view */}
                <div className="absolute inset-0 -top-full z-30 block lg:hidden w-full flex items-center justify-center">
                    <MobileHeader/>
                </div>
                <div id="search" className='relative z-30 -mt-10 block lg:hidden mb-40'>
                    <SearchHome userInputProp={userInput}/>
                </div>
                <div className="relative z-10 -mt-17 px-4 md:px-8 lg:px-20 xl:px-30 pt-4 pb-10">
                    <SearchResultsContainer>
                        <div  className={`mb-5 ${viewMode === "grid" ? "grid grid-cols-1 items-stretch gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-4"} min-h-[360px] w-full content-start`}>
                            <MedCard image={Insulin} medName="Insulin" isList={false} location={""}/>
                            <MedCard image={Hydrocortisone} medName="Hydrocortisone" isList={false} location={""}/>
                            <MedCard image={no} medName="Ibuprofen" isList={false} location={""}/>
                            <MedCard image={Diphenhydramine} medName="Diphenhydramine" isList={false} location={""}/>
                        </div> 
                        <MedNotFoundC2A/>
                    </SearchResultsContainer>
                   
                </div>
            </div>
        </div>
    )
}
