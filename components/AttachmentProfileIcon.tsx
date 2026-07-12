import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import ProfileIcon from "./ProfileIcon";
import { getAttachment } from "@/services/admin";

type AttachmentProfileIconProps = {
  imageUrl: string | null;
  width: number;
  isCircle?: boolean;
  fallbackImage?: StaticImageData;
};

export default function AttachmentProfileIcon({
  imageUrl,
  width,
  isCircle = true,
  fallbackImage,
}: AttachmentProfileIconProps) {
  const [loadedImage, setLoadedImage] = useState<{
    sourceUrl: string;
    objectUrl: string;
  } | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      return;
    }

    let objectUrlToRevoke: string | null = null;
    let isMounted = true;

    const fetchImage = async () => {
      try {
        const blob = await getAttachment(imageUrl);
        const nextObjectUrl = URL.createObjectURL(blob);
        objectUrlToRevoke = nextObjectUrl;

        if (isMounted) {
          setLoadedImage({
            sourceUrl: imageUrl,
            objectUrl: nextObjectUrl,
          });
        } else {
          URL.revokeObjectURL(nextObjectUrl);
        }
      } catch (error) {
        console.error("Failed to load profile image:", error);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
      if (objectUrlToRevoke) {
        URL.revokeObjectURL(objectUrlToRevoke);
      }
    };
  }, [imageUrl]);

  const displayUrl =
    imageUrl && loadedImage?.sourceUrl === imageUrl
      ? loadedImage.objectUrl
      : null;

  return (
    <ProfileIcon
      imageUrl={displayUrl}
      width={width}
      isCircle={isCircle}
      fallbackImage={fallbackImage}
    />
  );
}
