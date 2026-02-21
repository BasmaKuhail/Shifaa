import Image, { StaticImageData } from "next/image";

type IconHolderProps = {
    icon: StaticImageData;
    isNotification?: boolean;
    width: number;
    height: number;
}
export default function IconHolder({icon, isNotification, width, height}:IconHolderProps){
    return(
        <div className="flex flex-row gap-4 bg-black-100 p-2 rounded-[9px] relative hover:bg-black-200 cursor-pointer">
            <Image src={icon} alt="Icon" width={width} height={height} className="rounded-full" />
            {isNotification && <div className="bg-red rounded-[4px] w-[15px] h-[15px] flex items-center justify-center absolute top-1 right-1">
                <p className="text-white text-xs font-medium">8</p>
                </div>}
        </div>
    )
}