import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import chooseImageIcon from "@/public/icons/pharmInfo/chooseImg.svg";

const acceptedImageTypes = ".png,.svg,.jpg,.jpeg,image/png,image/svg+xml,image/jpeg";

type AddImageProps = {
  label?: string;
  onImageChange?: (file: File | null) => void;
  className?: string;
};

export default function AddImage({
  label = "Photo 1",
  onImageChange,
  className = "",
}: AddImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) return;

    setPreviewUrl((currentUrl) => {
      if (currentUrl?.startsWith("blob:")) URL.revokeObjectURL(currentUrl);
      return URL.createObjectURL(file);
    });
    onImageChange?.(file);
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className={`relative flex h-[130px] w-[160px] flex-col items-center justify-center overflow-hidden rounded-[15px] border border-dashed border-black-500 text-black-500 transition-colors cursor-pointer hover:bg-black-10  ${className}`}
      aria-label={`Upload ${label}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptedImageTypes}
        onChange={handleImageChange}
        className="sr-only"
        tabIndex={-1}
      />

      {previewUrl ? (
        <Image
          src={previewUrl}
          alt={label}
          fill
          unoptimized
          className="object-contain"
        />
      ) : (
        <>
          <Image src={chooseImageIcon} alt="" width={30} height={30} />
          <span className="mt-4 text-inpt font-medium leading-none">{label}</span>
        </>
      )}
    </button>
  );
}

