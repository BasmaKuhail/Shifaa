import { ApplicationFile } from "@/types/PharmacistApplication";

export type PharmacistApplicationResponse = {
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