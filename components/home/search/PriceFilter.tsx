import { Dispatch, SetStateAction, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import Image from "next/image";
import filterArrowDown from "@/public/icons/filterArrowDown.svg"
import MinimumDistanceSlider from "./PriceSlider";


type filterProps ={
    title: string,
    dropDownOpened: string | null;
    setDropDownOpened:Dispatch<SetStateAction<string | null>>,
    min:number,
    max:number,
    setMin:Dispatch<SetStateAction<number>>,
    setMax:Dispatch<SetStateAction<number>>,
}
const MIN_PRICE = 1;
const MAX_PRICE = 200;


export default function Price({min, max, setMin, setMax, title,dropDownOpened, setDropDownOpened}:filterProps){
    const handleClick = () =>{
        setDropDownOpened((prev) => (prev === title ? null : title));
        console.log("title" , dropDownOpened)

    }
    const handleMinChange = (value: number) => {
    const clampedValue = Math.max(
      MIN_PRICE,
      Math.min(value, max),
    );

    setMin(clampedValue);
  };

  const handleMaxChange = (value: number) => {
    const clampedValue = Math.min(
      MAX_PRICE,
      Math.max(value, min),
    );

    setMax(clampedValue);
  };

  const handleSliderChange = (
    newMin: number,
    newMax: number,
  ) => {
    setMin(newMin);
    setMax(newMax);
  };

const handleReset = () => {
  setMin(MIN_PRICE);
  setMax(MAX_PRICE);
};
    return(
        <div dir="ltr" className="relative flex flex-col">
            <div 
                className= {`group  
                    p-2 px-4 rounded-[30px] flex flex-row-reverse gap-3 cursor-pointer w-fit
                    ${(dropDownOpened === title)   ? "bg-gradient-to-r from-[#329CCB] to-[#668DCA] text-white" : "bg-white text-black-600"}
                    hover:bg-gradient-to-r
                    hover:from-[#329CCB]
                    hover:to-[#668DCA]
                    hover:text-white
                    transition duration-200`
                }
                onClick={handleClick}
            >
                <Image
                    src={filterArrowDown} 
                    width={9} 
                    alt={""} 
                    className= {`transition duration-200
                        ${(dropDownOpened === title) ? "brightness-0 invert": ""}
                        group-hover:brightness-0
                        group-hover:invert`}
                />
                    <p className="text-inpt">{title}</p>
                      
            </div>
            <div className="absolute top-full right-0">
                {(dropDownOpened === title) && 
                    <DropDownMenu title="السعر" action={<button onClick={()=> handleReset()} className="hover:underline text-xs">اعادة الضبط</button>}>
                        <div className="flex flex-row w-full items-center justify-between gap-5">
                            <div className="flex flex-row gap-1 items-center text-black-500">
                                <input 
                                    className="w-[90px] h-[35px] p-2 border border-black-200 rounded-full" 
                                    type="number"
                                    value={max}
                                    onChange={(e) =>
                                        handleMaxChange(Number(e.target.value))
                                    }
                                    name="max"
                                    min={min} 
                                    max={MAX_PRICE}
                                />₪
                            </div>
                            <div className="flex flex-row gap-1 items-center text-black-500">
                                <input 
                                    className="w-[90px] h-[35px] p-2 border border-black-200 rounded-full" 
                                    type="number"
                                    value={min}
                                    onChange={(e) =>
                                        handleMinChange(Number(e.target.value))
                                    }
                                    name="min"
                                    min={MIN_PRICE} 
                                    max={max}
                                />₪
                            </div>
                        </div>
                        <MinimumDistanceSlider min={min} max={max} onChange={handleSliderChange}/>
                    </DropDownMenu>
                }
            </div>
        </div>
    )
}