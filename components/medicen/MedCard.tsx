import Image, { StaticImageData } from "next/image"
import pharm from "@/public/icons/pharmacies/pharm.svg"
import loc from "@/public/icons/pharmacies/loc.svg"
import med from "@/public/icons/pharmacies/med.png"
type medCardProps ={
    medName:string;
    image:StaticImageData,
    isList:boolean;
    location:string
}

export default function MedCard({image, medName, isList, location}:medCardProps){
    return(
        <div className={`flex ${isList? "flex-row":"flex-col items-center"} border border-black-50 rounded-[10px]`}>
            <Image src={image} alt="" className="h-[200px]"/>
            <div className={`flex w-full ${isList? "items-start px-5 rounded-l-[10px]":"items-center rounded-b-[10px] px-10 py-5 text-center"} py-2  bg-black-10 gap-2 flex-col`}>
                <p className="text-btn md:text-21px font-[500]">{medName}</p>
                <div className="flex flex-row gap-2 items-start">
                    <Image src={pharm} alt=""/>
                    <p className="text-inpt md:text-btn text-black-500">صيدلية البسمة</p>
                </div>
                <div className="flex flex-row gap-2 items-start">
                    <Image src={loc} alt=""/>
                    <p className="text-inpt md:text-btn text-black-500">{location}</p>
                </div>
            </div>

        </div>
    )
}