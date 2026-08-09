import Image, { StaticImageData } from "next/image"
import pharm from "@/public/icons/pharmacies/pharm.svg"
import loc from "@/public/icons/pharmacies/loc.svg"
import { getDosageFormImage } from "@/config/medicationFormImages"
type medCardProps ={
    price:number | null,
    medName:string,
    image:string | undefined | null,
    isList:boolean,
    location:string,
    availablity:boolean,
    dosageFprm:string
}

export default function MedCard({dosageFprm, availablity, price, image, medName, isList, location}:medCardProps){
    const imageToDisplay =
        image ?? getDosageFormImage(dosageFprm);
    return(
        <div className={`flex ${isList? "flex-row":"flex-col items-center"} border border-black-50 rounded-[10px]`}>
            <Image src={imageToDisplay} alt="" className="h-[200px]" height={200} width={200}/>
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
                <div className="flex flex-row gap-3 items-center justify-center">
                    <p className="text-inpt md:text-btn text-black-500">{price}₪</p>
                    <div className="flex flex-row gap-1 items-center justify-center">
                        <div className={`${availablity? "bg-online" : "bg-red"} rounded-full p-1.5`}/>
                        <p className="text-inpt md:text-btn text-black-500">{availablity? "متوفر" : "غير متوفر"}</p>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}