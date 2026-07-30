import ErrorMsg from "@/components/register/ErrorMsg";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type DropdownOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type DropdownProps = {
  label: string;
  placeholder: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  onSearchChange?: (search: string) => void;
  isTrue: boolean;
  editable?: boolean;
  loading?: boolean;
  errorMsg?: string;
  noResultsText?: string;
};

const Dropdown = React.memo(
  ({
    label,
    placeholder,
    value,
    options,
    onChange,
    onSearchChange,
    isTrue,
    editable = true,
    loading = false,
    errorMsg,
    noResultsText = "لا توجد نتائج",
  }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] =
      useState(-1);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedOption = useMemo(
      () =>
        options.find(
          (option) => option.value === value,
        ),
      [options, value],
    );

    useEffect(() => {
      const handleOutsideClick = (
        event: MouseEvent,
      ) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            event.target as Node,
          )
        ) {
          closeDropdown();
        }
      };

      document.addEventListener(
        "mousedown",
        handleOutsideClick,
      );

      return () => {
        document.removeEventListener(
          "mousedown",
          handleOutsideClick,
        );
      };
    }, []);

    useEffect(() => {
      if (isOpen) {
        inputRef.current?.focus();
      }
    }, [isOpen]);

    const openDropdown = () => {
      if (!editable) {
        return;
      }

      setIsOpen(true);
    };

    const closeDropdown = () => {
      setIsOpen(false);
      setSearchQuery("");
      setHighlightedIndex(-1);
    };

    const handleSearchChange = (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      const nextSearchQuery = event.target.value;

      setSearchQuery(nextSearchQuery);
      setIsOpen(true);
      setHighlightedIndex(-1);

      onSearchChange?.(nextSearchQuery);
    };

    const handleSelect = (
      option: DropdownOption,
    ) => {
      if (option.disabled) {
        return;
      }

      onChange(option.value);
      setSearchQuery("");
      setHighlightedIndex(-1);
      setIsOpen(false);
    };

    const findNextEnabledIndex = (
      startIndex: number,
      direction: 1 | -1,
    ) => {
      if (options.length === 0) {
        return -1;
      }

      let nextIndex = startIndex;

      for (
        let attempts = 0;
        attempts < options.length;
        attempts += 1
      ) {
        nextIndex =
          (nextIndex + direction + options.length) %
          options.length;

        if (!options[nextIndex].disabled) {
          return nextIndex;
        }
      }

      return -1;
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setIsOpen(true);

        setHighlightedIndex((currentIndex) =>
          findNextEnabledIndex(currentIndex, 1),
        );

        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setIsOpen(true);

        setHighlightedIndex((currentIndex) =>
          findNextEnabledIndex(
            currentIndex === -1
              ? options.length
              : currentIndex,
            -1,
          ),
        );

        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();

        const highlightedOption =
          options[highlightedIndex];

        if (highlightedOption) {
          handleSelect(highlightedOption);
        }

        return;
      }

      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    const displayedValue = isOpen
      ? searchQuery
      : selectedOption?.label ?? "";

    return (
      <div
        ref={dropdownRef}
        dir="rtl"
        className="relative flex flex-col gap-1"
      >
        <label className="text-right text-sm font-bold">
          {label}
        </label>

        <div className="relative mb-5">
          <div
            className={`
              flex h-[52px] w-full items-center rounded-inpt
              border p-2 text-inpt md:h-[45px]
              ${
                !editable
                  ? "cursor-not-allowed bg-gray-100"
                  : "bg-white"
              }
              ${
                value
                  ? isTrue
                    ? "border-[#1A71F6]"
                    : "border-[#FF1F1F]"
                  : "border-[#D1D1D1]"
              }
              ${isOpen ? "border-[#1A71F6]" : ""}
            `}
          >
            <input
              ref={inputRef}
              type="text"
              value={displayedValue}
              onChange={handleSearchChange}
              onFocus={openDropdown}
              onClick={openDropdown}
              onKeyDown={handleKeyDown}
              disabled={!editable}
              placeholder={placeholder}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={isOpen}
              aria-controls="medicine-dropdown-options"
              className="
                min-w-0 flex-1 bg-transparent text-right
                text-black outline-none
                placeholder:text-gray-400
                disabled:cursor-not-allowed
              "
            />

            <button
              type="button"
              disabled={!editable}
              onClick={() => {
                if (isOpen) {
                  closeDropdown();
                } else {
                  openDropdown();
                }
              }}
              aria-label={
                isOpen
                  ? "إغلاق القائمة"
                  : "فتح القائمة"
              }
              className="
                flex shrink-0 items-center justify-center
                disabled:cursor-not-allowed
              "
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div
              id="medicine-dropdown-options"
              role="listbox"
              className="
                absolute right-0 top-[calc(100%+6px)] z-50
                max-h-60 w-full overflow-y-auto rounded-inpt
                border border-[#D1D1D1] bg-white p-1
                shadow-lg
              "
            >
              {loading ? (
                <p className="px-3 py-3 text-right text-sm text-gray-500">
                  جاري البحث...
                </p>
              ) : options.length > 0 ? (
                options.map((option, index) => {
                  const isSelected =
                    option.value === value;
                  const isHighlighted =
                    index === highlightedIndex;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      disabled={option.disabled}
                      onMouseEnter={() => {
                        if (!option.disabled) {
                          setHighlightedIndex(index);
                        }
                      }}
                      onClick={() =>
                        handleSelect(option)
                      }
                      className={`
                        flex w-full items-center rounded-md
                        px-3 py-2 text-right text-sm
                        transition-colors
                        ${
                          isSelected
                            ? "bg-[#EAF2FF] text-[#1A71F6]"
                            : isHighlighted
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-100"
                        }
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      `}
                    >
                      {option.label}
                    </button>
                  );
                })
              ) : (
                <p className="px-3 py-3 text-right text-sm text-gray-500">
                  {noResultsText}
                </p>
              )}
            </div>
          )}
        </div>

        <ErrorMsg
          text={errorMsg || "\u00A0"}
          isRed
        />
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";

export default Dropdown;