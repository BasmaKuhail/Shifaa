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

type PharmacySearchField =
  | "name"
  | "address"
  | "owner";

type SearchPharmaciesParams = {
  input: string;
  field?: PharmacySearchField;
  page?: number;
};

type PharmaciesApiResponse = {
  data: PharmacyApiResponse[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type SearchPharmaciesResult = {
  pharmacies: PharmacyApiResponse[];
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  } | null;
};

export const searchPharmacies = async ({
  input,
  field,
  page = 1,
}: SearchPharmaciesParams): Promise<SearchPharmaciesResult> => {
  const normalizedInput = input.trim();

  if (!normalizedInput) {
    return {
      pharmacies: [],
      pagination: null,
    };
  }

  if (!Number.isInteger(page) || page < 1) {
    throw new Error("Page must be a positive integer");
  }

  try {
    const filterKey = field
      ? `filter[${field}]`
      : "filter[search]";

    const response = await api.get<PharmaciesApiResponse>(
      "/pharmacies",
      {
        params: {
          [filterKey]: normalizedInput,
          include: "pharmacists,attachments",
          page,
        },
      },
    );

    const { data, meta } = response.data;

    return {
      pharmacies: data ?? [],
      pagination: meta
        ? {
            currentPage: meta.current_page,
            lastPage: meta.last_page,
            perPage: meta.per_page,
            total: meta.total,
          }
        : null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ??
        error.message ??
        "Failed to search pharmacies";

      console.error("Failed to search pharmacies", {
        input: normalizedInput,
        field,
        page,
        url: error.config?.url,
        params: error.config?.params,
        status: error.response?.status,
        response: error.response?.data,
      });

      throw new Error(message);
    }

    throw error;
  }
};