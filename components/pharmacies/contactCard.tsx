import { StaticImageData } from "next/image";
import Icon from "../home/Icon";

export type ContactCardItem = {
    id?: number;
    icon: StaticImageData;
    title: string;
    text?: string;
}

export default function ContactCard({
    icon,
    title,
    text,
}: ContactCardItem){
    return(
        <div className="flex p-5 gap-5 w-full flex-row items-start rounded-[14px] border border-black-50 text-black-600">
            <Icon icon={icon} width={20} className="h-10 w-10 md:h-15 md:w-15"/>
            <div className="flex flex-col gap-2 w-full items-start justify-start ">
                <h3 className="text-inpt md:text-btn font-bold leading-none">
                    {title}
                </h3>
                <div className="text-inpt text-start">
                    <p>{text || "-"}</p>
                </div> 
            </div>
            
        </div>
    )

}
