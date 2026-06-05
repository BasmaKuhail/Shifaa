import { ApplicationFile } from "@/types/PharmacistApplication";

type FileViewerProps = {
    file: ApplicationFile | null;
    label: string;
};

export default function FileViewer({ file, label }: FileViewerProps) {
    if (!file) {
        return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">{label}</p>
            <p className="text-black-300">لا يوجد ملف</p>
        </div>
        );
    }

    const fileUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace(
        "/api/v1",
        ""
    )}${file.url}`;

    const isImage =
        file.mime_type === "image/jpeg" ||
        file.mime_type === "image/jpg" ||
        file.mime_type === "image/png";

    const isPdf = file.mime_type === "application/pdf";

    return (
        <div className="flex flex-col gap-2">
            {/* <p className="font-semibold">{label}</p>

            {isImage && (
                <img
                    src={fileUrl}
                    alt={file.name}
                    className="w-48 h-48 object-cover rounded-lg border"
                />
            )}

            {isPdf && (
                <iframe
                src={fileUrl}
                title={file.name}
                className="w-full h-[500px] rounded-lg border"
                />
            )} */}

            <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
            >
                فتح الملف
            </a>
        </div>
    );
}