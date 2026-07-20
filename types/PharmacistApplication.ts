import { StatusType } from "./Status";

export type PharmacyOwner = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export type PharmacyApplication = {
  id: number;
  pharmacy_name: string;
  address: string;
  date: string;
  phone_number: string;
  status: StatusType;
  owner: PharmacyOwner | null;
  health_license: ApplicationFile | null;
  logo: ApplicationFile | null;
};
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
