import { useRouter } from "next/router";
import Card from "../PharmacyInfo/CardContainer";
import PetrolBtn from "../PharmacyInfo/invitePopup/PetrolBtn";
import { useState } from "react";
import Row from "../PharmacyInfo/pharmacistsTable/Row";
import add from "@/public/icons/medicine/add.svg"
import search from "@/public/icons/medicine/search.svg"
import Image from "next/image";
import InteractMed from "./interactMed";

import ExportXLS from "@/public/icons/pharmInfo/exportXLS";
export default function Medicines() {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");
    return(
        <div className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <p className="font-semibold text-27px">إدارة أدوية الصيدلية</p>
            <Card 
                title="أدوية الصيدلية"
                scrollable  
                actions= { 
                    <div className="flex flex-row justify-between items-center gap-5">
                        <PetrolBtn
                            text="إضافة دواء"
                            icon={add}
                            onClick={() => router.push("/pharmacy-dashboard/add-medicine")}
                        />
                        <ExportXLS className="text-black-500 w-10 cursor-pointer hover:text-blue-1000"/>
                        {/* put the search icon and the input field in a flex row with gap-2 */}
                        <div className="relative flex flex-row items-center gap-2">
                            <Image src={search} alt="search" className="fixed mr-2 z-10 cursor-pointer"/>
                            <input
                                value={searchInput}
                                type="search"
                                placeholder="ابحث عند دواء"
                                onChange={(event) => {
                                    setSearchInput(event.target.value);
                                }}
                                className="relative h-[40px] text-black-500 rounded-[12px] bg-black-100 px-10 text-sm text-right text-black-500 focus:outline-none"
                            />
                        </div>
                    </div>
                }
            >
                <div className="flex w-full flex-col mt-5">
                        <Row
                            isFirst
                            data={{
                                medScientificName: "الاسم العلمي",
                                tradeName: "الاسم التجاري",
                                price: "سعر",
                                dosageForm: "شكل الجرعة",
                                availability: "توافر",
                                interact: "التفاعل",
                            }}
                            columnClassNames={{
                                medScientificName: "flex-2",
                                tradeName: "flex-2",
                                price: "flex-1",
                                dosageForm: "flex-1",
                                availability: "flex-1",
                                interact: "flex-1",
                            }}
                        />
                        <div
                            key={1}
                            className="text-inpt flex w-full items-center border-t border-gray-200"
                        >
                            <Row
                                data={{
                                    medScientificName: "باراسيتامول",
                                    tradeName: "باراسيتامول",
                                    price: "10.00",
                                    dosageForm: "قرص",
                                    availability: "متوفر",
                                    interact: <InteractMed id={1} name="باراسيتامول"/>,
                                }}
                            columnClassNames={{
                                medScientificName: "flex-2",
                                tradeName: "flex-2",
                                price: "flex-1",
                                dosageForm: "flex-1",
                                availability: "flex-1",
                                interact: "flex-1",
                            }}
                            />
                        </div>
                </div>
            </Card>
        </div>
    )
}