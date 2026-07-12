import { ApplicationFile } from "@/types/PharmacistApplication";
import { getAttachment } from "@/services/admin";
import { useEffect, useState } from "react";
import { s } from "framer-motion/client";

type FileViewerProps = {
    imageUrl: string | null;
    label: string;
};

export default function FileViewer({ imageUrl, label }: FileViewerProps) {
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        setIsLoading(true)
        if (!imageUrl) return;

        let objectUrlToRevoke: string | null = null;

        const fetchAttachment = async () => {
            try {
                const blob = await getAttachment(imageUrl);

                if (!(blob instanceof Blob)) {
                    console.error("Expected Blob, received:", blob);
                    return;
                }

                const objectUrl = URL.createObjectURL(blob);
                objectUrlToRevoke = objectUrl;
                setObjectUrl(objectUrl);
                setIsLoading(false)
            } catch (error) {
                setError("فشل تحميل الملف")
                console.error("Failed to load attachment:", error);
            }
        };

        fetchAttachment();

        return () => {
            if (objectUrlToRevoke) {
                URL.revokeObjectURL(objectUrlToRevoke);
            }
        };
    }, [ imageUrl]);

    if (!imageUrl) {
        return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">{label}</p>
            <p className="text-black-300 text-center">لا يوجد ملف</p>
        </div>
        );
    }

    if(error){
        return (
            <div className="flex flex-col gap-2">
                <p className="text-red-500 text-center">{error}</p>
            </div>
        );
    }
    const isImage = imageUrl?.startsWith("image/");
    const isPdf = imageUrl?.endsWith("application/pdf");

    if(isLoading){
        return<p className="text-inpt text-black-500 text-center">جاري تحميل الملف...</p>
    }
    return (
        <div className="flex flex-col gap-2">

        {objectUrl && isImage && (
            <img
            src={objectUrl}
            // alt={file.name}
            className="h-20 w-full rounded-lg border object-cover"
            />
        )}

        {objectUrl && isPdf && (
            <iframe
                src={objectUrl}
                // title={file.name}
                className="h-40 w-full rounded-lg border"
            />
        )}

        {objectUrl && (
            <a
            href={objectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-blue-600 underline"
            >
            فتح الملف
            </a>
        )}
        </div>
    );
}