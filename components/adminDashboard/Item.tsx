import { StaticImageData } from "next/image";
import Icon from "../home/Icon";

type ItemProps = {
    item:{id:number, title:string, icon:StaticImageData, number?:number, date?:string}
}
export default function Item({item}:ItemProps){
    return(
        <div className="flex w-full flex-row items-center justify-start gap-4 md:justify-center">
            <Icon icon={item.icon} width={50}/>
            <div className="flex flex-col gap-2 text-right md:gap-3">
                <p className="text-btn">{item.title}</p>
                <p className="font-[500] text-27px">{item.number || item.date}</p>
            </div>
        </div>
    )
}
