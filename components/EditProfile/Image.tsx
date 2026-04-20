import Btn from "../PharmacyInfo/Btn";
import ProfileIcon from "../ProfileIcon";
import editIcon from "@/public/icons/editProfile/edit.svg"
import deleteIcon from "@/public/icons/editProfile/delete.svg"

import { useEffect, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
type ImageProfileProps = {
  userAvatar: string | null;
};
export default function ImageProfile({ userAvatar }: ImageProfileProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    // cropImage
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    

    useEffect(() => {
        if (!selectedImage) return;

        const url = URL.createObjectURL(selectedImage);
        setPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [selectedImage]);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setImageSrc(previewUrl); 

        e.target.value = "";
    };
    const handleCropSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        setSelectedImage(croppedImage); 
        setImageSrc(null);
    };
    const getCroppedImg = async (imageSrc:any, croppedAreaPixels:any) => {
        const image = new Image();
        image.src = imageSrc;

        await new Promise((resolve) => {
            image.onload = resolve;
        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx?.drawImage(
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
        
        return new Promise<File>((resolve) => {
            canvas.toBlob((blob) => {
            resolve(new File([blob!], "avatar.jpg", { type: "image/jpeg" }));
            }, "image/jpeg");
        });
    };
    return(
        
        <div className="flex flex-col items-center gap-3 justify-center">
            
            {imageSrc && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="relative w-[90%] max-w-md h-[400px] bg-black rounded-lg overflow-hidden">
                    
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(croppedArea, croppedPixels) => {
                        setCroppedAreaPixels(croppedPixels);
                        }}
                    />

                    {/* Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 flex flex-col gap-2">
                        
                        {/* Zoom slider */}
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
                            className="bg-gray-300 px-4 py-1 rounded"
                            onClick={() => setImageSrc(null)}
                        >
                            إلغاء
                        </button>

                        <button
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
            <ProfileIcon 
                imageUrl={preview || userAvatar} 
                width={150}
                isCircle={true}
            />
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
            />
            <div className="flex flex-row gap-3">
                <Btn text="تعديل الصورة" icon={editIcon} onClick={() => fileInputRef.current?.click()} />
                {userAvatar && <Btn text="حذف الصورة" icon={deleteIcon} onClick={() => {setSelectedImage(null)}} />}
            </div>
        </div>
    )
}