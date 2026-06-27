import { ApplicationFile } from "@/types/PharmacistApplication";

export type PharmacyApplicationResponse = {
  id: number;
  phone_number: string;
  status: string;
  address: string;
  created_at: string;
  pharmacist:{
    id:number;
    name:string;
  };
  health_license: ApplicationFile ;
  logo: ApplicationFile;
  
};