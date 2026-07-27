import { StaticImageData } from "next/image";
import Icon from "../home/Icon";

export type ContactCardItem = {
    id?: number;
    icon: StaticImageData;
    title: string;
    text?: string;
    mobileRow?:boolean
}

export default function ContactCard({
    icon,
    title,
    text,
    mobileRow = false,
}: ContactCardItem) {
  return (
    <div
        className={`
            flex h-full w-full gap-5 rounded-[14px]
            border border-black-50 p-5 text-black-600
            ${
            mobileRow
                ? "flex-row items-start md:flex-col md:items-center lg:flex-row lg:items-start"
                : "flex-col items-center lg:flex-row lg:items-start"
            }
        `}
    >
        <Icon
            icon={icon}
            width={20}
            className="h-10 w-10 shrink-0 md:h-15 md:w-15"
        />

        <div
                className={`
                    flex w-full flex-col gap-2
                    ${
                        mobileRow
                        ? "items-start md:items-center lg:items-start"
                        : "items-center lg:items-start"
                    }
                `}
        >
            <h3 className="text-inpt font-bold leading-none md:text-btn">
                {title}
            </h3>

            <div
                className={`
                    text-inpt
                    ${
                    mobileRow
                        ? "text-start md:text-center lg:text-start"
                        : "text-center lg:text-start"
                    }
                `}
            >
                <p>{text || "-"}</p>
            </div>
        </div>
    </div>
  );
}