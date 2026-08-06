import axios from "axios";
import api from "@/lib/api";

export type Medicine = {
  id: number;
  scientific_name: string;
  trade_name: string;
  dosage_form: string;
  strength: string | null;
  price: number | null;
  medication_photo?: File | null;
};

export type MedicinesPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type MedicinesApiResponse = MedicinesPagination & {
  data: Medicine[];
};

export type GetMedicinesParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

export const getMedicines = async ({
  page = 1,
  perPage = 10,
  search = "",
}: GetMedicinesParams = {}): Promise<MedicinesApiResponse> => {
  const normalizedSearch = search.trim();

  const response = await api.get<MedicinesApiResponse>(
    "/global-medicines",
    {
      params: {
        page,
        per_page: perPage,
        ...(normalizedSearch && {
          "filter[scientificName]": `*${normalizedSearch}*`,
        }),
      },
    },
  );

  return response.data;
};

export type AddMedicinePayload = {
  global_medicine_id: number;
  price: number;
  medication_photo?: File | null;
};

export type AddMedicineResponse = {
  status: string;
  message: string;
  data?: unknown;
};

type AddMedicineParams = {
  pharmacyId: number;
  medicine: AddMedicinePayload;
};

export const addMedicine = async ({
  pharmacyId,
  medicine,
}: AddMedicineParams): Promise<AddMedicineResponse> => {
  const formData = new FormData();

  formData.append("pharmacy_id", String(pharmacyId));
  formData.append(
    "global_medicine_id",
    String(medicine.global_medicine_id),
  );
  formData.append("price", String(medicine.price));

  if (medicine.medication_photo instanceof File) {
    formData.append(
      "medication_photo",
      medicine.medication_photo,
    );
  }

  const response = await api.post<AddMedicineResponse>(
    "/pharmacy/inventory/store",
    formData,
  );

  return response.data;
};



export const getPharmacyMedicines = async (
  pharmacyId: number,
  params: GetMedicinesParams = {},
): Promise<MedicinesApiResponse> => {
  const normalizedSearch = params.search?.trim() || "";

  const response = await api.get<MedicinesApiResponse>(
    "pharmacy-medicines",
    {
      params: {
        pharmacy_id: pharmacyId,
        ...params,
        ...(normalizedSearch && {
          "filter[scientificName]": `*${normalizedSearch}*`,
        }),
      },
    },
  );
  console.log("getPharmacyMedicines response:", response.data);
  return response.data;
};
