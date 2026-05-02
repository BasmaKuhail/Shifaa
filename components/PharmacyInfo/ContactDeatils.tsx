import Input from "../register/input";
import Btn from "./Btn";
import Card from "./CardContainer";
import editIcon from "@/public/icons/editProfile/edit.svg"

export default function ContactInfo (){
    return(
        <Card 
            title="معلومات التواصل" 
            actions={
                <Btn text="تعديل" icon={editIcon} onClick={()=>{}}/>    
            }
        >
            <div className="flex flex-row w-full grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <Input label="رقم الهاتف المحمول" type="text" inputText={ ""} value={""} onChange={() => {}} isTrue={true}/>
                <Input label="رقم الواتساب" type="text" inputText={ ""} value={""} onChange={() => {}} isTrue={true}/>
                <Input label="العنوان" type="text" inputText={ ""} value={""} onChange={() => {}} isTrue={true}/>
            </div>
        </Card>
    )
}