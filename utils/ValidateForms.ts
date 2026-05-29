import ErrorMsg from "@/components/register/ErrorMsg";
import  {RegisterData} from "@/types/RegisterFormData"
import { error } from "console";

type LoginData ={
    email:string;
    password: string;
}
type ValidationResult = {
  errorMsg: string;
  isValid: false;
};

//validate register data
export const validateRegister = (userData: RegisterData): ValidationResult | null => {
    if (
        !userData.firstName || 
        !userData.lastName || 
        !userData.email || 
        !userData.password || 
        !userData.confirmPassword
    ) {
        return {
            errorMsg: "يرجى ملأ جميع الحقول الفارغة", 
            isValid: false
        }
    }
    if(/\d/.test(userData.firstName) || /\d/.test(userData.lastName)){
        return {
            errorMsg: "الاسم لا يجب أن يحتوي على أرقام", 
            isValid: false
        };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        return {
            errorMsg: "يرجى إدخال بريد إلكتروني صحيح", 
            isValid: false
        };
    }
    //check if not english used
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(userData.email)) {
    return {
        errorMsg: "يرجى إدخال بريد إلكتروني باللغة الإنجليزية فقط",
        isValid: false
    };
    }

    if (userData.password !== userData.confirmPassword) {
        return {
            errorMsg: "كلمتا المرور غير متطابقتين", 
            isValid: false
        };
    }

    if (
        userData.password.length < 8 ||
        !/[A-Za-z]/.test(userData.password) ||
        !/\d/.test(userData.password) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)
    ) {
        return {
            errorMsg: "كلمة المرور يجب أن تكون 8 أحرف انجليزية أو أكثر وتحتوي على مزيج من الأحرف والأرقام والرموز", 
            isValid: false
        };
    }

    return null; // valid
};

// validate login data
export const validateLogin = (loginData:LoginData) : ValidationResult | null => {
    if (!loginData.email || !loginData.password) {
        return {
            errorMsg:"يرجى ملأ جميع الحقول الفارغة",
            isValid:false
        };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
        return {
            errorMsg: "يرجى إدخال بريد إلكتروني صحيح",
            isValid: false
        };
    }
    return null
}