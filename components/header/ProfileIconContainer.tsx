import Image, { StaticImageData } from "next/image";
import UserIcon from "@/public/icons/editProfile/user";
import User from "@/public/icons/users/user.svg";
import admin from "@/public/icons/users/admin.svg";
import pharm from "@/public/icons/users/pharm.svg";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
type ProfileIconProps = {
  width: number;
  isCircle?: boolean;
  fallbackImage?: StaticImageData;
};

export default function ProfileIconContainer({width, isCircle = true}: ProfileIconProps) {
  const shapeClass = isCircle ? "rounded-full" : "rounded-[10px]";
  const {user, loading} = useContext(UserContext);
  const userType = user?.role;
  return (
    <div
      style={{ width: `${width}px` }}
      className={`${shapeClass} aspect-square overflow-hidden bg-gradient-to-r from-[#329CCB] to-[#668DCA] flex items-center justify-center`}
    >
        {!loading && 
            <Image src={userType === "admin" ? admin : userType === "pharmacist" ? pharm : User} alt="profile" />
        }    
    </div>
  );
}
