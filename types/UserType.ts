export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
    type: string;
    mobileNum?: string;
    location?: string;
    user_type: string
}