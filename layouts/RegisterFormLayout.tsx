import LanguageSelector from "@/components/register/LangugeSelector";

export default function RegisterFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <div className="flex flex-col items-start justify-center w-[50%] gap-2">
        <div className="md:w-full w-[90%] max-w-3xl flex flex-col items-start">
            <div 
                className="
                    bg-white rounded-normal w-full
                    px-10 md:px-36
                    py-10
                    flex flex-col gap-5 md:gap-10
                    mt-5 md:mt-0
                    shadow-lg"
            >
                {children}
            </div>
          </div>
        {/* <LanguageSelector/> */}
        </div>
    </div>
  );
}