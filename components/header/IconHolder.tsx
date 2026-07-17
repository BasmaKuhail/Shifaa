import Image, { StaticImageData } from "next/image";

type IconHolderProps = {
    icon: StaticImageData;
    isNotification?: boolean;
    width: number;
    height: number;
    notiCount?:number;
    bg?:string;
}
export default function IconHolder({icon, isNotification, width, height, notiCount, bg="black-100"}:IconHolderProps){
    return(
        <div className={`bg-${bg} flex flex-row gap-4 p-2 rounded-[9px] relative hover:bg-black-200 cursor-pointer transition duration-300 ease-in-out`}>
            <Image src={icon} alt="Icon" width={width} height={height} className="rounded-full" />
            {isNotification && (notiCount ?? 0) > 0 && <div className="bg-red rounded-[4px] min-w-[15px] h-[15px] px-1 flex items-center justify-center absolute top-1 right-1">
                <p className="text-white text-xs font-medium">{(notiCount ?? 0) > 99 ? "99+" : notiCount}</p>
                </div>}
        </div>
    )
}
