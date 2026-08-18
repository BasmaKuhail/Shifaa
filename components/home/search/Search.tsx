import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import SearchInput from "./SearchInput";
import Text from "./Text";
import Dosage from "./DosageFormFilter";
import Price from "./PriceFilter";
import Location from "./LocationFilter";

type SearchHomeProps = {
  dosage?: string;
  isHome?: boolean;
  userInputProp?: string;
  onSearchChange?: (value: string) => void;
  setSelectedDosageForm?: Dispatch<SetStateAction<string>>;

  min?: number;
  max?: number;
  setMin?: Dispatch<SetStateAction<number>>;
  setMax?: Dispatch<SetStateAction<number>>;

  regionId?:number | undefined;
  setRegionId?:Dispatch<SetStateAction<number | undefined>>
  subregionId?:number | undefined;
  setSubregionId?:Dispatch<SetStateAction<number | undefined>>
};
const DEFAULT_MAX = 200;
const DEFAULT_MIN = 1;

export default function SearchHome({
  dosage="",
  isHome = true,
  userInputProp = "",
  onSearchChange,

  setSelectedDosageForm,

  min: minProp,
  max: maxProp,
  setMin: setMinProp,
  setMax: setMaxProp,

  regionId,
  setRegionId,
  subregionId,
  setSubregionId,
}: SearchHomeProps) {
  const [userInput, setUserInput] = useState("");
  const [dropDownOpened, setDropDownOpened] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [localMin, setLocalMin] = useState(DEFAULT_MIN);
  const [localMax, setLocalMax] = useState(DEFAULT_MAX);

  const min = isHome ? localMin : (minProp ?? DEFAULT_MIN);
  const max = isHome ? localMax : (maxProp ?? DEFAULT_MAX);

  const setMin = isHome ? setLocalMin : setMinProp;
  const setMax = isHome ? setLocalMax : setMaxProp;

  const [localDosageForm, setLocalDosageForm] =useState(dosage);
  const selectedDosageForm = isHome
    ? localDosageForm
    : dosage;

  const [localRegionId, setLocalRegionId] = useState<number | undefined>();
  const [localSubregionId, setLocalSubregionId] =useState<number | undefined>();

  const selectedRegionId = isHome ? localRegionId : regionId;
  const selectedSubregionId = isHome ? localSubregionId : subregionId;

  const handleRegionChange: Dispatch<SetStateAction<number | undefined>> = (value) => {
    if (isHome) {
      setLocalRegionId(value);
      return;
    }

    setRegionId?.(value);
  };

  const handleSubregionChange: Dispatch<
    SetStateAction<number | undefined>
  > = (value) => {
    if (isHome) {
      setLocalSubregionId(value);
      return;
    }

    setSubregionId?.(value);
  };

  const handleDosageChange: Dispatch<
    SetStateAction<string>
  > = (value) => {
    if (isHome) {
      setLocalDosageForm(value);
      return;
    }

    setSelectedDosageForm?.(value);
  };

  useEffect(() => {
    if (isHome) {
      return;
    }
    setUserInput(userInputProp);
  }, [isHome, userInputProp]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropDownOpened(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setUserInput(value);

    if (!isHome) {
      onSearchChange?.(value);
    }
  };

  return (
    <div
      dir="rtl"
      className="flex w-full flex-col gap-8 px-4 pt-4 md:px-8 lg:px-20 xl:px-30"
    >
      <Text
        intro="صحتك أولويتنا"
        titleBlack="ابحث عن دوائك"
        titleBlue="في ثوانٍ"
        sentence="ابحث، صَفِّ النتائج، قارن الأسعار، وتحقق من التوفر بالقرب منك"
      />

      <div className="flex w-full flex-col gap-4 lg:w-[90%] xl:w-[70%]">
        <SearchInput
          isHome={isHome}
          label="ابحث عن الأدوية"
          value={userInput}
          onChange={handleSearchChange}
          dosageForm={selectedDosageForm}
          setSelectedDosageForm={handleDosageChange}
          min={min}
          setMin={setMin}
          max={max}
          setMax={setMax}
          regionId={selectedRegionId}
          setRegionId={handleRegionChange}
          subregionId={selectedSubregionId}
          setSubregionId={handleSubregionChange}
        />

        <div
          ref={containerRef}
          className="hidden flex-row gap-5 md:flex"
        >
          <Dosage 
            title="الشكل الدوائي" 
            dropDownOpened={dropDownOpened}
            dosage={selectedDosageForm}
            setDropDownOpened={setDropDownOpened}
            setSelectedDosageForm={handleDosageChange}
          />
          {setMin && setMax && (
            <Price
              title="السعر"
              dropDownOpened={dropDownOpened}
              min={min}
              setMin={setMin}
              max={max}
              setMax={setMax}
              setDropDownOpened={setDropDownOpened}
            />
          )}
          <Location
            title="الموقع" 
            dropDownOpened={dropDownOpened}
            setDropDownOpened={setDropDownOpened}
            regionId={selectedRegionId}
            setRegionId={handleRegionChange}
            subregionId={selectedSubregionId}
            setSubregionId={handleSubregionChange}
            />
        </div>
      </div>
    </div>
  );
}
