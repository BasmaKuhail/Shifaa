import { useEffect, useRef, useState } from "react";

import SearchInput from "./SearchInput";
import Text from "./Text";
import Item from "./FilterItem";
import MinimumDistanceSlider from "./PriceSlider";

type SearchHomeProps = {
  isHome?: boolean;
  userInputProp?: string;
  onSearchChange?: (value: string) => void;
};

const filters = [
  {
    title: "الشكل الدوائي",
    elements: [
      "أقراص",
      "كبسولات",
      "شراب",
      "كريم / مرهم",
      "قطرات",
    ],
  },
  {
    title: "₪ السعر",
    elements: <MinimumDistanceSlider/>,
  },
  {
    title: "الموقع الجغرافي",
    elements: [],
  },
];

export default function SearchHome({
  isHome = true,
  userInputProp = "",
  onSearchChange,
}: SearchHomeProps) {
  const [userInput, setUserInput] = useState("");
  const [dropDownOpened, setDropDownOpened] =
    useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Keep the local input synchronized with the value
   * provided by the search page.
   */
  useEffect(() => {
    if (isHome) {
      return;
    }

    setUserInput(userInputProp);
  }, [isHome, userInputProp]);

  /**
   * Close filter dropdowns when clicking outside.
   */
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
        />

        <div
          ref={containerRef}
          className="hidden flex-row gap-5 md:flex"
        >
          {filters.map((filter) => (
            <Item
              key={filter.title}
              title={filter.title}
              elements={filter.elements}
              dropDownOpened={dropDownOpened}
              setDropDownOpened={setDropDownOpened}
            />
          ))}
        </div>
      </div>
    </div>
  );
}