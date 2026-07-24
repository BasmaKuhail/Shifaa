import ErrorMsg from "@/components/register/ErrorMsg";
import React, { useEffect, useRef, useState } from "react";

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
  isTrue: boolean;
  editable?: boolean;
  errorMsg?: string;
};

const Dropdown = React.memo(
  ({
    label,
    placeholder,
    value,
    options,
    onChange,
    isTrue,
    editable = true,
    errorMsg,
  }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(
      (option) => option.value === value,
    );

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

    const handleToggle = () => {
      if (!editable) {
        return;
      }

      setIsOpen((previousState) => !previousState);
    };

    const handleSelect = (option: DropdownOption) => {
      if (option.disabled) {
        return;
      }

      onChange(option.value);
      setIsOpen(false);
    };

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
          <button
            type="button"
            onClick={handleToggle}
            disabled={!editable}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className={`
              flex h-[52px] w-full items-center justify-between
              rounded-inpt border p-2 text-inpt
              focus:outline-none md:h-[45px]
              disabled:cursor-not-allowed disabled:bg-gray-100
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
            <span
              className={
                selectedOption
                  ? "text-right text-black"
                  : "text-right text-gray-400"
              }
            >
              {selectedOption?.label ?? placeholder}
            </span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className={`shrink-0 transition-transform duration-200 ${
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

          {isOpen && (
            <div
              role="listbox"
              className="
                absolute right-0 top-[calc(100%+6px)] z-50
                max-h-60 w-full overflow-y-auto
                rounded-inpt border border-[#D1D1D1]
                bg-white p-1 shadow-lg
              "
            >
              {options.map((option) => {
                const isSelected = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    onClick={() => handleSelect(option)}
                    className={`
                      flex w-full items-center rounded-md
                      px-3 py-2 text-right text-sm
                      transition-colors
                      ${
                        isSelected
                          ? "bg-[#EAF2FF] text-[#1A71F6]"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <ErrorMsg
          text={errorMsg || "\u00A0"}
          isRed={true}
        />
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";

export default Dropdown;