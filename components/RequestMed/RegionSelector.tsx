import { getRegions, getSubRegions } from "@/services/regions";
import { Region } from "@/types/RegionType";
import { useEffect, useState } from "react";

export default function Regions({isRequired=true, regionId, setRegionId, subRegionId, setSubRegionId}: {isRequired?:boolean, regionId?: string, setRegionId: (id: string | undefined) => void, subRegionId?: string, setSubRegionId: (id: string | undefined) => void}) {
    const [regions, setRegions] = useState<Region[]>([]);
    const [subRegions, setSubRegions] = useState<Region[]>([]);
    const [subRegionsLoading, setSubRegionsLoading] = useState(false);

    useEffect(() => {
        void getRegions().then(setRegions).catch((error) => {
            console.error("Failed to load regions", error);
        });
    }, []);

    useEffect(() => {
        if (!regionId) {
            setSubRegions([]);
            return;
        }
        setSubRegionsLoading(true);
        void getSubRegions(Number(regionId))
            .then(setSubRegions)
            .catch((error) => console.error("Failed to load sub-regions", error))
            .finally(() => setSubRegionsLoading(false));
    }, [regionId]);

    const handleRegionChange = async (regionId: string) => {
        setRegionId(regionId);
        setSubRegions([]);
        if (!regionId) return;

        try {
            setSubRegionsLoading(true);
            setSubRegions(await getSubRegions(Number(regionId)));
        } catch (error) {
            console.error("Failed to load sub-regions", error);
        } finally {
            setSubRegionsLoading(false);
            }
        };
    return (
        <>
            <div className="flex flex-col gap-2" dir="rtl">
                <nav className='flex gap-2 flex-row items-center'>
                    <label className="text-sm font-bold text-right">المنطقة الرئيسية</label>
                    {isRequired && <span className="text-red-500 text-btn">*</span>}
                    {!isRequired && <span className="text-gray-400 text-input">(اختياري)</span>}
                </nav>
                <select
                    value={regionId || ""}
                    onChange={(event) => void handleRegionChange(event.target.value)}
                    className="border border-[#D1D1D1] rounded-inpt p-2 w-full text-right h-[52px] md:h-[45px] focus:outline-none focus:border-[#1A71F6]"
                >
                    <option value="">{!regions ? "جاري التحميل..." : "اختر المنطقة الرئيسية"}</option>
                    {regions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}
                </select>
            </div>
            <div className="flex flex-col gap-2" dir="rtl">
                <nav className='flex gap-2 flex-row items-center'>
                    <label className="text-sm font-bold text-right">المنطقة الفرعية</label>
                    {isRequired && <span className="text-red-500 text-btn">*</span>}
                    {!isRequired && <span className="text-gray-400 text-input">(اختياري)</span>}
                </nav>
                    <select
                        value={subRegionId || ""}
                        onChange={(event) => setSubRegionId(event.target.value)}
                        disabled={!regionId || subRegionsLoading}
                        className="border border-[#D1D1D1] rounded-inpt p-2 w-full text-right h-[52px] md:h-[45px] focus:outline-none focus:border-[#1A71F6] disabled:bg-gray-100"
                    >
                        <option value="">{subRegionsLoading ? "جاري التحميل..." : "اختر المنطقة الفرعية"}</option>
                            {subRegions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}
                    </select>
                </div>
        </>
    )
}