import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Tajawal } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';


const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400','500','700'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${tajawal.className}`}>
        <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(MyApp);