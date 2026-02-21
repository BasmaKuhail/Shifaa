import Image, { StaticImageData } from "next/image";

type ProfileProps = {
    imgUrl: StaticImageData;
    name: string;
    position: string;
}
export default function Profile({imgUrl, name, position}:ProfileProps){
    return(
        <div className="flex flex-row gap-2 mr-[12px]">
            <div className="relative">
                <div className="flex flex-col cursor-pointer">
                    <Image 
                        src={imgUrl} 
                        alt="Profile" 
                        width={40}
                        height={40}
                        className="rounded-[9px] m-[2px]"
                    />
                </div>
                <div className="bg-online p-1 w-[11px] h-[11px] rounded-full absolute right-0 bottom-0"></div>
            </div>
            <div className="flex flex-col gap-0">
                <p className="text-input">{name}</p>
                <p className="text-12px text-black-500">{position}</p>
            </div>
        </div>
    )
}