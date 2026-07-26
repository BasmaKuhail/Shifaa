import Image, { StaticImageData } from "next/image";

type BtnProps = {
    isbloacked?:boolean;
    text: string;
    icon?: StaticImageData;
    onClick: () => void;
}
export default function Btn({ isbloacked=false, text, icon, onClick }: BtnProps) {
    return (
        <button
            dir="rtl"
            onClick={onClick}
            className={`${isbloacked? "border-black-50 cursor-not-allowed" : "border-black-200 cursor-pointer hover:bg-gray-100 transition-colors duration-300"} bg-white border rounded-[10px] flex flex-row items-center justify-center gap-2 px-4 py-2  `}
            disabled={isbloacked}
        >
            {icon && !isbloacked && <Image src={icon} alt="" className="text-black-50" />}
            <p className={`${isbloacked? "text-black-50" : "text-black-700 cursor-pointer"} text-inpt font-bold`}>{text}</p>
        </button>
    );
}