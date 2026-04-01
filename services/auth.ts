import api from "@/lib/api";

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


export const getMe = async () => {
  const response = await api.get("/me");
  return response.data;
}

export const logout = async () => {
  const res = await api.post("/logout");
  return res.data
}
