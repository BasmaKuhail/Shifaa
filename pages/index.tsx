import Header from '@/components/header/Header';
import SecondaryHeader from '@/components/secondaryHeader/SecondaryHeader';
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
    <>
    <Header />
    <div className="flex flex-row-reverse px-4 md:px-8 lg:px-30 pt-4 bg-blue-100">
      <SecondaryHeader />
    </div>

      {/* <h1>{t('welcome')}</h1>
      <button
        onClick={() =>
          router.push({ pathname, query }, asPath, { locale: nextLocale })
        }
      >
        Switch to {nextLocale}
      </button> */}
    </>
  );
}
