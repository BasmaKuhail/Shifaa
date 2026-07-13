import ErrorContatiner from "@/components/errors/ErrorContainer";
import error404 from "@/public/images/errors/error404.png"


export default function NotFoundPage() {
  return (
    <ErrorContatiner image={error404} title="لم يتم العثور على الصفحة" message="دعنا نعيدك إلى الصفحة الرئيسية"/>
  );
}