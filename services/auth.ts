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


