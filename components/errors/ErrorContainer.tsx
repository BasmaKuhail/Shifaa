import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import arrow from "@/public/icons/error/arrowRight.svg"
export default function ErrorContatiner ({image, error, message}:{image:StaticImageData, error:number, message:string}){
    return(
        <div dir="rtl" className="flex flex-col items-center justify-center w-full min-h-screen gap-5">
            <Image src={image} alt="Error 403"/>
            <div className="flex flex-col gap-1 items-center justify-center">
                <p className="font-bold text-64px">خطأ {error}</p>
                <p className="font-[500] text-21px">{message}</p>
            </div>

            <Link
                href="/"
                className=" inline-block rounded-full bg-blue-1000 px-6 py-3 text-white mt-5 hover:bg-blue-500 transition ease-out"
            >
                <div className="flex flex-row gap-2">
                    العودة للرئيسية
                    <Image src={arrow} alt="" className="rotate-180"/>
                </div>

            </Link>
        </div>
    )
}