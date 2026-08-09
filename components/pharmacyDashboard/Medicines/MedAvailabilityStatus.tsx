"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type MedAvailabilityProps = {
  isAvailable: boolean;
  onChange: (isAvailable: boolean) => void;
  disabled?: boolean;
};

export default function MedAvailability({
  isAvailable,
  onChange,
  disabled = false,
}: MedAvailabilityProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: boolean) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-fit" dir="rtl">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex min-w-[80px] items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white p-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span
          className={
            `text-12px
            ${isAvailable
              ? "text-green-600"
              : "text-red-500"}`
          }
        >
          {isAvailable ? "متوفر" : "غير متوفر"}
        </span>

        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="text-12px absolute right-0 z-20 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
          <button
            type="button"
            onClick={() => handleSelect(true)}
            className="w-full px-3 py-2 text-right hover:bg-gray-50 text-12px"
          >
            متوفر
          </button>

          <button
            type="button"
            onClick={() => handleSelect(false)}
            className="w-full px-3 py-2 text-right  hover:bg-gray-50 text-12px"
          >
            غير متوفر
          </button>
        </div>
      )}
    </div>
  );
}