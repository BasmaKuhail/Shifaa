import heartBeat from "@/public/icons/heartBeat.svg"

import Image from "next/image";

type SearchTextProp ={
    intro: string,
    titleBlack: string,
    titleBlue: string,
    sentence: string

}
export default function SearchText({intro, titleBlack, titleBlue, sentence}: SearchTextProp){
    return(
        <div className="flex flex-col gap-2">
            <nav className="flex flex-row-reverse center gap-2 flex"> 
                <Image src={heartBeat} width={19} height={15} alt="heart beat"/>
                <p className="text-black-500 text-btn">{intro}</p>
            </nav>
            
            <nav className="flex flex-row-reverse center gap-1 font-bold text-47px">
                <p>{titleBlack}</p>
                <p 
                    className="
                        bg-gradient-to-r
                        from-[#3E94B9]
                        to-[#04B6FF]
                        bg-clip-text
                        text-transparent"
                    >{titleBlue}</p>
            </nav>
            <nav className="flex flex-row" ><p className="font-semibold text-21px">{sentence}</p></nav>
            
            
        </div>
    )

}