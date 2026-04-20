import UserIcon from "@/public/icons/editProfile/user";

type ProfileIconProps = {
  imageUrl: string | null;
  width: number;
  isCircle: boolean;
};
export default function ProfileIcon({ imageUrl, width, isCircle}: ProfileIconProps) {
    return(
        <div 
            style={{ width: `${width}px` }}
            className={`rounded-${isCircle ? "full" : "[10px]"} aspect-square overflow-hidden bg-gray-200 flex flex-row items-center justify-center`}>
            {imageUrl ? (
                <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <UserIcon className={`w-full h-full text-[#9C9EA1]`} />
            )}
        </div>
    )
}
