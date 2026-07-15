import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import axios from "axios";

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
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      setObjectUrl(null);
      return;
    }

    let isActive = true;
    let generatedObjectUrl: string | null = null;

    const fetchImage = async () => {
      try {
        const blob = await getAttachment(imageUrl);

        if (!blob.type.startsWith("image/")) {
          throw new Error(
            `Expected an image response, but received ${blob.type || "unknown type"}`
          );
        }

        generatedObjectUrl = URL.createObjectURL(blob);

        if (isActive) {
          setObjectUrl(generatedObjectUrl);
        } else {
          URL.revokeObjectURL(generatedObjectUrl);
        }
      } catch (error) {
        if (isActive) {
          setObjectUrl(null);
        }

        if (axios.isAxiosError(error)) {
          console.error("Failed to fetch attachment", {
            requestedUrl: error.config?.url,
            baseUrl: error.config?.baseURL,
            status: error.response?.status,
            data: error.response?.data,
          });
        } else {
          console.error("Failed to display attachment:", error);
        }
      }
    };

    void fetchImage();

    return () => {
      isActive = false;

      if (generatedObjectUrl) {
        URL.revokeObjectURL(generatedObjectUrl);
      }
    };
  }, [imageUrl]);

  return (
    <ProfileIcon
      imageUrl={objectUrl}
      width={width}
      isCircle={isCircle}
      fallbackImage={fallbackImage}
    />
  );
}