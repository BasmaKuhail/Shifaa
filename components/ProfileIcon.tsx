import Image, { StaticImageData } from "next/image";
import UserIcon from "@/public/icons/editProfile/user";

type ProfileIconProps = {
  imageUrl: string | null;
  width: number;
  isCircle?: boolean;
  fallbackImage?: StaticImageData;
};

export default function ProfileIcon({
  imageUrl,
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
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Profile image"
          width={width}
          height={width}
          unoptimized
          className="h-full w-full object-cover"
        />
      ) : fallbackImage ? (
        <Image
          src={fallbackImage}
          alt="Default profile"
          className={`${imageUrl === null ? "w-[30%]" : "w-full h-full"}  object-cover`}
        />
      ) : (
        <UserIcon className="w-full h-full text-[#9C9EA1]" />
      )}
    </div>
  );
}
