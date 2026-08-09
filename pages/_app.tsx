import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { Tajawal } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { UserProvider } from "@/contexts/UserContext";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";
import { AdminRequestProvider } from "@/contexts/AdminPharmacistsRequestsContext";
import { AdminPharmacyRequestProvider } from "@/contexts/AdminPharmcyRequestsContext";
import { PharmacyProvider } from "@/contexts/PharmacyDataContext";
import { OverlayProvider } from "@/contexts/OverlayContext";

import AuthGuard from "@/components/auth/AuthGuard";
import { AppToastContainer } from "@/components/alerts/AlertContainer";
import { MedicinesProvider } from "@/contexts/MedicinesContext";
import PwaRegistration from "@/components/PwaRegistration";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

type NextPageWithLayout = AppProps["Component"] & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const router = useRouter();

  const getLayout =
    Component.getLayout ?? ((page: ReactElement) => page);

  const page = getLayout(
    <Component {...pageProps} />,
  );

  const isAdminRoute = router.pathname.startsWith("/admin");
  const isPharmacyRoute =
    router.pathname.startsWith("/pharmacy");

  const pageWithRouteProviders = isAdminRoute ? (
    <AdminRequestProvider>
      <AdminPharmacyRequestProvider>
        {page}
      </AdminPharmacyRequestProvider>
    </AdminRequestProvider>
  ) : isPharmacyRoute ? (
    <PharmacyProvider>
      {page}
    </PharmacyProvider>
  ) : (
    page
  );

  return (
    <div
      className={`${tajawal.className} ${tajawal.variable}`}
    >
      <Head>
          <title>شفاء</title>
          <meta
            name="description"
            content=".تصفح منصة شفاء"
          />
          <meta name="robots" content="index, nofollow" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Shifaa" />
        </Head>

      {/* <PwaRegistration /> */}
      <UserProvider>
        <OverlayProvider>
          <AuthGuard>
            <BreadcrumbProvider>
              <MedicinesProvider>
                {pageWithRouteProviders}
              </MedicinesProvider>
              <AppToastContainer />
            </BreadcrumbProvider>
          </AuthGuard>
        </OverlayProvider>
      </UserProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);
