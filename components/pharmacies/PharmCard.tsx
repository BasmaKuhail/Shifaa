import Image, { StaticImageData } from "next/image";

import pharm from "@/public/images/pharm-info/deafultPharm.png"
import location from "@/public/icons/pharmacy-card/location.svg"
import view from "@/public/icons/pharmacy-card/view.svg"
import contact from "@/public/icons/pharmacy-card/contact.svg"
import { PharmacyApiResponse } from "@/services/pharmacy";
import { useRouter } from "next/router";

const Btn = ({image, text}: {image:StaticImageData, text:string}) => {
    return(
        <div className="flex flex-row px-5 gap-3 bg-blue-100 rounded-[10px] p-2 hover:bg-blue-200 transition-colors duration-300 ease-in-out cursor-pointer">
            <Image src={image} alt=""/>
            <p className="text-sm">{text}</p>
        </div>
    )
}
export default function PharmCard({
    pharmacy,
    isList = false,
}: {
    pharmacy: PharmacyApiResponse;
    isList?: boolean;
}){
    const logoSource =
        pharmacy.attachments?.[1]?.url ??
        pharmacy.attachments?.[0]?.url ??
        pharm;

    const route = useRouter();
    return(
        <div className={`
            bg-white rounded-[14px] cursor-pointer 
            hover:shadow-lg transition-shadow duration-300 ease-in-out 
            w-full ${isList ? "flex flex-row items-center gap-5 p-3" : "flex flex-col items-center justify-center gap-5 pb-7 p-1"}`}
            onClick={() => route.push(`/pharmacies/pharmacy-details/${pharmacy.id}`)}
      
        >
            {/* Apply a blue filter and reduce contrast using CSS styles */}
            <div className={`relative overflow-hidden rounded-[14px] ${isList ? "h-40 w-36 shrink-0" : "h-[190px] w-full"}`}>
                <Image
                    src={logoSource}
                    alt={`${pharmacy.name} logo`}
                    fill
                    sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        (max-width: 1280px) 33vw,
                        25vw
                    "
                    className="object-cover"
                />

                <div className="absolute inset-0 rounded-[14px] bg-blue-200 opacity-50" />
            </div>
            <div className={isList ? "flex min-w-0 flex-1 flex-col items-start gap-3" : "contents"}>
            <p className="mt-2 text-lg font-semibold">{pharmacy.name}</p>
            <div className="flex flex-row gap-2 items-center justify-center text-center">
                <Image src={location} alt="" width={15}/>
                <p className="text-black-500 text-sm">{pharmacy.address}</p>
            </div>
            <div className="flex flex-row items-center justify-between gap-2 items-center">
                <Btn image={view} text="عرض"/>
                <Btn image={contact} text="تواصل"/>
            </div>
            </div>
        </div>
    )
}
