import { ApplicationFile } from "@/types/PharmacistApplication";

export type Pharmacy = {
  id: number;
  name: string;
  address: string;
  owner: {id:number, name: string};
  phone: string;
  logo: ApplicationFile;
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
  // logo: ApplicationFile | null;
}