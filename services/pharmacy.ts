import api from "@/lib/api";
import { Pharmacy, pharmacyResponseType } from "@/types/PharmacyType";

export const getPharmacyById = async (pharmacyId: number):Promise<Pharmacy> => {
  const response = await api.get(`/pharmacy/${pharmacyId}`, {
    responseType: 'json',

  });
//   console.log(response.data.data);
  return {
    id: response.data.data.id,
    name: response.data.data.name,
    address: response.data.data.address,
    phone: response.data.data.phone,
    owner: response.data.data.pharmacist,
    logo: response.data.data.attachments[0],
  };
}