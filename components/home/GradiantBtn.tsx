import Image, { StaticImageData} from "next/image"
import arrowRight from "@/public/icons/error/arrowRight.svg"
type gradProps = {
    text?: string;
    image?: boolean;
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
                    <Image alt="send" src={arrowRight} className="rotate-180"/>
                ) : (
                    text
                )}
        </div>
    )
}
