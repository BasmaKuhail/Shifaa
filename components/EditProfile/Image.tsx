import ProfileIcon from "../ProfileIcon";
import AttachmentProfileIcon from "../AttachmentProfileIcon";
import editIcon from "@/public/icons/editProfile/edit.svg";
import deleteIcon from "@/public/icons/editProfile/delete.svg";
import pharmLogo from "@/public/icons/pharmInfo/pharmacyLogo.svg";

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import Btn from "../pharmacyDashboard/PharmacyInfo/Btn";
type PharmacyInfo = {
  logo: File | string | null;
  name: string;
  address: string;
  phone: string;
};

type ImageProfileProps = {
  imageUrl: string | null;
  isUser?: boolean;
  width?: number;
  isCircle?: boolean;
  onImageChange?: (file: File) => void;
  onDeleteImage?: () => void;
  setPharmacyInfo?: Dispatch<SetStateAction<PharmacyInfo>>;
  showBtns?:boolean
};


export default function ImageProfile({
  imageUrl,
  isUser = true,
  width = 150,
  isCircle = true,
  onImageChange,
  onDeleteImage,
  setPharmacyInfo,
  showBtns = true

}: ImageProfileProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropModalImageUrl, setCropModalImageUrl] = useState<string | null>(
    null
  );

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (cropModalImageUrl) URL.revokeObjectURL(cropModalImageUrl);
    };
  }, [previewUrl, cropModalImageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      e.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setCropModalImageUrl(imageUrl);

    e.target.value = "";
  };

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const handleCropCancel = () => {
    if (cropModalImageUrl) {
      URL.revokeObjectURL(cropModalImageUrl);
    }

    setCropModalImageUrl(null);
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

const handleCropSave = async () => {
  if (!cropModalImageUrl || !croppedAreaPixels) {
    return;
  }

  try {
    const croppedFile = await getCroppedImg(
      cropModalImageUrl,
      croppedAreaPixels
    );

    const nextPreviewUrl = URL.createObjectURL(croppedFile);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    URL.revokeObjectURL(cropModalImageUrl);

    setPreviewUrl(nextPreviewUrl);
    setCropModalImageUrl(null);
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);

    setPharmacyInfo?.((currentInfo) => ({
      ...currentInfo,
      logo: croppedFile,
    }));

    onImageChange?.(croppedFile);
  } catch (error) {
    console.error("Failed to crop image:", error);
  }
};

  const handleDeleteImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    onDeleteImage?.();
    setPharmacyInfo?.((currentInfo) => ({
      ...currentInfo,
      logo: "",
    }));
  };

  // const imageUrl = previewUrl || imageObj?.url || null;

  return (
    <div className="flex flex-col items-center gap-3 justify-center">
      {cropModalImageUrl && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-md h-[400px] bg-black rounded-lg overflow-hidden">
            <Cropper
              image={cropModalImageUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape={isCircle ? "round" : "rect"}
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 flex flex-col gap-2">
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-1 rounded"
                  onClick={handleCropCancel}
                >
                  إلغاء
                </button>

                <button
                  type="button"
                  className="bg-white px-4 py-1 rounded"
                  onClick={handleCropSave}
                >
                  تأكيد
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {previewUrl ? (
        <ProfileIcon
          imageUrl={previewUrl}
          width={width}
          isCircle={isCircle}
          fallbackImage={isUser ? undefined : pharmLogo}
        />
      ) : (
        <AttachmentProfileIcon
          imageUrl={imageUrl}
          width={width}
          isCircle={isCircle}
          fallbackImage={isUser ? undefined : pharmLogo}
        />
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />
      {showBtns && 
      <div className="flex flex-row gap-3">
        <Btn
          text="تعديل الصورة"
          icon={editIcon}
          onClick={() => fileInputRef.current?.click()}
        />

        {/* {(imageUrl || previewUrl) && (
          <Btn
            text="حذف الصورة"
            icon={deleteIcon}
            onClick={handleDeleteImage}
          />
        )} */}
      </div>}
    </div>
  );
}

async function getCroppedImg(
  imageSrc: string,
  croppedAreaPixels: Area
): Promise<File> {
  const image = await loadImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to crop image"));
          return;
        }

        resolve(new File([blob], "profile-image.jpg", { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.92
    );
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image"));

    image.src = src;
  });
}
