import Form from "@/components/register/form";
import RegisterFormLayout from "@/layouts/RegisterFormLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Login() {
    //re direct to home page if user is already logged in
    const router = useRouter();
    useEffect(() => {
      const checkUser = async () => {
        const token = localStorage.getItem("token");
  
        if (token) {
          console.log("Token found, fetching user..." , token);
          router.push("/");
        }
      };
      checkUser();
    }, []);
  
    return (
      <RegisterFormLayout>
        <Form isRegister={false} />
      </RegisterFormLayout>
        
    )
}