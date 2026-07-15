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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setObjectUrl(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const attachmentUrl = file.view_url ?? file.url;

    if (!attachmentUrl) {
      setObjectUrl(null);
      setIsLoading(false);
      setError("رابط الملف غير متوفر");
      return;
    }

    let objectUrlToRevoke: string | null = null;
    let isCancelled = false;

    const fetchAttachment = async () => {
      setIsLoading(true);
      setError(null);
      setObjectUrl(null);

      try {
        const blob = await getAttachment(attachmentUrl);

        if (isCancelled) {
          return;
        }

        const generatedObjectUrl = URL.createObjectURL(blob);
        objectUrlToRevoke = generatedObjectUrl;
        setObjectUrl(generatedObjectUrl);
      } catch (error) {
        if (!isCancelled) {
          setError("فشل تحميل الملف");
          console.error("Failed to load attachment:", {
            attachmentUrl,
            error,
          });
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchAttachment();

    return () => {
      isCancelled = true;

      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
  }, [id, file]);

  if (!file) {
    return (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{label}</p>
        <p className="text-center text-black-300">لا يوجد ملف</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <p className="text-center text-black-500">
        جاري تحميل الملف...
      </p>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-btn text-center text-red-500">{error}</p>
      </div>
    );
  }

  const isImage = file.mime_type.startsWith("image/");
  const isPdf = file.mime_type === "application/pdf";

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