import { useState } from "react";
import ExportXLS from "@/public/icons/pharmInfo/exportXLS";
import {
    getPharmacyMedicines,
    Medicine,
} from "@/services/medication";

type ExportMedicinesButtonProps = {
    pharmacyId?: number;
    pharmacyName?: string;
    medicines: Medicine[];
    search?: string;
    isLoading?: boolean;
};

const escapeXlsValue = (value: unknown) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

export default function ExportMedicinesButton({
    pharmacyId,
    pharmacyName,
    medicines,
    search = "",
    isLoading = false,
}: ExportMedicinesButtonProps) {
    const [isExporting, setIsExporting] = useState(false);

    const exportMedicines = async () => {
        if (isExporting || !pharmacyId) return;

        setIsExporting(true);

        try {
            const exportedMedicines: Medicine[] = [];
            let page = 1;
            let lastPage = 1;

            do {
                const response = await getPharmacyMedicines(pharmacyId, {
                    page,
                    perPage: 100,
                    search,
                });

                exportedMedicines.push(...response.data);
                lastPage = response.meta?.last_page ?? response.last_page ?? page;
                page += 1;
            } while (page <= lastPage);

            if (exportedMedicines.length === 0) return;

            const rows = exportedMedicines.map((medicine) => `
            <tr>
                <td>${escapeXlsValue(medicine.scientific_name)}</td>
                <td>${escapeXlsValue(medicine.trade_name)}</td>
                <td>${escapeXlsValue(medicine.dosage_form)}</td>
                <td>${escapeXlsValue(medicine.strength)}</td>
                <td>${escapeXlsValue(medicine.price)}</td>
                <td>${escapeXlsValue("متوفر")}</td>
            </tr>`).join("");

            // Excel supports an HTML table downloaded with the Excel MIME type as an .xls file.
            const workbook = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:x="urn:schemas-microsoft-com:office:excel"
                xmlns="http://www.w3.org/TR/REC-html40">
                <head><meta charset="UTF-8" /></head>
                <body dir="rtl">
                    <table border="1">
                        <thead>
                            <tr>
                                <th>الاسم العلمي</th>
                                <th>الاسم التجاري</th>
                                <th>شكل الجرعة</th>
                                <th>التركيز</th>
                                <th>السعر</th>
                                <th>التوفر</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </body>
            </html>`;

            const blob = new Blob([workbook], {
                type: "application/vnd.ms-excel;charset=utf-8",
            });
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `${pharmacyName}-medicines-${new Date().toLocaleString().replace(/[/:]/g, '-')}.xls`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(downloadUrl);
        } finally {
            setIsExporting(false);
        }
    };

    const hasMedicines = medicines.length > 0;

    return (
        <button
            type="button"
            onClick={exportMedicines}
            disabled={isLoading || isExporting || !hasMedicines || !pharmacyId}
            aria-label="تصدير الأدوية إلى ملف Excel"
            title={!hasMedicines ? "لا توجد أدوية للتصدير" : "تصدير إلى Excel"}
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        >
            <ExportXLS className="text-black-500 w-10 hover:text-blue-1000" />
        </button>
    );
}
