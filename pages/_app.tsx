import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Tajawal } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';
import { UserContext, UserProvider } from '@/contexts/UserContext';
import { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { BreadcrumbProvider } from '@/contexts/BreadcrumbContext';
import { useRouter } from 'next/router';


const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400','500','700'] });

const protectedRoutes = ["/dashboard"];



type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactElement) => ReactNode;
};
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { user, loading } = useContext(UserContext);
  useEffect(() => {
      const isProtected = protectedRoutes.includes(router.pathname);

      if (isProtected && user?.user_type === "pharmacist") {
        router.replace("/");
      }
    }, [router.pathname, user, loading]);
  const getLayout =
    (Component as NextPageWithLayout).getLayout ||
    ((page) => page); // default layout (no wrapper)
     return (
    <div className={tajawal.className}>
      
      <UserProvider>
        <BreadcrumbProvider>
          {getLayout(<Component {...pageProps} />)}
        </BreadcrumbProvider>
      </UserProvider>
      
    </div>);
}

export default appWithTranslation(MyApp);