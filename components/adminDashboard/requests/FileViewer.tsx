import { ApplicationFile } from "@/types/PharmacistApplication";
import { getAttachment } from "@/services/admin";
import { useEffect, useState } from "react";

type FileViewerProps = {
    file: ApplicationFile | null;
    label: string;
    id: number;
};

export default function FileViewer({ file, label, id }: FileViewerProps) {
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        if (!file) return;

        let objectUrlToRevoke: string | null = null;

        const fetchAttachment = async () => {
            try {
                const blob = await getAttachment(id);

                if (!(blob instanceof Blob)) {
                    console.error("Expected Blob, received:", blob);
                    return;
                }

                const objectUrl = URL.createObjectURL(blob);
                objectUrlToRevoke = objectUrl;
                setObjectUrl(objectUrl);
                setIsLoading(false)
            } catch (error) {
                console.error("Failed to load attachment:", error);
            }
        };

        fetchAttachment();

        return () => {
            if (objectUrlToRevoke) {
                URL.revokeObjectURL(objectUrlToRevoke);
            }
        };
    }, [id, file]);

    if (!file) {
        return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">{label}</p>
            <p className="text-black-300 text-center">لا يوجد ملف</p>
        </div>
        );
    }

    const isImage = file.mime_type.startsWith("image/");
    const isPdf = file.mime_type === "application/pdf";

    if(isLoading){
        return<p className="text-inpt text-black-500 text-center">جاري تحميل الملف...</p>
    }
    return (
        <div className="flex flex-col gap-2">

        {objectUrl && isImage && (
            <img
            src={objectUrl}
            alt={file.name}
            className="h-20 w-full rounded-lg border object-cover"
            />
        )}

        {objectUrl && isPdf && (
            <iframe
            src={objectUrl}
            title={file.name}
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