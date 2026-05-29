import { useState } from "react";
import { useRouter } from "next/router";
import { login, register } from "@/services/auth";
import { validateLogin, validateRegister } from "@/utils/ValidateForms"
import {RegisterData} from "@/types/RegisterFormData"

const initialFormData: RegisterData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export const useAuthForm = (isRegister: boolean) => {
    const router = useRouter();

    const [formData, setFormData] = useState<RegisterData>(initialFormData);
    const [errorMsg, setErrorMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const updateField = (field: keyof RegisterData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errorMsg) {
            setErrorMsg("");
        }
    };

  const submit = async () => {
        const validationError = isRegister
            ? validateRegister(formData)
            : validateLogin({
                email: formData.email,
                password: formData.password,
            });

        if (validationError) {
            alert(validationError.errorMsg);
            setErrorMsg(validationError.errorMsg);
            return;
        }

        try {
            setIsSubmitting(true);

            const response = isRegister
                ? await register({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.confirmPassword,
                })
                : await login({
                    email: formData.email,
                    password: formData.password,
                });
            console.log("Success:", response);

            localStorage.setItem("token", response.data.token);

            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }

            router.push("/");

        } catch (error: any) {
            if (error.response?.status === 422 || error.response?.status === 401) {
                alert(error.response.data.message);
                console.log("Validation Errors:", error.response.data.errors);
            } else if (error.response?.status === 500) {
                alert("حدث خطأ في الخادم، حاول مرة أخرى");
                console.log("Validation Errors:", error.response.data.errors);
            } else {
                alert("حدث خطأ غير متوقع");
            }
            console.log("Error:", error.response?.data);
            setErrorMsg(
                error.response?.data?.message || "حدث خطأ غير متوقع، حاول مرة أخرى"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errorMsg,
        isSubmitting,
        updateField,
        submit,
    };
};