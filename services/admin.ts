import api from "@/lib/api";
import { ApplicationFile, PharmacistApplication } from "@/types/PharmacistApplication";
import { File } from "buffer";

type PharmacistApplicationResponse = {
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
    attachments: [
    license_certificate: ApplicationFile ,
    personal_photo: ApplicationFile,
    identity_document: ApplicationFile 
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
        role: application.user.role,
        date: new Date(application.created_at).toLocaleDateString("en-GB"),
        phone_number: application.phone_number,
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
export const getAttachment = async (id:number):Promise<Blob>=> {
    const token = localStorage.getItem("token");

    const response = await api.get(`/admin/attachments/${id}` ,{
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  return response.data ;
}