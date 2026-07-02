import Image, { StaticImageData } from "next/image";
import UserIcon from "@/public/icons/editProfile/user";
import FileViewer from "./adminDashboard/requests/FileViewer";
import { ApplicationFile } from "@/types/PharmacistApplication";

type ProfileIconProps = {
  imageObj: ApplicationFile | null;
  width: number;
  isCircle?: boolean;
  fallbackImage?: StaticImageData;
};

export default function ProfileIcon({
  imageObj,
  width,
  isCircle = true,
  fallbackImage,
}: ProfileIconProps) {
  const shapeClass = isCircle ? "rounded-full" : "rounded-[10px]";

  return (
    <div
      style={{ width: `${width}px` }}
      className={`${shapeClass} aspect-square overflow-hidden bg-gray-200 flex items-center justify-center`}
    >
      {imageObj ? (
        <FileViewer
            file={imageObj}
            label="Profile Image"
            id={imageObj.id} // Replace with the actual ID of the image
        />
      ) : fallbackImage ? (
        <Image
          src={fallbackImage}
          alt="Default profile"
          className={`${imageObj === null ? "w-[30%]" : "w-full h-full"}  object-cover`}
        />
      ) : (
        <UserIcon className="w-full h-full text-[#9C9EA1]" />
      )}
    </div>
  );
}