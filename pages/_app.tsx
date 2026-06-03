import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Tajawal } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';
import { UserContext, UserProvider } from '@/contexts/UserContext';
import { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { BreadcrumbProvider } from '@/contexts/BreadcrumbContext';
import { useRouter } from 'next/router';

import { protectedRoutes, guestOnlyRoutes } from "@/config/routeRules";
import AuthGuard from '@/components/auth/AuthGuard';
import { AdminRequestProvider } from '@/contexts/AdminPharmacistsRequestsContext';

const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400','500','700'] });

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactElement) => ReactNode;
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as NextPageWithLayout).getLayout ||
    ((page) => page); // default layout (no wrapper)
     return (
    <div className={tajawal.className}>   
      <UserProvider>
        <AuthGuard>
          <BreadcrumbProvider>
          <AdminRequestProvider>
            {getLayout(<Component {...pageProps} />)}
            </AdminRequestProvider>
          </BreadcrumbProvider>
        </AuthGuard>
      </UserProvider>
      
    </div>);
}

export default appWithTranslation(MyApp);