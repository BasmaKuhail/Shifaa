import Form from "@/components/register/form";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
    //re direct to home page if user is already logged in
    const router = useRouter();
    useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, []);
  
    return (
        <Form isRegister={false} />
    )
}