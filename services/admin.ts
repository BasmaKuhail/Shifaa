import api from "@/lib/api";
import { ApplicationFile, PharmacistApplication } from "@/types/PharmacistApplication";
import { PharmacistApplicationResponse } from "@/types/PharmacistApplicationResponse";
import { PharmacyApplication, PharmacyApplicationApiResponse } from "@/types/PharmacyType";
import { StatusType } from "@/types/Status";

// pharmacist
export const pharmacistApplications = async ():Promise<PharmacistApplication[]> => {
    const response = await 
        api.get<{
            status: string;
            data: PharmacistApplicationResponse[];
        }>("/admin/pharmacist-applications",
          {params:{include:"attachments"}});
    console.log(response.data.data);

    return response.data.data.map((application) => ({
        id: application.id,
        name: application.user.name,
        email: application.user.email,
        role: application.user.role,
        date: new Date(application.created_at).toLocaleDateString("en-GB"),
        phone_number: application.phone_number,
        status: application.employment_status as StatusType,
        license_certificate: application.attachments[0], 
        personal_photo: application.attachments[1],
        identity_document: application.attachments[2]
    }))
}

export const acceptPharmacistApplication = async (id: number) => {
  const response = await api.patch(`/admin/pharmacists/${id}/approve`);

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

export const rejectPharmacistApplication = async (
  id: number,
  rejectMsg: string
) => {
  try {
    const response = await api.patch(
      `/admin/pharmacists/${id}/reject`,
      {
        rejection_reason: rejectMsg,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Reject pharmacist application failed:", {
      status: error.response?.status,
      data: error.response?.data,
    });

    throw error;
  }
};

export const deletePharmacistApplication = async (id: number) => {
  const response = await api.delete(`/admin/pharmacists/${id}`);

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
export const getAttachment = async (url:string):Promise<Blob>=> {
    const token = localStorage.getItem("token");

    const response = await api.get(`${url}`,{
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  return response.data ;
}

// pharmcy
export const pharmacyApplications = async (): Promise<
  PharmacyApplication[]
> => {
  const response = await api.get<{
    status: string;
    data: PharmacyApplicationApiResponse[];
  }>("/admin/pharmacy-applications", {
    params: {
      include: "attachments,pharmacists",
    },
  });
  console.log(response.data)
  return response.data.data.map((application) => ({
    id: application.id,
    owner:
      application.team.find(
        (member) => member.id === application.owner_id,
      ) ?? null,
    pharmacy_name: application.name,
    owner_name:application.owner_name,
    address: application.address,
    date: new Date(application.created_at).toLocaleDateString("en-GB"),
    phone_number: application.phone,
    status: application.status,
    health_license: application.attachments[0] ?? null,
    logo: application.attachments[1] ?? null,
  }));
};

export const acceptPharmacyApplication = async (application_id: number) => {
  const response = await api.patch(`/admin/pharmacy/${application_id}/approve`);

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

export const rejectPharmacyApplication = async (
  application_id: number,
  rejectMsg: string
) => {
  try {
    const response = await api.patch(
      `/admin/pharmacy/${application_id}/reject`,
      {
        rejection_reason: rejectMsg,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Reject pharmacist application failed:", {
      status: error.response?.status,
      data: error.response?.data,
    });

    throw error;
  }
};

export const deletePharmacyApplication = async (application_id: number) => {
  const response = await api.delete(`/admin/pharmacy/${application_id}`);

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