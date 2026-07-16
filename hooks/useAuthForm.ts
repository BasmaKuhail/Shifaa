import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { login, register } from "@/services/auth";
import { getMe, normalizeUser } from "@/services/getMe";
import { validateLogin, validateRegister } from "@/utils/ValidateForms"
import {RegisterData} from "@/types/RegisterFormData"
import { showAlert } from "@/components/alerts/AlertContainer";
import { UserContext } from "@/contexts/UserContext";
import axios from "axios";

const initialFormData: RegisterData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export const useAuthForm = (isRegister: boolean) => {
    const router = useRouter();
    const { setUser } = useContext(UserContext);

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
            showAlert({
                type: "Error",
                title: "خطأ في التحقق",
                message: validationError.errorMsg,
            });
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
            const token = response.data.token;
            if (typeof token !== "string" || !token) {
                throw new Error("The authentication response did not include a token");
            }

            // Avoid ever showing a previous account with a newly issued token.
            setUser(null);
            localStorage.setItem("token", token);

            try {
                const responseUser = normalizeUser(response.data.user);
                setUser(responseUser ?? await getMe());
            } catch (profileError) {
                localStorage.removeItem("token");
                setUser(null);
                throw profileError;
            }

            router.push("/");

        } catch (caughtError: unknown) {
            const response = axios.isAxiosError(caughtError)
                ? caughtError.response
                : undefined;

            if (response?.status === 422 || response?.status === 401) {
                showAlert({
                    type: "Error",
                    title: "خطأ في التحقق",
                    message: response.data.message,
                });
                console.log("Validation Errors:", response.data.errors);
            } else if (response?.status === 500) {
                showAlert({
                    type: "Error",
                    title: "خطأ في الخادم",
                    message: "حدث خطأ في الخادم، حاول مرة أخرى",
                });
                console.log("Validation Errors:", response.data.errors);
            } else {
                showAlert({
                    type: "Error",
                    title: "خطأ غير متوقع",
                    message: "حدث خطأ غير متوقع، حاول مرة أخرى",
                });
            }
            console.log("Error:", response?.data);
            setErrorMsg(
                response?.data?.message || "حدث خطأ غير متوقع، حاول مرة أخرى"
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
