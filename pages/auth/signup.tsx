import Form from "@/components/register/form";
import RegisterFormLayout from "@/layouts/RegisterFormLayout";

export default function SignUp() {
    return (
        <RegisterFormLayout>
            <Form isRegister={true} />
        </RegisterFormLayout>

    )
}