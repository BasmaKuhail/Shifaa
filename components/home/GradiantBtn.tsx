import Image, { StaticImageData} from "next/image"

type gradProps = {
    text?: string;
    image?: StaticImageData;
    onClick: () => void;
    px:number
}
export default function GradientBrn({text,image, onClick,px}:gradProps){
    return(
        <div
            className=
            {`flex items-center text-center justify-center
                h-full
                w-fit
                px-${px}
                rounded-[30px]
                bg-gradient-to-b
                from-[#3E94B9]
                to-[#04B6FF]
                flex                    
                items-center
                justify-center
                text-white
                cursor-pointer
                text-inpt
                lg:text-btn
                md:text-btn
                
                hover:bg-gradient-to-b                    
                hover:from-[#356A82]
                hover:to-[#1689B8]`}
                
            onClick={onClick}>
                {image ? (
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>                
                ) : (
                    text
                )}
        </div>
    )
}