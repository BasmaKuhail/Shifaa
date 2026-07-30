import ErrorContatiner from "@/components/errors/ErrorContainer";
import error403 from "@/public/images/errors/error403.png"
import Head from "next/head";


export default function ForbiddenPage() {
  return (
    <>
        <Head>
          <title> خطأ | شفاء</title>
          <meta
            name="description"
            content="عذراً، الصفحة غير متاحة."
          />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <main>
    <ErrorContatiner image={error403} title="نأسف!" message="الصفحة التي تحاول الوصول إليها غير متاحة لكم"/>
    </main>
    </>

  );
}