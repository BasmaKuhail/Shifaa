import { showAlert } from "@/components/alerts/AlertContainer";
import api from "@/lib/api";
import { StatusType } from "@/types/Status";
import axios from "axios";
import { body } from "framer-motion/client";

export type InvitationPharmacy = {
  id: number;
  name: string;
  address: string;
  phone: string;
  status: string;
  owner_id: number;
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  created_at: string;
};

export type Invitation = {
  id: number;
  pharmacy_id: number;
  pharmacist_id: number;
  message: string | null;
  status: StatusType;
  type: "invitation";
  created_at: string;
  updated_at: string;
  responded_at: string | null;
  pharmacy: InvitationPharmacy;
};
type ReceivedInvitationsResponse = {
  data: Invitation[];
};
export const getReceivedInvitations = async (): Promise<Invitation[]> => {
  try {
    const response = await api.get<ReceivedInvitationsResponse>(
      "/pharmacist/received-invitations",
    );
    console.log(response.data)
    return Array.isArray(response.data.data)
      ? response.data.data
      : [];
  } catch (error: unknown) {
    let errorMessage = "Failed to fetch invitations";

    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.message ??
        error.message ??
        errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    showAlert({
      type: "Error",
      title: "Error",
      message: errorMessage,
    });

    throw new Error(errorMessage, {
      cause: error,
    });
  }
};

export const interactIvitaion = async (id:number, action:"accepted" | "rejected") => {
  const token = localStorage.getItem("token");
  const response = await api.put(
    `/invitations/${id}/respond`,
    {
      action,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}