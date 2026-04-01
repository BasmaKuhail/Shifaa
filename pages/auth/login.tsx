import Form from "@/components/register/form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {getMe} from "@/services/auth"
export default function Login() {
    //re direct to home page if user is already logged in
    const router = useRouter();
    useEffect(() => {
      const checkUser = async () => {
        const token = localStorage.getItem("token");
  
        if (token) {
          console.log(token)
          router.push("/");
          const me = await getMe();
          localStorage.setItem("user", JSON.stringify(me));
          console.log(me)
  
          router.push("/");
        }
      };
      checkUser();
    }, []);
  
    return (
        <Form isRegister={false} />
    )
}