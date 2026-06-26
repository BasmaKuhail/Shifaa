import api from "@/lib/api";

        
export const createPharm = async (
  name: string,
  phone: string,
  health_license: File | null,
  address:string,
  logo: File | null,
  
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  if (!health_license) {
    throw new Error("Identity document is required");
  }

  if(name === "")
    throw new Error("pharmacy name is required");

  if(address === "")
    throw new Error("pharmacy address is required");

  if(phone === "")
    throw new Error("phone number is required");
  const formData = new FormData();

  formData.append("name", name);
  formData.append("health_license", health_license);
  formData.append("phone", phone);
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

  return response.data;
};