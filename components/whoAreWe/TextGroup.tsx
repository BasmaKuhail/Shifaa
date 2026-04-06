import heartBeat from "@/public/icons/heartBeat.svg"

import Image from "next/image";
import HeaderText from "../home/HeaderText";
import SubHeader from "../home/SubHeader";

type SearchTextProp ={
    titleBlack: string,
    titleBlue: string,
    sentence: string

}
export default function AboutText({titleBlack, titleBlue, sentence}: SearchTextProp){
    return(
        <div dir="rtl" className="flex flex-col gap-2 items-center justify-center">
            
            <nav className="flex flex-row center gap-1">
                <HeaderText text={titleBlack} color="black"/>
                <HeaderText text={titleBlue} color="blue"/>
            </nav>
            <nav className="flex flex-row" >
                <SubHeader text={sentence} color="black"/>
            </nav>
            
            
        </div>
    )

}