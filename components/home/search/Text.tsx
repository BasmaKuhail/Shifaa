import heartBeat from "@/public/icons/heartBeat.svg"

import Image from "next/image";
import HeaderText from "../HeaderText";
import SubHeader from "../SubHeader";

type SearchTextProp ={
    intro: string,
    titleBlack: string,
    titleBlue: string,
    sentence: string

}
export default function SearchText({intro, titleBlack, titleBlue, sentence}: SearchTextProp){
    return(
        <div dir="rtl" className="flex flex-col gap-2">
            <nav className="flex flex-row center gap-2 flex"> 
                <Image src={heartBeat} width={19} height={15} alt="heart beat"/>
                <p className="text-black-500 text-btn">{intro}</p>
            </nav>
            
            <nav className="flex flex-row center gap-1">
                <HeaderText text={titleBlack} isBlue={false}/>
                <HeaderText text={titleBlue} isBlue={true}/>
            </nav>
            <nav className="flex flex-row" >
                <SubHeader text={sentence}/>
            </nav>
            
            
        </div>
    )

}