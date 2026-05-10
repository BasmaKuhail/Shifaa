import Input from "@/components/register/input";
import HeaderText from "../HeaderText";
import Title from "../SectionTitle";
import SubHeader from "../SubHeader";
import { useState } from "react";
import { validateInput } from "@/utils/ValidateInput"
import GradientBrn from "../GradiantBtn";
import PhoneNum from "./PhoneNumInput";

export default function ContactForm(){
    const [userContactFornInfo, setUserContactFornInfo] = useState({
            firstName: { value: '', isTrueData: false },
            lastName: { value: '', isTrueData: false },
            email: { value: '', isTrueData: false },
            password: { value: '', isTrueData: false },
            message: { value: '', isTrueData: false }
        });
    // const [phone, setPhone] = useState("")
    // const [countryCode, setCounteryCode] = useState("")

    // const countryCodes = [
    //     { name: "Palestine", dialCode: "+970", iso: "ps" },
    //     { name: "Saudi Arabia", dialCode: "+966", iso: "sa" },
    //     { name: "Egypt", dialCode: "+20", iso: "eg" }
    // ]

    return(
        <div dir="rtl" className="bg-white flex flex-col p-10 lg:py-0 md:py-0 lg:mb-20 md:mb-20 rounded-[10px] lg:rounded-l-[0] md:rounded-l-[0] h-full gap-7 justify-center">
            <div className="flex flex-col gap-2 lg:items-start lg:text-start md:items-start md:text-start items-center text-center">
                <Title title="اتصل بنا" />
                <HeaderText text="تواصل معنا" color="black"/>
                <p className="font-[500] lg:text-btn text-inpt">نحن هنا من أجلك. إذا كان لديك أي استفسار أو كنت بحاجة إلى مساعدة، فلا تتردد في التواصل معنا.</p>

            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4">
                <div className="lg:flex-1 w-full">
                    <Input 
                    
                        label="الاسم الأول*"
                        type="text" 
                        inputText="الاسم الأول" 
                        value={userContactFornInfo.firstName.value} 
                        onChange={(value) => 
                            setUserContactFornInfo({ 
                                ...userContactFornInfo, 
                                firstName: { value: value as string, isTrueData: true } 
                            })
                        } 
                        isTrue={validateInput(userContactFornInfo.firstName.value, 'text').isValid}/>
                </div>
                <div className="lg:flex-1 w-full">
                    <Input 
                        label="اسم العائلة*" 
                        type="text" 
                        inputText="اسم العائلة" 
                        value={userContactFornInfo.lastName.value } 
                        onChange={(value) => 
                            setUserContactFornInfo({
                                ...userContactFornInfo,
                                lastName: { value: value as string, isTrueData: true }
                            })
                        }
                        isTrue={validateInput(userContactFornInfo.lastName.value, 'text').isValid}/>
                </div>
            </div>
            <Input 
                label="البريد الالكتروني" 
                type="email" 
                inputText="youremail.com" 
                value={userContactFornInfo.email.value} 
                onChange={(value) => 
                    setUserContactFornInfo({ 
                        ...userContactFornInfo, 
                        email: { value: value as string, isTrueData: true } 
                    })
                } 
                isTrue={validateInput(userContactFornInfo.email.value, 'email').isValid}/>
            {/* <PhoneNum
                label="رقم الهاتف"
                inputText=""
                value={phone}
                onChange={setPhone}
                isTrue={validateInput(userContactFornInfo.email.value, 'text')}
                codes={countryCodes}
                countryCode={countryCode}
            /> */}
            <Input 
                label="الرسالة*" 
                type="textarea" 
                inputText="اترك رسالتك هنا..."  
                value={userContactFornInfo.message.value} 
                onChange={(value) => setUserContactFornInfo({ ...userContactFornInfo, message: { value: value as string, isTrueData: true } })} 
                isTrue={validateInput(userContactFornInfo.message.value, 'textarea').isValid}/>

            <div className="flex w-fit h-[51px] justify-center lg:justify-start md:justify-start w-full">
                <GradientBrn text="إرسال الرسالة" onClick={() => {}} px={10}/>
            </div>
        </div>
    )
}