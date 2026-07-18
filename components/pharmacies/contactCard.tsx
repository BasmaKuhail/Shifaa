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
        <div className="relative mt-11 flex w-full flex-col items-center rounded-sm bg-blue-100 px-6 pb-8 pt-16 text-center text-black-600">
            <div className="absolute -top-11 rounded-full border-4 border-white">
                <Icon icon={icon} width={34} className="h-15 w-15 md:h-20 md:w-20"/>
            </div>

            <h3 className="text-21px md:text-27px font-bold leading-none">
                {title}
            </h3>

            <div className="mt-4 flex min-h-[48px] flex-col items-center justify-center text-btn leading-5">
                <p>{text || "-"}</p>
            </div>
        </div>
    )

}
