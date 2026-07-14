import { ApplicationFile } from "./PharmacistApplication";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: ApplicationFile | null;
    type: string;
    mobileNum?: string;
    location?: string;
    role: "user" | "pharmacist" | "admin"; 
    has_pharmacist_application: boolean;
    has_pharmacy_application: boolean;
    has_pharmacy: boolean;
    pharmacy_id: number | undefined;
}