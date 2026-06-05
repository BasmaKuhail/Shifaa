import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import bg from "@/public/images/errors/bg.svg"
import arrow from "@/public/icons/error/arrowRight.svg"
export default function ErrorContatiner ({image, title, message}:{image:StaticImageData, title:string, message:string}){
    return(
        <div dir="rtl" className="flex flex-col items-center justify-center w-full min-h-screen p-10 md:p-0">
            <Image src={image} alt="Error 403"/>
            <Image src={bg} alt="Error Background" className="absolute inset-0 z-[-1] h-full"/>
            <div className="flex flex-col gap-1 items-center justify-center">
                <p className="font-bold text-24px md:text-64px text-center">{title}</p>
                <p className="font-[500] text-inpt md:text-21px text-center">{message}</p>
            </div>

            <Link
                href="/"
                className=" inline-block rounded-full bg-blue-1000 text-btn px-4 py-2 md:px-6 md:py-3 text-white mt-5 hover:bg-blue-500 transition ease-out"
            >
                <div className="flex flex-row gap-2 items-center">
                    العودة للرئيسية
                    <Image src={arrow} alt="" className="rotate-180"/>
                </div>

            </Link>
        </div>
    )
}