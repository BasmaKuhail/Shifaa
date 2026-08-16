import api from "@/lib/api";
import { PharmacyApplicationResponse } from "@/types/PharmacyApplicationResponse";

        
export const createPharm = async (
  name: string,
  phone: string,
  health_license: File | null,
  sub_region_id: number,
  address: string,
  logo: File | null,
): Promise<PharmacyApplicationResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  if (!health_license) {
    throw new Error("Identity document is required");
  }

  if(name === "")
    throw new Error("pharmacy name is required");

  if (!sub_region_id) {
    throw new Error("sub-region is required");
  }

  if(address.trim() === "")
    throw new Error("pharmacy address is required");

  if(phone === "")
    throw new Error("phone number is required");
  const formData = new FormData();

  formData.append("name", name);
  formData.append("health_license", health_license);
  formData.append("phone", phone);
  formData.append("sub_region_id", String(sub_region_id));
  formData.append("address", address);
  if(logo){
    formData.append("logo", logo);
  }
  


  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await api.post("/pharmacist/pharmacy-application", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      // "Content-Type": undefined,
    },
  });

  return response.data as PharmacyApplicationResponse;
};
