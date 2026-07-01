export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
    type: string;
    mobileNum?: string;
    location?: string;
    role: "user" | "pharmacist" | "admin"; 
    has_pharmacist_application: boolean;
    has_pharmacy_application: boolean;
}