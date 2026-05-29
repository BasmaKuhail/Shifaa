import ErrorContatiner from "@/components/errors/ErrorContainer";
import error403 from "@/public/images/errors/error403.png"


export default function ForbiddenPage() {
  return (
    <ErrorContatiner image={error403} error={403} message="عذراً، ليس لديك صلاحية للوصول لهذه الصفحة"/>
    // <main className="min-h-screen flex items-center justify-center px-4">
      
    //   <div className="max-w-md text-center space-y-4">
    //     <h1 className="text-3xl font-bold text-black-400">403</h1>

    //     <p className="text-lg font-semibold text-black-400">
    //       ليس لديك صلاحية للوصول لهذه الصفحة
    //     </p>

    //     <p className="text-sm text-black-300">
    //       يبدو أن حسابك لا يملك الصلاحيات المطلوبة لفتح هذا القسم.
    //     </p>

    //     <Link
    //       href="/"
    //       className="inline-block rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white"
    //     >
    //       العودة للرئيسية
    //     </Link>
    //   </div>
    // </main>
  );
}