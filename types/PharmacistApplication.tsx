export type PharmacistApplication = {
  id: number;
  name: string;
  email: string;
  user_type: string;
  date: string;
  licenseNumber: string;
  status:  "accepted" | "rejected" | "unread" | "pending";
  license_certificate: File | string;
  personal_photo: File | string;
  identity_document: File | string
};