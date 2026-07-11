import api from "@/lib/api";
import { User } from "@/types/UserType";
import axios from "axios";

type GetMeApiResponse = {
  data: ApiUser[] | ApiUser;
};

type ApiUser = {
  id: number;
  type: string;
  avatar?: User["avatar"] | null;
  attributes: {
    first_name: string;
    last_name: string;
    email: string;
    role: User["role"];
    pharmacist_application?: {
      has_pharmacist_application?: boolean;
    } | null;
    pharmacy_application?: {
      has_pharmacy_application?: boolean;
      is_approved?: boolean;
    } | null;
    
  };
};

export const getMe = async (): Promise<User> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await api.get<GetMeApiResponse>("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const responseData = response.data.data;
    const rawUser = Array.isArray(responseData)
      ? responseData[0]
      : responseData;

    if (!rawUser) {
      throw new Error("The /me endpoint returned no user data");
    }

    const attributes = rawUser.attributes;

    if (!attributes) {
      throw new Error("The /me response is missing user attributes");
    }

    return {
      id: rawUser.id,
      firstName: attributes.first_name,
      lastName: attributes.last_name,
      email: attributes.email,
      avatar: rawUser.avatar ?? null,
      type: rawUser.type,
      role: attributes.role,
      has_pharmacist_application:
        attributes.pharmacist_application?.has_pharmacist_application ??
        false,
      has_pharmacy_application:
        attributes.pharmacy_application?.has_pharmacy_application ?? false,
      has_pharmacy: attributes.pharmacy_application?.is_approved ?? false,

    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to fetch authenticated user", {
        status: error.response?.status,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
      });
    }

    throw error;
  }
};