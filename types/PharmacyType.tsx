import { ApplicationFile } from "@/types/PharmacistApplication";

export type PharmacyTeamMember = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
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