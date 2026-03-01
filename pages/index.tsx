import Header from '@/components/header/Header';
import SecondaryHeader from '@/components/secondaryHeader/SecondaryHeader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import Image from "next/image";

import homeBgImg from "@/public/images/homeBgImg.png"
import SearchHome from '@/components/search/Search';
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // load 'common' namespace
    },
  };
}

export default function Index() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const nextLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <div className='w-full flex flex-col'>
    <div className="fixed top-0 left-0 w-full z-50"><Header /></div>
    
    
    <div className="bg-blue-100 relative inline-block">
      <Image
        src={homeBgImg}
        alt='home '
        width={610.77}
        className='block pt-[50px]'/>
      <div className="absolute inset-0 z-10 pt-[75px]">
      <SecondaryHeader />
      <div className='mt-20'>
        <SearchHome />
      </div>
      
      </div>
    </div>

      {/* <h1>{t('welcome')}</h1>
      <button
        onClick={() =>
          router.push({ pathname, query }, asPath, { locale: nextLocale })
        }
      >
        Switch to {nextLocale}
      </button> */}
    </div>
  );
}
