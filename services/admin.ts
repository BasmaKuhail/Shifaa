import api from "@/lib/api";
import { PharmacistApplication } from "@/types/PharmacistApplication";

type PharmacistApplicationResponse = {
  id: number;
  license_number: string;
  employment_status: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    user_type: string;
  };
    attachments: [
    license_certificate: File | string,
    personal_photo: File | string,
    identity_document: File | string
  ]
};

export const pharmacistApplications = async ():Promise<PharmacistApplication[]> => {
    const response = await 
        api.get<{
            status: string;
            data: PharmacistApplicationResponse[];
        }>("/admin/pharmacist-applications");
    console.log(response.data);
    return response.data.data.map((application) => ({
        id: application.id,
        name: application.user.name,
        email: application.user.email,
        user_type: application.user.user_type,
        date: new Date(application.created_at).toLocaleDateString("en-GB"),
        licenseNumber: application.license_number,
        status: application.employment_status as "accepted" | "rejected" | "unread" | "pending",
        license_certificate: application.attachments[0], 
        personal_photo: application.attachments[1],
        identity_document: application.attachments[2]
    }))
}

export const acceptPharmacistApplication = async (id: number) => {
  const response = await api.post(`/admin/pharmacists/${id}/approve`);

  if (response.status !== 200) {
    throw new Error("Failed to accept pharmacist application");
  }else if (response.status === 200) {
    console.log("Pharmacist application accepted successfully");
  }else if (response.status === 404) {
    throw new Error("Pharmacist application not found");
  }else if (response.status === 500) { 
    throw new Error("Internal server error");
  }else { 
    throw new Error("Unexpected error");
  }
}

export const rejectPharmacistApplication = async (id: number) => {
  const response = await api.post(`/admin/pharmacists/${id}/reject`);

  if (response.status !== 200) {
    throw new Error("Failed to reject pharmacist application");
  }else if (response.status === 200) {
    console.log("Pharmacist application rejected successfully");
  }else if (response.status === 404) {
    throw new Error("Pharmacist application not found");
  }else if (response.status === 500) { 
    throw new Error("Internal server error");
  }else { 
    throw new Error("Unexpected error");
  }
}