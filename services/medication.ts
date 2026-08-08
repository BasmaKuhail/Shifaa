import api from "@/lib/api";
import { PaginationLink } from "./admin";
import { ApplicationFile } from "@/types/PharmacistApplication";

export type Medicine = {
  id: number;
  scientific_name: string;
  trade_name: string;
  dosage_form: string;
  strength: string | null;
  price: number | null;
  medication_photo?: string | null;
};

export type MedicinesPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type MedicinesApiResponse = MedicinesPagination & {
  data: Medicine[];
  meta: MedicinesPaginationMeta;
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
  medication_photo?: File | string | null;
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


export type MedicinesPaginationMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type MedicinesPaginationLinks = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};


export const getPharmacyMedicines = async (
  pharmacyId: number,
  {
    page = 1,
    perPage = 9,
    search = "",
  }: GetMedicinesParams = {},
): Promise<MedicinesApiResponse> => {
  const normalizedSearch = search.trim();

  const response = await api.get<MedicinesApiResponse>(
    "/pharmacy-medicines",
    {
      params: {
        pharmacy_id: pharmacyId,
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
type MedicineApiResponse = {
  data: Array<{
    id: number;
    scientific_name: string;
    trade_name: string;
    dosage_form: string;
    strength: string | null;
    price: string | number | null;
    attachments:[
      ApplicationFile | null,
    ];
  }>;
};

export const getMedicineDetails = async (
  pharmacyId: number,
  medicineId: number,
): Promise<Medicine | null> => {
  const response = await api.get<MedicineApiResponse>(
    "/pharmacy-medicines",
    {
      params: {
        pharmacy_id: pharmacyId,
        "filter[id]": medicineId,
      },
    },
  );

  const medicine = response.data.data[0];

  if (!medicine) {
    return null;
  }

  return {
    id: medicine.id,
    scientific_name: medicine.scientific_name,
    trade_name: medicine.trade_name,
    dosage_form: medicine.dosage_form,
    strength: medicine.strength ?? "",
    price:
      medicine.price !== null
        ? Number(medicine.price)
        : null,
    medication_photo: medicine.attachments[0]?.url || null,
  };
};


export const deleteMedicine = async (id:number) => {
  const response = await api.delete(`/pharmacy/inventory/delete${id}`)
  return response;
}