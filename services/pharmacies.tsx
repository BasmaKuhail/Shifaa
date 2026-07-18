import api from "@/lib/api";
import { Pharmacy } from "@/types/PharmacyType";
import axios from "axios";
import { showAlert } from "@/components/alerts/AlertContainer";
import { PharmacyApiResponse } from "./pharmacy";

type PharmaciesResponse = {
  data: PharmacyApiResponse[];
};

export const getAllPharmacies = async (): Promise<PharmacyApiResponse[]> => {
  try {
    const response = await api.get<PharmaciesResponse>("/pharmacies", {
      params: {
        include: "pharmacists,attachments",
      },
    });
    console.log(response.data)
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = "Failed to fetch pharmacies";

    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.message ??
        error.message ??
        errorMessage;

      console.error("Failed to fetch pharmacies", {
        url: error.config?.url,
        params: error.config?.params,
        status: error.response?.status,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
        response: error.response?.data,
      });
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    showAlert({
      type: "Error",
      title: "Error",
      message: errorMessage,
    });

    throw new Error(errorMessage, {
      cause: error,
    });
  }
};