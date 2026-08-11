import api from "@/lib/api";

import { PaginationLink } from "./admin";
import { ApplicationFile } from "@/types/PharmacistApplication";
export type MedicineAttachment = {
  id?: number;
  url: string;
};
export type Medicine = {
  id: number;
  scientific_name: string;
  trade_name: string;
  dosage_form: string;
  strength: string | null;
  price: number | null;
  medication_photo?: string | null
  attachments?: MedicineAttachment[];
  is_available: boolean;
  pharmacy?:{
    id:number;
    name:string;
    address:string;
  }
};

export type MedicinesPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
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

export type MedicinesApiResponse = {
  data: Medicine[];
  links?: MedicinesPaginationLinks;
  meta: MedicinesPaginationMeta;
};

export type GetMedicinesParams = {
  page?: number;
  perPage?: number;
  search?: string;
  dosageForm?:string;
  min?:number,
  max?:number
};

type MedicineDetailsApiItem = {
  id: number;
  scientific_name: string;
  trade_name: string;
  dosage_form: string;
  is_available: boolean;
  strength: string | null;
  price: string | number | null;
  attachments: Array<ApplicationFile | null>;
};

type MedicineDetailsApiResponse = {
  data: MedicineDetailsApiItem[];
};

export type AddMedicinePayload = {
  global_medicine_id: number;
  trade_name: string;
  dosage_form: string;
  strength: string;
  price: number;
  medication_photo?: File | null;
  is_available?: boolean;
};

export type AddMedicineParams = {
  pharmacyId: number;
  medicine: AddMedicinePayload;
};

export type EditMedicinePayload = {
  trade_name?: string;
  dosage_form?: string;
  strength?: string;
  price?: number;
  medication_photo?: File | null;
  is_available?: boolean;
};

export type EditMedicineParams = {
  pharmacyId: number;
  medicineId: number;
  medicine: EditMedicinePayload;
};

export type MedicineMutationResponse = {
  status: string;
  message: string;
  data?: unknown;
};

export type DeleteMedicineResponse = {
  status: string;
  message: string;
};


//  Get global medicines.
 
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
          // "sort":"scientificName"
        }),
      },
    },
  );

  return response.data;
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
        include: "globalMedicine",
        "filter[pharmacyId]": pharmacyId,
        "sort":"-createdAt",
        page,
        per_page: perPage,

        ...(normalizedSearch && {
          "filter[scientificNameOrTradeName]": `*${normalizedSearch}*`,
        }),
      },
    },
  );

  return response.data;
};



//  Get a single medicine from pharmacy inventory.

export const getMedicineDetails = async (
  pharmacyId: number,
  medicineId: number,
): Promise<Medicine | null> => {
  const response =
    await api.get<MedicineDetailsApiResponse>(
      "/pharmacy-medicines",
      {
        params: {
          "filter[pharmacyId]": pharmacyId,
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
    strength: medicine.strength,
    price:
      medicine.price !== null
        ? Number(medicine.price)
        : null,
    medication_photo:
      medicine.attachments[0]?.url ?? null,
    is_available: medicine.is_available,
  };
};


//  Add medicine to pharmacy inventory.
 
export const addMedicine = async ({
  pharmacyId,
  medicine,
}: AddMedicineParams): Promise<MedicineMutationResponse> => {
  const formData = new FormData();

  formData.append(
    "pharmacy_id",
    String(pharmacyId),
  );

  formData.append(
    "global_medicine_id",
    String(medicine.global_medicine_id),
  );

  formData.append(
    "trade_name",
    medicine.trade_name,
  );

  formData.append(
    "dosage_form",
    medicine.dosage_form,
  );

  formData.append(
    "strength",
    medicine.strength,
  );

  formData.append(
    "price",
    String(medicine.price),
  );

  formData.append(
    "is_available",
    medicine.is_available === false
      ? "0"
      : "1",
  );

  if (
    medicine.medication_photo instanceof
    File
  ) {
    formData.append(
      "medication_photo",
      medicine.medication_photo,
    );
  }

  const response =
    await api.post<MedicineMutationResponse>(
      "/pharmacy/inventory/store",
      formData,
    );

  return response.data;
};


//  Edit pharmacy inventory medicine.

export const editMedicine = async ({
  pharmacyId,
  medicineId,
  medicine,
}: EditMedicineParams): Promise<MedicineMutationResponse> => {
  const formData = new FormData();

  formData.append(
    "pharmacy_id",
    String(pharmacyId),
  );

  if (medicine.trade_name !== undefined) {
    formData.append(
      "trade_name",
      medicine.trade_name,
    );
  }

  if (medicine.dosage_form !== undefined) {
    formData.append(
      "dosage_form",
      medicine.dosage_form,
    );
  }

  if (medicine.strength !== undefined) {
    formData.append(
      "strength",
      medicine.strength,
    );
  }

  if (medicine.price !== undefined) {
    formData.append(
      "price",
      String(medicine.price),
    );
  }

  if (
    medicine.is_available !== undefined
  ) {
    formData.append(
      "is_available",
      medicine.is_available ? "1" : "0",
    );
  }

  if (
    medicine.medication_photo instanceof
    File
  ) {
    formData.append(
      "medication_photo",
      medicine.medication_photo,
    );
  }

  const response =
    await api.post<MedicineMutationResponse>(
      `/pharmacy/inventory/update/${medicineId}`,
      formData,
    );

  return response.data;
};

//  Delete medicine from pharmacy inventory.

export const deleteMedicine = async (
  medicineId: number,
): Promise<DeleteMedicineResponse> => {
  const response =
    await api.delete<DeleteMedicineResponse>(
      `/pharmacy/inventory/delete/${medicineId}`,
    );

  return response.data;
};