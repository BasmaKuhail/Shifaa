import { ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/contexts/UserContext";
import { protectedRoutes, guestOnlyRoutes, UserRole } from "@/config/routeRules";
import { matchesRoute } from "@/utils/matchRoute";

type AuthGuardProps = {
    children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (loading || !router.isReady) return;

        const currentPath = router.asPath.split("?")[0];

        const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
            matchesRoute(currentPath, route)
        );

        if (isGuestOnlyRoute && user) {
            router.replace("/");
            return;
        }

        const matchedProtectedRoute = protectedRoutes.find((route) =>
            matchesRoute(currentPath, route.path)
        );

        if (!matchedProtectedRoute) return;

        if (!user) {
            router.replace(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
            return;
        }

        const userRole = user.role as UserRole;

        if (!matchedProtectedRoute.allowedRoles.includes(userRole)) {
            router.replace("/403"); //direct to 403 soon (user not allowed for this route)
        }
    }, [router.isReady, router.asPath, user, loading]);

    return <>{children}</>;
}