import Image, { StaticImageData} from "next/image"

type gradProps = {
    text?: string;
    image?: StaticImageData;
    onClick: () => void;
    px:number;
    rounded?:string;
    w?:string
}
export default function GradientBtn({text,image, onClick,px, rounded="30", w="fit"}:gradProps){
    return(
        <div
            style={{ borderRadius: `${rounded}px` }}
            className=
            {`flex items-center text-center justify-center
                h-full
                w-${w}
                py-2
                px-${px}
                rounded-${rounded}
                bg-gradient-to-r
                from-[#329CCB]
                to-[#668DCA]
                flex                    
                items-center
                justify-center
                text-white
                cursor-pointer
                text-inpt
                lg:text-btn
                md:text-btn
                
                hover:bg-gradient-to-r
                hover:from-[#329CCB]
                hover:to-[#668DCA]`}
                
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
