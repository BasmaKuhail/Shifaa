import api from "@/lib/api";
import { User } from "@/types/UserType";

export const register = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/login", data);
  return response.data;
};


export const getMe = async ():Promise<User> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await api.get("/me" ,{
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  const rawUser = response.data.data[0];
  // console.log("Raw user data:", rawUser);
  return {
    id: rawUser.id,
    firstName: rawUser.attributes.first_name,
    lastName: rawUser.attributes.last_name,
    email: rawUser.attributes.email,
    avatar: rawUser.avatar,
    type: rawUser.type, 
    role:rawUser.attributes.role,
    has_pharmacist_application: rawUser.attributes.pharmacist_application.has_pharmacist_application,
  };
}

export const logout = async () => {
  const token = localStorage.getItem("token");
  console.log(token)
  if (!token) throw new Error("No token found");

  const response = await api.post("/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Accept: "application/json",
    },
  });
  return response.data;
}
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

