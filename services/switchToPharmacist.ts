import api from "@/lib/api";

export const switchToPharmasist = async (
  identity_document: File | null,
  phone_number: string,
  license_certificate: File | null,
  personal_photo: File | null,
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  if (!identity_document) {
    throw new Error("Identity document is required");
  }

  if (!license_certificate) {
    throw new Error("License certificate is required");
  }

  if (!personal_photo) {
    throw new Error("Personal photo is required");
  }


  const formData = new FormData();

  formData.append("license_certificate", license_certificate);
  formData.append("personal_photo", personal_photo);
  formData.append("identity_document", identity_document);
  formData.append("phone_number", phone_number);

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await api.post("/pharmacist-application", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      // "Content-Type": undefined,
    },
  });

  return response.data;
};