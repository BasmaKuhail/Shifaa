import api from "@/lib/api";

        
export const createPharm = async (
  pharmacy_name: string,
  phone_number: string,
  license_pharmacy: File | null,
  logo: File | null,
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  if (!license_pharmacy) {
    throw new Error("Identity document is required");
  }

  if(pharmacy_name === "")
    throw new Error("pharmacy name is required");

  if(phone_number === "")
    throw new Error("phone number is required");
  const formData = new FormData();

  formData.append("pharmacy_name", pharmacy_name);
  formData.append("license_pharmacy", license_pharmacy);
  formData.append("phone_number", phone_number);
  formData.append("logo", logo);


  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await api.post("/pharmacy-application", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      // "Content-Type": undefined,
    },
  });

  return response.data;
};