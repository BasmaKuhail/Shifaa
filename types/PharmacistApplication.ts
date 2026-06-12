import { StatusType } from "./Status";

export type ApplicationFile = {
  id: number;
  name: string;
  type: string;
  mime_type: "image/jpeg" | "image/jpg" | "image/png" | "application/pdf";
  url: string;
};

export type PharmacistApplication = {
  id: number;
  name: string;
  email: string;
  role: string;
  date: string;
  licenseNumber: string;
  status:  StatusType;
  license_certificate: ApplicationFile | undefined;
  personal_photo: ApplicationFile | undefined;
  identity_document: ApplicationFile | undefined;
};