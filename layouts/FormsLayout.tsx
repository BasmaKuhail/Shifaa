import Breadcrumb from "@/components/Breadcrumb";
import Header from "@/components/header/Header";
import MobileHeader from "@/components/header/MobileHeader";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function FormLayout({ children }: { children: React.ReactNode }) {
    const { crumbs } = useBreadcrumb()
    return (
        <div dir="rtl" className="bg-blue-100 w-full flex flex-col gap-10 pb-20 py-20 items-center justify-center min-h-screen px-4 md:px-15 lg:px-30 xl:px-50">
        

        <div className="fixed top-0 left-0 w-full z-50 hidden lg:block">
            <Header />
        </div>
        {/* mobile view */}
        <div className="absolute inset-0 -top-full block lg:hidden w-full flex items-center justify-center">
            <MobileHeader/>
        </div>
        <div className="flex w-full mt-5">
            <Breadcrumb breadcrumbArr={crumbs}/>
        </div>
        
            <div 
                className="
                    bg-white rounded-normal w-full
                    p-10 
                    md:p-20
                    flex flex-col gap-5 md:gap-10
                    md:mt-0
                    shadow-lg"
            >

            {children} 
            </div>
        </div>
  );
}