import { showAlert } from "@/components/alerts/AlertContainer";
import api from "@/lib/api";
import { ApplicationFile } from "@/types/PharmacistApplication";
import {
  Pharmacy,
  PharmacyDataToUpdate,
  PharmacyTeamMember,
} from "@/types/PharmacyType";
import { StatusType } from "@/types/Status";
import axios from "axios";
import { address } from "framer-motion/client";



type PharmacyApiResponse = {
  id: number;
  name: string;
  phone: string;
  address: string;
  logo:string;
  status: string;
  team: PharmacyTeamMember[];
  attachments:[
      health_license: ApplicationFile | null,
      logo: null | ApplicationFile,
    ]
};

export const getPharmacyById = async (
  pharmacyId: number,
): Promise<Pharmacy> => {
  try {
    const response = await api.get<{
      data: PharmacyApiResponse[];
    }>("/pharmacies", {
      params: {
        "filter[id]": pharmacyId,
        include: "pharmacists,attachments",
      },
    });

    const pharmacy = response.data.data[0];

    if (!pharmacy) {
      throw new Error(`Pharmacy with ID ${pharmacyId} was not found`);
    }

    const owner = pharmacy.team.find(
      (member) => member.role === "owner",
    );

    const staff = pharmacy.team.filter(
      (member) => member.role !== "owner",
    );

    return {
      id:pharmacy.id,
      name:pharmacy.name,
      phone:pharmacy.phone,
      address:pharmacy.address,
      logo:pharmacy.attachments[1]?.url,
      owner:owner,
      staff:staff

    };
  } catch (error: unknown) {
    let errorMessage = "Failed to fetch pharmacy";

    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.message ??
        error.message ??
        errorMessage;

      console.error("Failed to fetch pharmacy", {
        url: error.config?.url,
        params: error.config?.params,
        status: error.response?.status,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
        response: error.response?.data,
      });
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    showAlert({
      type: "Error",
      title: "Error",
      message: errorMessage,
    });

    throw error;
  }
};
export const updatePharmacyData = async (
  pharmacyId: number,
  pharmacyData: PharmacyDataToUpdate
) => {
  const formData = new FormData();

  formData.append("_method", "PATCH");
  formData.append("name", pharmacyData.name);
  formData.append("address", pharmacyData.address);
  formData.append("phone", pharmacyData.phone);

  if (pharmacyData.logo instanceof File) {
    formData.append("logo", pharmacyData.logo);
  }

  const response = await api.post(`/pharmacy/${pharmacyId}`, formData);

  return response.data;
};

export const deletePharmacy = async (pharmacyId: number) => {
  const response = await api.delete(`/pharmacy/${pharmacyId}`);
  return response.data;
}

export const invitePharmacist = async (pharmId:number, pharmaciestId:number, message?:string) => {
  const response = await api.post("pharmacies/invite",
    {
      pharmacy_id:pharmId,
      pharmacist_id:pharmaciestId,
      message: message?.trim() || null,
    }
  )
}
export type InvitationData = {
  id: number;
  pharmacy_id: number;
  pharmacist_id: number;
  status: StatusType;
  type: "invitation";
  message: string | null;
  created_at: string;
  updated_at: string;
  responded_at: string | null;
  pharmacist: {
    id: number;
    phone_number: string;
    employment_status: string;
    created_at: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  };
};

type SentInvitationsResponse = {
  data: InvitationData[];
};

export const viewSentInvitations = async (
  pharmacyId: number,
): Promise<InvitationData[]> => {
  const response = await api.get<SentInvitationsResponse>(
    `pharmacies/${pharmacyId}/sent-invitations`,
  );

  return response.data.data;
};