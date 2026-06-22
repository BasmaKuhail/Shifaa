import { showAlert } from "@/components/alerts/AlertContainer";
import PetrolBtn from "@/components/dashboard/PharmacyInfo/invitePopup/PetrolBtn";
import Input from "@/components/register/input";
import { changePassword, updateProfile } from "@/services/editProfile";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { validateConfirmPassword, validateInput } from "@/utils/ValidateInput";
import { useState } from "react";

export default function Settings (){
    const [updatePasswordData, setUpdatePasswordData] = useState({
            current_password: '',
            password:'',
            password_confirmation:''
        })
    const changePasswordOnClick = async() => {
            if(
                !updatePasswordData.current_password.trim() ||
                !updatePasswordData.password.trim() ||
                !updatePasswordData.password_confirmation.trim()
            ){
                showAlert({
                    type:"Warning",
                    title:"تحذير",
                    message: "يرجى ملأ جميع الحقول المتعلقة بتغير كلمة المرور"
                })
                return
            }
            try{
                console.log(updatePasswordData);
                await changePassword(updatePasswordData);
                showAlert({
                    type:"Success",
                    title:"Success",
                    message: "تم تغير كلمة المرور بنجاح!"
                })
            }catch (error: unknown) {
                showAlert({
                type: "Error",
                title: "خطأ",
                message: getApiErrorMessage(error),
                });
            }
        };
    return(
        <div className='p-5 flex flex-col w-full gap-7'>
                    <Input 
                        label="كلمة المرور الحالية"  
                        type="password" 
                        inputText={updatePasswordData.current_password || "ادخل كلمة المرور الحالية"} 
                        value={updatePasswordData.current_password} 
                        onChange={(value) =>
                            setUpdatePasswordData((prev) => ({
                            ...prev,
                            current_password: typeof value === "string" ? value : "",
                            }))
                        } 
                        isTrue={true} 
                    />
                    <Input 
                        label="كلمة المرور الجديدة" 
                        type="password" 
                        inputText={updatePasswordData.password || "ادخل كلمة المرور الجديدة"} 
                        value={updatePasswordData.password} 
                        onChange={(value) =>
                            setUpdatePasswordData((prev) => ({
                            ...prev,
                            password: typeof value === "string" ? value : "",
                        }))
                        }
                        isTrue={validateInput(updatePasswordData.password, 'password').isValid} 
                    />
                    <Input 
                        label="تأكيد كلمة المرور الجديدة" 
                        type="password" 
                        inputText={updatePasswordData.password_confirmation || "تأكيد كلمة المرور الجديدة"} 
                        value={updatePasswordData.password_confirmation} 
                        onChange={(value) =>
                            setUpdatePasswordData((prev) => ({
                            ...prev,
                            password_confirmation: typeof value === "string" ? value : "",
                            }))
                        }
                        isTrue={validateInput(updatePasswordData.password_confirmation, 'password').isValid && validateConfirmPassword(updatePasswordData.password, updatePasswordData.password_confirmation)}
                        />
                <PetrolBtn text="تغير كلمة المرور" onClick={() => changePasswordOnClick()}/>
        </div>
    )
}