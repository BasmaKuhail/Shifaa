import api from "@/lib/api";
import { Pharmacy, PharmacyDataToUpdate, pharmacyResponseType } from "@/types/PharmacyType";
import axios from "axios";

export const getPharmacyById = async (pharmacyId: number):Promise<Pharmacy> => {
  try{
    const response = await api.get(`/pharmacy/${pharmacyId}`, {
    responseType: 'json',

  });
  console.log(response);
  return {
    id: response.data.data.id,
    name: response.data.data.name,
    address: response.data.data.address,
    phone: response.data.data.phone,
    owner: response.data.data.pharmacist,
    logo: response.data.data.attachments[1].url,
  };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to fetch pharmacy", {
        status: error.response?.status,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
      });
    }

    throw error;
  }
  
}
export const updatePharmacyData = async (
  pharmacyId: number,
  pharmacyData: PharmacyDataToUpdate
) => {
  const formData = new FormData();

  formData.append("_method", "PATCH");
  formData.append("name", pharmacyData.name);
  formData.append("address", pharmacyData.address);
  formData.append("phone", pharmacyData.phone);

  if (pharmacyData.logo instanceof File) {
    formData.append("logo", pharmacyData.logo);
  }

  const response = await api.post(`/pharmacy/${pharmacyId}`, formData);

  return response.data;
};

export const deletePharmacy = async (pharmacyId: number) => {
  const response = await api.delete(`/pharmacy/${pharmacyId}`);
  return response.data;
}