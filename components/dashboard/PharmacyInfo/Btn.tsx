import Image, { StaticImageData } from "next/image";

type BtnProps = {
    text: string;
    icon?: StaticImageData;
    onClick: () => void;
}
export default function Btn({ text, icon, onClick }: BtnProps) {
    return (
        <button
            dir="rtl"
            onClick={onClick}
            className="bg-white border border-black-200 rounded-[10px] flex flex-row items-center justify-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-300 cursor-pointer" 
        >
            {icon && <Image src={icon} alt="" />}
            <p className="text-inpt font-bold">{text}</p>
        </button>
    );
}