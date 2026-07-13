import ErrorContatiner from "@/components/errors/ErrorContainer";
import error500 from "@/public/images/errors/error500.png"


export default function NotFoundPage() {
  return (
    <ErrorContatiner image={error500} title="حدث خطأ داخلي" message="نأسف، نعمل حالياً على حل المشكلة يرجى المحاولة لاحقاً."/>
  );
}