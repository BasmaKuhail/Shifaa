import { ApplicationFile } from "@/types/PharmacistApplication";

export type PharmacyApplicationResponse = {
  id: number;
  phone: string;
  name:string;
  status: string;
  sub_region_id: number;
  address: string;
  created_at: string;
  pharmacist:{
    id:number;
    name:string;
  };
  attachments: [
    health_license: ApplicationFile,
    logo: ApplicationFile
  ];
};
