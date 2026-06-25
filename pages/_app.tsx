import '../styles/globals.css';
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from 'next/app';
import { Tajawal } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';
import { UserProvider } from '@/contexts/UserContext';
import { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { BreadcrumbProvider } from '@/contexts/BreadcrumbContext';

import AuthGuard from '@/components/auth/AuthGuard';
import { AdminRequestProvider } from '@/contexts/AdminPharmacistsRequestsContext';
import { AppToastContainer } from '@/components/alerts/AlertContainer';
import Head from 'next/head';

const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400','500','700'], variable: "--font-tajawal"});

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactElement) => ReactNode;
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as NextPageWithLayout).getLayout ||
    ((page) => page); // default layout (no wrapper)
    useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service worker registered:", registration.scope);
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error);
        });
    });
  }, []);
     return (
    <div className={`${tajawal.className} ${tajawal.variable}`}>   
    <Head>
      <title>Shifaa</title>
      <meta name="description" content="Shifaa web application" />
    </Head>
      <UserProvider>
        <AuthGuard>
          <BreadcrumbProvider>
          <AdminRequestProvider>
            {getLayout(<Component {...pageProps} />)}
            <AppToastContainer/>
            </AdminRequestProvider>
          </BreadcrumbProvider>
        </AuthGuard>
      </UserProvider>
      
    </div>);
}

export default appWithTranslation(MyApp);