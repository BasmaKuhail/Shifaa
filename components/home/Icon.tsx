import Image, { StaticImageData } from "next/image";

type iconProps = {
    icon: StaticImageData,
    width: number,
}
export default function Icon ({icon, width}:iconProps){
    return(
        <div className="
                    w-20
                    h-20
                    rounded-full 
                    bg-gradient-to-r
                    from-[#3E94B9]
                    to-[#04B6FF]
                    flex
                    items-center
                    justify-center
                    text-white"
        >
            <Image src={icon} alt="Icon" width={width}/>
        </div>
    )
}