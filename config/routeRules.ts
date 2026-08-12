export type UserRole = "user" | "pharmacist" | "admin";

export type RouteRule = {
    path: string;
    allowedRoles: UserRole[];
};

export const protectedRoutes: RouteRule[] = [
    {
        path: "/admin-dashboard",
        allowedRoles: ["admin"],
    },
    {
        path: "/create-pharmacy",
        allowedRoles: ["pharmacist"],
    },
    {
        path: "/switch-to-pharmacist",
        allowedRoles: ["user"],
    },
    {
        path: "/pharmacy-daqshboard",
        allowedRoles: ["pharmacist"],
    },
    {
        path: "/join-pharmacy-request",
        allowedRoles: ["pharmacist"],
    }
];

export const guestOnlyRoutes: string[] = [
    "/auth", "/"
];