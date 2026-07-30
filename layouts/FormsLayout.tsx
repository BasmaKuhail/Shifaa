export default function FormLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full flex flex-col overflow-x-hidden'>
        <div dir="rtl" className="bg-blue-100 w-full flex flex-col items-center justify-center px-4 md:px-15 lg:px-30 xl:px-50">
            <div 
                className="
                    mt-10
                    md:mb-20
                    bg-white rounded-normal w-full
                    p-10 
                    md:p-20
                    flex flex-col md:gap-10
                    shadow-lg"
            >

            {children} 
            </div>
        </div>
        </div>
  );
}