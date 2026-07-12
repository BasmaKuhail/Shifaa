import { StatusType } from "./Status";

export type ApplicationFile = {
  id: number;
  type: string;
  mime_type: string;
  name: string;
  url?: string;
  view_url?: string;
};

export type PharmacistApplication = {
  id: number;
  name: string;
  email: string;
  role: string;
  date: string;
  phone_number:string;
  status:  StatusType;
  license_certificate: ApplicationFile | undefined;
  personal_photo: ApplicationFile | undefined;
  identity_document: ApplicationFile | undefined;
};

export type PharmacyApplication = {
  id: number;
  pharmacy_name:string;
  pharmacist_name:string;
  date: string;
  phone_number:string;
  status:  StatusType;
  address:string;
  health_license: ApplicationFile | undefined;
  logo: ApplicationFile | undefined;
};