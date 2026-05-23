import Image from "next/image";
import logo from "@/public/icons/logo.svg";

export default function SecHeadSkel ({arrLength, includeBtn} : {arrLength: number, includeBtn: boolean}){
    return(
        <div
            dir="rtl"
            className="flex flex-row items-center justify-between w-full gap-8 animate-pulse"
            >
            {/* Logo */}
            <Image src={logo} alt="Logo" className="m-[2px] " />

            {/* Nav items */}
            <div className="flex flex-row gap-8 items-center">
                {Array.from({ length: arrLength }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 w-20 bg-gray-200 rounded-md"
                ></div>
                ))}
            </div>

            {/* Button */}
            {includeBtn ? (
                <div className="h-11 w-37 bg-gray-200 rounded-full"></div>
            ) : (
                <div className="h-10 w-32 invisible"></div>
            )}
    </div>
    )
}