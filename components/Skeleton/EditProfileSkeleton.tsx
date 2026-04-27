import FormLayout from "@/layouts/FormsLayout";

export default function EditProfileSkeleton() {
    return (
            <div className="flex flex-col gap-10 animate-pulse">
                {/* Title */}
                <div className="h-6 w-48 bg-gray-200 rounded" />

                {/* Avatar */}
                <div className="flex justify-center flex-col items-center gap-3">
                    <div className="w-35 h-35 bg-gray-200 rounded-full" />
                    <div className="w-35 h-10 bg-gray-200 rounded-md"/>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <div className="h-7 w-24 bg-gray-200 rounded" />
                            <div className="h-10 w-full bg-gray-200 rounded-md" />
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div className="flex flex-row items-center gap-3">
                    <div className="h-11 w-30 bg-gray-300 rounded-[10px]" />
                    <div className="h-7 w-20 bg-gray-200 rounded-[5px]" />
                </div>
                
            </div>
    );
}