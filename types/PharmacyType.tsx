import { ApplicationFile } from "@/types/PharmacistApplication";
import { StatusType } from "./Status";

export type PharmacyTeamMember = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
};

export type PharmacyApplicationApiResponse = {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  phone: string;
  status: StatusType;
  created_at: string;
  attachments: ApplicationFile[];
  team: PharmacyTeamMember[];
};

export type PharmacyApplication = {
  id: number;
  owner: PharmacyTeamMember | null;
  pharmacy_name: string;
  address: string;
  date: string;
  phone_number: string;
  status: StatusType;
  health_license: ApplicationFile | null;
  logo: ApplicationFile | null;
};
export type Pharmacy = {
  id: number;
  name: string;
  address: string;
  owner: PharmacyTeamMember | undefined;
  phone: string;
  logo: string | undefined,
  staff: PharmacyTeamMember[] | undefined 
}

export type pharmacyResponseType = {
    id: number;
    name: string;
    address: string;
    pharmacist: {id:number, name: string};
    phone: string;
    attachments:[
        health_license: ApplicationFile,
        logo: ApplicationFile
    ]
    
}

export type PharmacyDataToUpdate = {
  name: string;
  address: string;
  phone: string;
  logo: File | null | string;
}