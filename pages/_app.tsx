import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Tajawal } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';
import { UserProvider } from '@/contexts/UserContext';
import { ReactElement, ReactNode } from 'react';
import { BreadcrumbProvider } from '@/contexts/BreadcrumbContext';


const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400','500','700'] });

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactElement) => ReactNode;
};
function MyApp({ Component, pageProps }: AppProps) {
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