import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Tajawal } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';
import { UserContext, UserProvider } from '@/contexts/UserContext';
import { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { BreadcrumbProvider } from '@/contexts/BreadcrumbContext';
import { useRouter } from 'next/router';


const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400','500','700'] });

const protectedRoutes = [{route:"/switch-to-pharmacist", type:'pharmacist'}];



type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactElement) => ReactNode;
};

function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (loading) return;

    const currentRoute = router.pathname;
    const routeObj = protectedRoutes.find(
      (item) => item.route === currentRoute
    );

    console.log("currentRoute" + currentRoute)
    console.log("routeObj" + routeObj)
    if (!routeObj) return;

    const userType = user?.user_type;
    console.log("userType" + userType)
    // 🔥 Check access
    if (!user || userType !== routeObj.type) {
      router.replace("/");
    }
  }, [router.pathname, user, loading]);

  return <>{children}</>;
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
            {getLayout(<Component {...pageProps} />)}
          </BreadcrumbProvider>
        </AuthGuard>
      </UserProvider>
      
    </div>);
}

export default appWithTranslation(MyApp);