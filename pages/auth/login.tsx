import Form from "@/components/register/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
    //re direct to home page if user is already logged in
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
        router.replace("/");
        } else {
        setCheckingAuth(false);
        }
    }, []);
  
    if (checkingAuth) {
        return null; // or loading spinner
    }
    return (
        <Form isRegister={false} />
    )
}