import ErrorContatiner from "@/components/errors/ErrorContainer";
import error403 from "@/public/images/errors/error403.png"


export default function ForbiddenPage() {
  return (
    <ErrorContatiner image={error403} title="نأسف!" message="الصفحة التي تحاول الوصول إليها غير متاحة لكم"/>

  );
}