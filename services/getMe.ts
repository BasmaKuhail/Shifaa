import api from "@/lib/api";
import { User } from "@/types/UserType";
import axios from "axios";

type GetMeApiResponse = {
  data: unknown[] | unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getRecord = (value: unknown): Record<string, unknown> | null =>
  isRecord(value) ? value : null;

const getNumber = (value: unknown): number | undefined =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;

const isAvatar = (value: unknown): value is NonNullable<User["avatar"]> =>
  isRecord(value) &&
  typeof value.id === "number" &&
  typeof value.type === "string" &&
  typeof value.mime_type === "string" &&
  typeof value.name === "string";

export const normalizeUser = (value: unknown): User | null => {
  let root = getRecord(value);
  if (!root) return null;

  const nestedData = root.data;
  if (Array.isArray(nestedData)) {
    root = getRecord(nestedData[0]);
  } else if (isRecord(nestedData)) {
    root = nestedData;
  }
  if (!root) return null;

  const attributes = getRecord(root.attributes) ?? root;
  const pharmacistApplication = getRecord(attributes.pharmacist_application);
  const pharmacyApplication = getRecord(attributes.pharmacy_application);

  const id = getNumber(root.id) ?? getNumber(attributes.id);
  const firstName = attributes.firstName ?? attributes.first_name;
  const lastName = attributes.lastName ?? attributes.last_name;
  const email = attributes.email;
  const role = attributes.role ?? root.role;

  if (
    id === undefined ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    (role !== "user" && role !== "pharmacist" && role !== "admin")
  ) {
    return null;
  }

  const rawAvatar = root.avatar ?? attributes.avatar;
  const pharmacyId =
    getNumber(attributes.pharmacy_id) ??
    getNumber(root.pharmacy_id) ??
    getNumber(pharmacyApplication?.pharmacy_id);

  return {
    id,
    firstName,
    lastName,
    email,
    avatar: isAvatar(rawAvatar) ? rawAvatar : null,
    type:
      typeof root.type === "string"
        ? root.type
        : typeof attributes.type === "string"
          ? attributes.type
          : "user",
    role,
    has_pharmacist_application:
      typeof attributes.has_pharmacist_application === "boolean"
        ? attributes.has_pharmacist_application
        : pharmacistApplication?.has_pharmacist_application === true,
    has_pharmacy_application:
      typeof attributes.has_pharmacy_application === "boolean"
        ? attributes.has_pharmacy_application
        : pharmacyApplication?.has_pharmacy_application === true,
    has_pharmacy:
      typeof attributes.has_pharmacy === "boolean"
        ? attributes.has_pharmacy
        : pharmacyApplication?.is_approved === true,
    pharmacy_id: pharmacyId,
    mobileNum:
      typeof attributes.mobileNum === "string"
        ? attributes.mobileNum
        : typeof attributes.mobile_num === "string"
          ? attributes.mobile_num
          : undefined,
    location:
      typeof attributes.location === "string" ? attributes.location : undefined,
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

    const user = normalizeUser(rawUser);
    if (!user) {
      throw new Error("The /me response contains invalid user data");
    }

    return user;
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
