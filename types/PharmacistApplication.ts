import { PaginationLink, PharmacistApplicationsPagination } from "@/services/admin";
import { PharmacistApplicationResponse } from "./PharmacistApplicationResponse";
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
  owner_name?:string
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
  phone_number: string;
  status: StatusType;
  license_certificate?: PharmacistApplicationResponse["attachments"][number];
  personal_photo?: PharmacistApplicationResponse["attachments"][number];
  identity_document?: PharmacistApplicationResponse["attachments"][number];
};

type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type PharmacistApplicationsApiResponse = {
  data: PharmacistApplicationResponse[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
};

export type PharmacistApplicationsResult = {
  applications: PharmacistApplication[];
  pagination: PharmacistApplicationsPagination;
};