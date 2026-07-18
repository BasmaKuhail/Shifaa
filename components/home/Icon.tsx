import Image, { StaticImageData } from "next/image";

type iconProps = {
    icon: StaticImageData,
    width: number,
    className?: string,
}
export default function Icon ({icon, width, className = ""}:iconProps){
    return(
        <div 
            className={`
                p-3
                aspect-square
                rounded-full 
                bg-gradient-to-r
                from-[#3E94B9]
                to-[#04B6FF]
                flex
                items-center
                justify-center
                text-white
                ${className}`}
        >
            <Image src={icon} alt="Icon" width={width}/>
        </div>
    )
}
