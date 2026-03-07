import Header from '@/components/header/Header';
import Home from '@/components/home/HomePage';
import SecondaryHeader from '@/components/home/secondaryHeader/SecondaryHeader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';


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
    <Home/>
  );
}
