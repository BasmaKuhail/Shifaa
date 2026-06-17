import arrowHeadR from "@/public/icons/switchToPharmacist/arrowHeadR.svg"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

type breadcrumbProps = {
    breadcrumbArr: {title:string, link:string}[]
}

export default function Breadcrumb({breadcrumbArr}:breadcrumbProps){
    const router = useRouter()
    // {console.log(breadcrumbArr)}
    return(
        
        <nav
            dir="rtl"
            aria-label="Breadcrumb"
            className="hidden md:flex text-sm  w-full "
        >
            
            <ol className="flex flex-row items-center gap-3 w-full">
                {breadcrumbArr.map((item, index) => {
                    const isCurrent = router.pathname === item.link

                    return (
                        <li key={index} className="flex items-center gap-3">
                            {isCurrent ? (
                                <span
                                    className="text-blue-1000 font-medium"
                                    aria-current="page"
                                >
                                    {item.title}
                                </span>
                            ) : (
                                <Link
                                    href={item.link}
                                    className="text-gray-500 hover:text-blue-1000 transition"
                                >
                                    {item.title}
                                </Link>
                            )}

                            {index !== breadcrumbArr.length - 1 && (
                                <Image
                                    src={arrowHeadR}
                                    alt="separator"
                                    className="rotate-180"
                                />
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}