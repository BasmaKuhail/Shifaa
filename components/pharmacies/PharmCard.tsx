import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

import pharm from "@/public/images/pharm-info/deafultPharm.png";
import location from "@/public/icons/pharmacy-card/location.svg";
import contact from "@/public/icons/pharmacy-card/contact.svg";
import verified from "@/public/icons/pharmacies/verified.svg";

import { PharmacyApiResponse } from "@/services/pharmacy";

type BtnProps = {
    image?: StaticImageData;
    text: string;
};

const Btn = ({ image, text }: BtnProps) => {
    return (
        <div
            className={`
                flex cursor-pointer flex-row items-center gap-3 rounded-[10px]
                border border-black-50 bg-blue-100 p-2 px-5
                font-bold text-blue-1000 transition-colors duration-300 ease-in-out
                hover:bg-blue-200
                ${!image ? "md:px-10" : ""}
            `}
        >
            {image && <Image src={image} alt="" />}
            <p className="text-sm">{text}</p>
        </div>
    );
};

type PharmCardProps = {
    isLcpCandidate:boolean;
    pharmacy: PharmacyApiResponse;
    isList?: boolean;
};

export default function PharmCard({
    isLcpCandidate,
    pharmacy,
    isList = false,
}: PharmCardProps) {
    const router = useRouter();

    const logoSource =
        pharmacy.attachments?.[1]?.url ??
        pharmacy.attachments?.[0]?.url ??
        pharm;

    const handleCardClick = () => {
        void router.push(`/pharmacies/pharmacy-details/${pharmacy.id}`);
    };

    return (
        <div
            className={`
                h-full w-full cursor-pointer items-start gap-5 rounded-[14px] bg-white
                transition-shadow duration-300 ease-in-out hover:shadow-lg
                ${
                isList
                    ? "flex flex-row p-3"
                    : "flex flex-col justify-start p-1 pb-7"
                }
            `}
            onClick={handleCardClick}
        >
            <Image
                src={logoSource}
                alt={`${pharmacy.name} logo`}
                width={600}
                height={400}
                loading={isLcpCandidate ? "eager" : "lazy"}
                fetchPriority={isLcpCandidate ? "high" : "auto"}
                className={`
                    rounded-[14px] object-cover
                    ${
                    isList
                        ? "h-40 w-36 shrink-0"
                        : "aspect-[3/2] w-full"
                    }
                `}
            />

            <div
                className={
                    isList
                        ? "flex min-w-0 flex-1 flex-col"
                        : "flex w-full flex-1 flex-col px-3"
                }
            >
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex min-h-14 flex-row items-start gap-3">
                        <p className="line-clamp-2 text-lg font-semibold">
                            {pharmacy.name}
                        </p>

                        <Image
                            src={verified}
                            alt="Verified pharmacy"
                            width={20}
                            height={20}
                            className="mt-1 shrink-0"
                        />
                    </div>

                    <div className="flex min-h-10 flex-row items-start gap-2">
                        <Image
                            src={location}
                            alt=""
                            width={12}
                            className="mt-1 shrink-0"
                        />

                        <p className="line-clamp-2 text-sm text-black-500">
                            {pharmacy.address}
                        </p>
                    </div>

                    <div
                        className={`
                            mt-auto flex flex-row items-center
                            ${isList ? "gap-5" : "justify-between gap-2"}
                        `}
                    >
                        <Btn text="عرض" />
                        <Btn image={contact} text="تواصل" />
                    </div>
                </div>
            </div>
        </div>
    );
}