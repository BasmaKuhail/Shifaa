import ErrorContatiner from "@/components/errors/ErrorContainer";
import error404 from "@/public/images/errors/error404.png"
import Head from "next/head";


export default function NotFoundPage() {
  return (
        <>
        <Head>
          <title> خطأ | شفاء</title>
          <meta
            name="description"
            content="عذراً، لم يتم ايجاد الصفة."
          />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <main>
    <ErrorContatiner image={error404} title="لم يتم العثور على الصفحة" message="دعنا نعيدك إلى الصفحة الرئيسية"/>
    </main></>
  );
}