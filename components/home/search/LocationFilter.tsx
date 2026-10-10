import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

import filterArrowDown from "@/public/icons/filterArrowDown.svg";
import { showAlert } from "@/components/alerts/AlertContainer";
import { getRegions, getSubRegions } from "@/services/regions";
import { Region } from "@/types/RegionType";
import DropDownMenu from "./DropDownMenu";

type FilterProps = {
  title: string;
  dropDownOpened: string | null;
  setDropDownOpened: Dispatch<SetStateAction<string | null>>;
  regionId:number | undefined;
  setRegionId:Dispatch<SetStateAction<number | undefined>>
  subregionId:number | undefined;
  setSubregionId:Dispatch<SetStateAction<number | undefined>>
};

export default function Location({
  title,
  dropDownOpened,
  setDropDownOpened,
  regionId,
  setRegionId,
  subregionId,
  setSubregionId,
}: FilterProps) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [subRegions, setSubRegions] = useState<Region[]>([]);
//   const [selectedRegionId, setSelectedRegionId] = useState<string>("");
//   const [selectedSubRegionId, setSelectedSubRegionId] = useState<string>("");
  const [regionsLoading, setRegionsLoading] = useState(true);
  const [subRegionsLoading, setSubRegionsLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const loadRegions = async () => {
      try {
        setRegionsLoading(true);
        const data = await getRegions();
        if (active) setRegions(data);
      } catch (error) {
        console.error("Failed to load regions", error);
        if (active) {
          showAlert({
            type: "Error",
            title: "خطأ",
            message: "تعذر تحميل المناطق",
          });
        }
      } finally {
        if (active) setRegionsLoading(false);
      }
    };

    void loadRegions();
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
  if (regionId === undefined) {
    setSubRegions([]);
    return;
  }

  let active = true;

  const loadSubRegions = async () => {
    try {
      setSubRegionsLoading(true);

      const data = await getSubRegions(regionId);

      if (active) {
        setSubRegions(data);
      }
    } catch (error) {
      console.error("Failed to load sub-regions", error);
    } finally {
      if (active) {
        setSubRegionsLoading(false);
      }
    }
  };

  void loadSubRegions();

  return () => {
    active = false;
  };
}, [regionId]);

const handleRegionChange = (
  selectedRegionId: number | undefined,
) => {
  setRegionId(selectedRegionId);
  setSubregionId(undefined);
};

  const handleReset = () => {
    setRegionId(undefined);
    setSubregionId(undefined);
    setSubRegions([]);
  };

  const handleClick = () => {
    setDropDownOpened((previous) => (previous === title ? null : title));
  };

  return (
    <div dir="ltr" className="relative flex flex-col">
      <button
        type="button"
        aria-expanded={dropDownOpened === title}
        className={`group flex w-fit cursor-pointer flex-row-reverse gap-3 rounded-[30px] p-2 px-4 transition duration-200
          ${
            dropDownOpened === title
              ? "bg-gradient-to-r from-[#329CCB] to-[#668DCA] text-white"
              : "bg-white text-black-600"
          }
          hover:bg-gradient-to-r hover:from-[#329CCB] hover:to-[#668DCA] hover:text-white`}
        onClick={handleClick}
      >
        <Image
          src={filterArrowDown}
          width={9}
          alt=""
          className={`transition duration-200 ${
            dropDownOpened === title ? "brightness-0 invert" : ""
          } group-hover:brightness-0 group-hover:invert`}
        />
        <span className="text-inpt">{title}</span>
      </button>

      {dropDownOpened === title && (
        <div className="absolute right-0 top-full z-10">
          <DropDownMenu
            title="الموقع الجغرافي"
            action={
              <button
                type="button"
                onClick={handleReset}
                className="text-xs hover:underline"
              >
                إعادة الضبط
              </button>
            }
          >
            {regionsLoading ? (
              <p className="px-3 text-inpt">جاري التحميل...</p>
            ) : regions.length === 0 ? (
              <p className="px-3 text-inpt">لا توجد مناطق</p>
            ) : (
              regions.map((region) => (
                <div key={region.id} className="flex flex-col gap-2 px-3">
                  <label className="flex cursor-pointer flex-row items-center gap-2">
                    <input
                      className="scale-150"
                      name="location-region"
                      type="checkbox"
                      value={region.id}
                      checked={regionId === region.id}
                      onChange={() =>
                        void handleRegionChange(
                            regionId === region.id ? undefined : region.id
                        )
                    }
                    />
                    <span className="text-inpt">{region.name}</span>
                  </label>

                  {regionId === region.id && (
                    <div className="flex flex-col gap-2 pb-1 ps-5">
                      {subRegionsLoading ? (
                        <span className="text-xs text-gray-500">
                          جاري تحميل المناطق الفرعية...
                        </span>
                      ) : subRegions.length === 0 ? (
                        <span className="text-xs text-gray-500">
                          لا توجد مناطق فرعية
                        </span>
                      ) : (
                        subRegions.map((subRegion) => (
                          <label
                            key={subRegion.id}
                            className="flex cursor-pointer flex-row items-center gap-2"
                          >
                            <input
                              className="scale-150"
                              name="location-sub-region"
                              type="checkbox"
                              value={subRegion.id}
                              checked={
                                subregionId === subRegion.id
                              }
                              onChange={() =>
                                setSubregionId((current) =>
                                  current === subRegion.id
                                    ? undefined
                                    : subRegion.id,
                                )
                              }
                            />
                            <span className="text-inpt">{subRegion.name}</span>
                          </label>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </DropDownMenu>
        </div>
      )}
    </div>
  );
}
