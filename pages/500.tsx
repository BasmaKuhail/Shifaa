import ErrorContatiner from "@/components/errors/ErrorContainer";
import error500 from "@/public/images/errors/error500.png"
import Head from "next/head";


export default function NotFoundPage() {
  return (
        <>
        <Head>
          <title> خطأ | شفاء</title>
          <meta
            name="description"
            content="عذراً، حدث خطأ."
          />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <main>
    <ErrorContatiner image={error500} title="حدث خطأ داخلي" message="نأسف، نعمل حالياً على حل المشكلة يرجى المحاولة لاحقاً."/>
  </main></>
  );
}