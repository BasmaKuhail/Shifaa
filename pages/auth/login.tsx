import Form from "@/components/register/form";
import RegisterFormLayout from "@/layouts/RegisterFormLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Sign in | Shifaa",
  description: "Sign in to your Shifaa account.",
  robots: {
    index: false,
    follow: false,
  },
};
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
      <>
        <Head>
          <title>التسجيل | شفاء</title>
          <meta
            name="description"
            content="سجّل الدخول إلى منصة شفاء."
          />
          <meta name="robots" content="index, nofollow" />
        </Head>
        <main>
        <RegisterFormLayout>
          <Form isRegister={false} />
        </RegisterFormLayout>
        </main>
      </>
        
    )
}