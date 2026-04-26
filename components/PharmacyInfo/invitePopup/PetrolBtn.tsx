import Image from "next/image";

export default function PetrolBtn({text, icon, onClick}: {text: string, icon?: any, onClick: () => void}) {
    return (
        <button
            dir="rtl"
            onClick={onClick}
            className="w-fit px-5 bg-blue-1000 rounded-[12px] text-white flex flex-row items-center justify-center gap-2 px-4 py-2 hover:bg-blue-1100 transition-colors duration-300 cursor-pointer" 
        >
            {icon && <Image src={icon} alt="" />}
            <p className="text-inpt font-[500]">{text}</p>
        </button>
    );
}