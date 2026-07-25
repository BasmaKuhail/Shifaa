import api from "@/lib/api";
import axios from "axios";

import { showAlert } from "@/components/alerts/AlertContainer";
import { PharmacyApiResponse } from "./pharmacy";

type PharmacyPaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

type PharmaciesApiResponse = {
  data: PharmacyApiResponse[];
  meta?: PharmacyPaginationMeta;
};

export type PharmacyPagination = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};

export type PharmaciesResult = {
  pharmacies: PharmacyApiResponse[];
  pagination: PharmacyPagination | null;
};

type GetAllPharmaciesParams = {
  page?: number;
  sortDescending?: boolean;
};

type SearchPharmaciesParams = {
  input: string;
  page?: number;
  sortDescending?: boolean;
};

const validatePage = (page: number): void => {
  if (!Number.isInteger(page) || page < 1) {
    throw new Error("Page must be a positive integer");
  }
};

const isAcceptedPharmacy = (
  pharmacy: PharmacyApiResponse,
): boolean => pharmacy.status === "approved";

const mapPharmaciesResponse = (
  response: PharmaciesApiResponse,
): PharmaciesResult => {
  const acceptedPharmacies = Array.isArray(response.data)
    ? response.data.filter(isAcceptedPharmacy)
    : [];

  const meta = response.meta;

  return {
    pharmacies: acceptedPharmacies,
    pagination: meta
      ? {
          currentPage: meta.current_page,
          lastPage: meta.last_page,
          perPage: meta.per_page,
          total: meta.total,
        }
      : null,
  };
};

const handlePharmacyError = (
  error: unknown,
  fallbackMessage: string,
): never => {
  let errorMessage = fallbackMessage;

  if (axios.isAxiosError(error)) {
    errorMessage =
      error.response?.data?.message ??
      error.message ??
      fallbackMessage;

    console.error(fallbackMessage, {
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
    title: "خطأ",
    message: errorMessage,
  });

  throw new Error(errorMessage, {
    cause: error,
  });
};

export const getAllPharmacies = async ({
  page = 1,
  sortDescending = false,
}: GetAllPharmaciesParams = {}): Promise<PharmaciesResult> => {
  validatePage(page);

  try {
    const response = await api.get<PharmaciesApiResponse>(
      "/pharmacies",
      {
        params: {
          include: "pharmacists,attachments",
          page,
          sort: sortDescending ? "-name" : "name",
        },
      },
    );

    return mapPharmaciesResponse(response.data);
  } catch (error: unknown) {
    return handlePharmacyError(
      error,
      "Failed to fetch pharmacies",
    );
  }
};

export const searchPharmacies = async ({
  input,
  page = 1,
  sortDescending = false,
}: SearchPharmaciesParams): Promise<PharmaciesResult> => {
  const normalizedInput = input.trim();

  if (!normalizedInput) {
    return getAllPharmacies({
      page,
      sortDescending,
    });
  }

  validatePage(page);

  try {
    const response = await api.get<PharmaciesApiResponse>(
      "/pharmacies",
      {
        params: {
          "filter[name]": `*${normalizedInput}*`,
          include: "pharmacists,attachments",
          page,
          sort: sortDescending ? "-name" : "name",
        },
      },
    );

    return mapPharmaciesResponse(response.data);
  } catch (error: unknown) {
    return handlePharmacyError(
      error,
      "Failed to search pharmacies",
    );
  }
};