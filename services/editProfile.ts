import api from "@/lib/api";

export const updateProfile = async (data: {
  first_name: string;
  last_name: string;
  email: string;
}) => {
  const response = await api.patch("/update-profile", data);
  return response.data;
};

export const changePassword = async (data: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await api.patch("/update-password", data);
  return response.data;
};