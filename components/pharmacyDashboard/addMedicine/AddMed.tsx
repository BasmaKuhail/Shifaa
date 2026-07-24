import Input from "@/components/register/input";
import Card from "../PharmacyInfo/CardContainer";
import Dropdown from "./DropDownInput";
import AddImage from "./AddImage";
import PetrolBtn from "../PharmacyInfo/invitePopup/PetrolBtn";
import BtnEmpty from "@/components/home/secondaryHeader/BtnEmpty";
import EmptyPetrolBtn from "@/components/adminDashboard/requests/EpmtyPetrolBtn";
export default function AddMed(){
    return(
            <div dir="rtl" className="flex flex-col gap-10 mt-13 mb-40 w-full">
                <p className="font-semibold text-27px">اضافة دواء</p>
                <Card title="معلومات الدواء الأساسية" >
                    <div className="flex w-full flex-col px-10">
                        <div className="text-black-500 text-inpt">
                            <Dropdown
                                label="الاسم العلمي"
                                placeholder="اختر الاسم العلمي"
                                value={""}
                                options={[{label:"op1", value:"option1"},{label:"op2", value:"option2", disabled:true} ]}
                                onChange={()=>{}}
                                isTrue={true}
                                errorMsg={
                                    ""
                                }
                            />
                            <Input
                                label="* الاسم التجاري"
                                type="text" 
                                inputText="الاسم التجاري"
                                value={""} 
                                onChange={() => {}} 
                                isTrue={true} 
                                errorMsg={""}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
                                <Dropdown
                                    label="الشكل"
                                    placeholder="اختر الشكل"
                                    value={""}
                                    options={[{label:"op1", value:"option1"},{label:"op2", value:"option2", disabled:true} ]}
                                    onChange={()=>{}}
                                    isTrue={true}
                                    errorMsg={
                                        ""
                                    }
                                />
                                <Dropdown
                                    label="يتاج وصفة طبية؟"
                                    placeholder="اختر الشكل"
                                    value={""}
                                    options={[{label:"op1", value:"option1"},{label:"op2", value:"option2", disabled:true} ]}
                                    onChange={()=>{}}
                                    isTrue={true}
                                    errorMsg={
                                        ""
                                    }
                                />
                                <Input
                                    label="السعر"
                                    type="text" 
                                    inputText="الاسم التجاري"
                                    value={""} 
                                    onChange={() => {}} 
                                    isTrue={true} 
                                    errorMsg={""}
                                />
                                <div className="grid grid-cols-3 gap-4 w-full items-end">
                                    <Dropdown
                                        label="تاريخ الانتهاء"
                                        placeholder="اليوم"
                                        value={""}
                                        options={Array.from({ length: 31 }, (_, index) => ({
                                            label: String(index + 1),
                                            value: String(index + 1),
                                        }))}
                                        onChange={()=>{}}
                                        isTrue={true}
                                        errorMsg={
                                            ""
                                        }
                                    />
                                    <Dropdown
                                        label={"\u00A0"}
                                        placeholder="الشهر"
                                        value={""}
                                        options={Array.from({ length: 12 }, (_, index) => ({
                                            label: String(index + 1),
                                            value: String(index + 1),
                                        }))}
                                        onChange={()=>{}}
                                        isTrue={true}
                                        errorMsg={
                                            ""
                                        }
                                    />
                                    <Dropdown
                                        label={"\u00A0"}
                                        placeholder="السنة"
                                        value={""}
                                        options={Array.from({length:5}, (_,index) => ({
                                            label: String(index + 2026),
                                            value: String(index + 2026),
                                        }))}
                                        onChange={()=>{}}
                                        isTrue={true}
                                        errorMsg={
                                            ""
                                        }
                                    />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </Card>
                <Card title="صور الدواء" scrollable>
                    <div className="flex flex-col gap-5">
                       <p className="text-inpt text-black-500">ملاحظة: تقبل انواع الصور التالية: png, jpeg, jpg</p>
                       <div className="flex flex-row gap-5 items-center justify-start">
                            <AddImage label="صورة 1"/> 
                            <AddImage label="صورة 2"/> 
                            <AddImage label="صورة 3"/> 
                            <AddImage label="صورة 4"/> 
                            <AddImage label="صورة 5"/> 
                       </div>
                        
                    </div>
                    
                </Card>
                <div className="flex flex-row gap-5">
                   <PetrolBtn text="اضافة" onClick={() => {}} />
                    <EmptyPetrolBtn text="حفظ التغيرات" onClick={() => {}}/> 
                </div>

                
            </div>
    )
}