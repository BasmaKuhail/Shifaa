import { useContext, useMemo, useState } from "react"; 
import Row from "./Row"; 
import { PharmacyTeamMember } from "@/types/PharmacyType";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";

type TableProps = { 
    pharmacistsArr?: PharmacyTeamMember[]; 
    onEdit:boolean 
} 
export default function Table({pharmacistsArr, onEdit=false}: TableProps){ 
    const [checkBoxChecked, setCheckBoxChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState<number[]>([]); 

    const {pharmacy, loading} = useContext(PharmacyContext);

    const team = useMemo<PharmacyTeamMember[]>(() => {
        if (pharmacistsArr) {
            return pharmacistsArr;
        }

        if (!pharmacy) {
            return [];
        }

        return [
        ...(pharmacy.owner ? [pharmacy.owner] : []),
        ...(pharmacy.staff ?? []),
        ];
    }, [pharmacistsArr, pharmacy]);

    const handleCheck = (index: number) => { 
        setCheckedItems((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index] ); 
    }; 
    
    return( 
        <div className="w-full flex flex-col gap-2"> 
            <div className="flex items-center gap-5 p-2"> 
                {onEdit && <div className="w-6" />} 
                    <Row 
                        data={{
                            firstName: "الاسم الأول", 
                            lastName: "الاسم الثاني", 
                            phone: "رقم التواصل", 
                            email: "البريد الالكتروني", 
                            role: "الدور"
                        }} 
                        columnClassNames={{
                            firstName: "flex-1",
                            lastName: "flex-1",
                            phone: "flex-1",
                            email: "flex-[2]",
                            role: "flex-1"
                        }}
                        
                    /> 
            </div>
            {loading && <p>جاري تحميل البيانات...</p>} 
        
            {!loading && team.length === 0 &&
                <p>لا يوجد صيادلة عاملون في هذه الصيدلية</p>
            }
            {!loading && 
                team.map((pharmacist) => ( 
                <div 
                    key={pharmacist.id}
                    className={` flex flex-row items-center justify-between gap-5 hover:bg-gray-50 px-2 py-1 transition border-t border-black-200 border-t-1 text-black-500 cursor-pointer` } 
                    onClick={() => handleCheck(pharmacist.id)} 
                > 
                    {onEdit && ( 
                        <input 
                            type="checkbox" 
                            checked={checkedItems.includes(pharmacist.id)} 
                            onChange={() => handleCheck(pharmacist.id)} 
                            className="w-4 h-4 cursor-pointer" 
                        /> )} 
                        <Row 
                            data={{
                                first_name: pharmacist.first_name, 
                                last_name: pharmacist.last_name, 
                                phone_number: pharmacist.phone_number, 
                                email: pharmacist.email, 
                                role: pharmacist.role
                            }}
                            columnClassNames={{
                                first_name: "flex-1",
                                last_name: "flex-1",
                                phone_number: "flex-1",
                                email: "flex-[2]",
                                role: "flex-1"
                            }}/> 
                </div> 
            ))} 
        </div> 
    )
}