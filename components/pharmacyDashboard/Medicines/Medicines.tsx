import { useRouter } from "next/router";
import Card from "../PharmacyInfo/CardContainer";
import PetrolBtn from "../PharmacyInfo/invitePopup/PetrolBtn";
import { useContext, useEffect, useState } from "react";
import Row from "../PharmacyInfo/pharmacistsTable/Row";
import add from "@/public/icons/medicine/add.svg"
import search from "@/public/icons/medicine/search.svg"
import Image from "next/image";
import InteractMed from "./interactMed";

import ExportXLS from "@/public/icons/pharmInfo/exportXLS";
import { getPharmacyMedicines, Medicine } from "@/services/medication";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";
export default function Medicines() {
    const router = useRouter();
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loadingMed, setLoadingMed] = useState(false);
    const [errorMed, setErrorMed] = useState(null);

    const [searchInput, setSearchInput] = useState("");
    const { pharmacy, loading } = useContext(PharmacyContext);
    useEffect(() => {
        const fetchMedicines = async () => {
            setLoadingMed(true);
            if(!loading && pharmacy) {
                try {
                    const response = await getPharmacyMedicines(pharmacy.id, {
                        search: searchInput,
                    });
                    setMedicines(response.data);
                            console.log("Medicines:", response.data);

                } catch (error: any) {
                    setErrorMed(error);
                } finally {
                    setLoadingMed(false);
                }
            }
        }
        fetchMedicines();
    }, [searchInput, loading]);

    return(
        <div className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <p className="font-semibold text-27px">إدارة أدوية الصيدلية</p>
            <Card 
                title="أدوية الصيدلية"
                scrollable
                actions={
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
                                dosageForm: "شكل الجرعة",
                                price: "السعر",
                                availability: "توافر",
                                interact: "التفاعل",
                            }}
                            columnClassNames={{
                                medScientificName: "flex-2",
                                tradeName: "flex-2",
                                dosageForm: "flex-2",
                                price: "flex-1",
                                availability: "flex-1",
                                interact: "flex-1",
                            }}
                        />
                        <div
                            key={1}
                            className="flex flex-col text-inpt flex w-full items-center border-t border-gray-200"
                        >
                            {loadingMed ? (
                                <p className="text-black-500 text-sm py-2">جاري تحميل الأدوية...</p>
                            ) : errorMed ? (
                                <p className="text-red-500 text-sm py-2">تعذر تحميل الأدوية</p>
                            ) : (
                                medicines.length === 0 ? (
                                    <p className="text-black-500 text-sm py-2">لا توجد أدوية</p>
                                ) : (
                                    medicines.map((medicine) => (
                                        <Row
                                            key={medicine.id}
                                            data={{
                                                medScientificName: medicine.scientific_name,
                                                tradeName: medicine.trade_name,
                                                dosageForm: medicine.dosage_form,
                                                price: medicine.price,
                                                availability: "متوفر", // You can replace this with actual availability data if available
                                                interact: <InteractMed id={medicine.id} name={medicine.trade_name}/>,
                                            }}
                                            columnClassNames={{
                                                medScientificName: "flex-2",
                                                tradeName: "flex-2",
                                                dosageForm: "flex-2",
                                                price: "flex-1",
                                                availability: "flex-1",
                                                interact: "flex-1",
                                            }}
                                        />
                                    ))
                                )
                            )}
                        </div>
                </div>
            </Card>
        </div>
    )
}