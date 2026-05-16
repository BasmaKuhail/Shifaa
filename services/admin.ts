import api from "@/lib/api";

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
};

export type PharmacistApplication = {
  id: number;
  name: string;
  email: string;
  user_type: string;
  date: string;
  licenseNumber: string;
  status:  "accepted" | "rejected" | "unread" | "pending";
};
export const pharmacistApplications = async ():Promise<PharmacistApplication[]> => {
    const response = await 
        api.get<{
            status: string;
            data: PharmacistApplicationResponse[];
        }>("/admin/pharmacist-applications");

    return response.data.data.map((application) => ({
        id: application.id,
        name: application.user.name,
        email: application.user.email,
        user_type: application.user.user_type,
        date: new Date(application.created_at).toLocaleDateString("en-GB"),
        licenseNumber: application.license_number,
        status: application.employment_status as "accepted" | "rejected" | "unread" | "pending",
    }))
}