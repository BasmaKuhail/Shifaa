import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import SearchInput from "./SearchInput";
import Text from "./Text";
import Dosage from "./DosageFormFilter";
import Price from "./PriceFilter";

type SearchHomeProps = {
  dosage?:string,
  isHome?: boolean;
  userInputProp?: string;
  onSearchChange?: (value: string) => void;
  setSelectedDosageForm?:Dispatch<SetStateAction<string>>
};

export default function SearchHome({
  dosage="",
  isHome = true,
  userInputProp = "",
  onSearchChange,
  setSelectedDosageForm
}: SearchHomeProps) {
  const [userInput, setUserInput] = useState("");
  const [dropDownOpened, setDropDownOpened] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [localDosageForm, setLocalDosageForm] =
    useState(dosage);
  const selectedDosageForm = isHome
    ? localDosageForm
    : dosage;

  const handleDosageChange: Dispatch<
    SetStateAction<string>
  > = (value) => {
    if (isHome) {
      setLocalDosageForm(value);
      return;
    }

    setSelectedDosageForm?.(value);
  };
  // const [selectedDosageForm, setSelectedDosageForm] = useState<string | null>();
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
          label="ابحث عن الأدوية"
          value={userInput}
          onChange={handleSearchChange}
          dosageForm={selectedDosageForm}
          setSelectedDosageForm={handleDosageChange}
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
          <Price
            title="السعر" 
            dropDownOpened={dropDownOpened}
            setDropDownOpened={setDropDownOpened}
          />
        </div>
      </div>
    </div>
  );
}
