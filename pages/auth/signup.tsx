import Form from "@/components/register/form";
import RegisterFormLayout from "@/layouts/RegisterFormLayout";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Sign up | Shifaa",
  description: "Create an account.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function SignUp() {
    return (
        <>
        <Head>
            <title>تسجيل الدخول | شفاء</title>
            <meta
                name="description"
                content="سجّل الدخول إلى حسابك في منصة شفاء."
            />
            <meta name="robots" content="noindex, nofollow" />
        </Head>
        <RegisterFormLayout>
            <Form isRegister={true} />
        </RegisterFormLayout>
        </>
        

    )
}