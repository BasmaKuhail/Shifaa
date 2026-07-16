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


// export const getMe = async ():Promise<User> => {
//   const token = localStorage.getItem("token");
//   if (!token) throw new Error("No token found");

//   const response = await api.get("/me" ,{
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//     },
//   });
//   const rawUser = response.data.data[0];
//   // console.log("Raw user data:", response.data);
//   return {
//     id: rawUser.id,
//     firstName: rawUser.attributes.first_name,
//     lastName: rawUser.attributes.last_name,
//     email: rawUser.attributes.email,
//     avatar: rawUser.avatar,
//     type: rawUser.type, 
//     role:rawUser.attributes.role,
//     has_pharmacist_application: rawUser.attributes.pharmacist_application.has_pharmacist_application,
//     has_pharmacy_application: rawUser.attributes.pharmacy_application.has_pharmacy_application,
//   };
// }

export const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await api.post("/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Accept: "application/json",
    },
  });
  return response.data;
}


