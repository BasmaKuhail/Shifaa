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
  return {
    id: rawUser.id,
    firstName: rawUser.attributes.first_name,
    lastName: rawUser.attributes.last_name,
    email: rawUser.attributes.email,
    avatar: rawUser.avatar,
    type: rawUser.type, 
    user_type:rawUser.attributes.user_type,
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
export const switchToPharmasist = async (licenseNumber: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await api.post(
    "/pharmacist-application",
    {
      data: {
        type: "pharmacist-application", // 🔥 ADD THIS
        attributes: {
          license_number: licenseNumber,
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};