import api from "@/lib/api";
import axios from "axios";

export type Request = {
    medicine_name: string;
    patient_age?: number;
    image?: File | null;
    region_id?: number;
    sub_regions_id?: number;
    pharmacy_id?: number;
    dosage_form?:string;
    strength?:string;
    quantity?:number;
    notes?:string
};

export const requestMed = async (request: Request) => {
    console.log(request)
    const formData = new FormData();

    Object.entries(request).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        formData.append(
            key,
            value instanceof File ? value : String(value),
        );
    });

    try {
        const response = await api.post("medicine-requests", formData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Medication request failed:", {
                status: error.response?.status,
                validation: error.response?.data,
            });
            throw new Error(
                error.response?.data?.message ??
                    "حدث خطأ أثناء إرسال الطلب",
            );
        }
        throw new Error("حدث خطأ غير متوقع");
    }
};