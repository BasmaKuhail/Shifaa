import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import BtnEmpty from "./BtnEmpty"
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@/contexts/UserContext";
import SecHeadSkel from "@/components/Skeleton/SubHeaderSkeleton";
import { headerItems } from "@/config/navigations";

export default function SecondaryHeader(){
    const {user, loading} = useContext(UserContext);
    
    const dashboardBtn = () => {
        if (user && user?.user_type === "pharmacist"){
            return <BtnEmpty onClick={() => {router.push("/dashboard")}}>لوحة التحكم</BtnEmpty>
        } else if (user && user?.user_type === "admin"){
            return <BtnEmpty onClick={() => {router.push("/admin-dashboard")}}>لوحة التحكم</BtnEmpty>
        }else{
            return <div className="px-20"></div>
        }
    }
    const router = useRouter();
    if(loading) {
        return <SecHeadSkel arrLength={headerItems.length} includeBtn={true}/>
    } else {

    return(
        <div dir="rtl" className="flex flex-row items-center justify-between w-full gap-8 ">
            <Image src={logo} alt="Logo"  className=" m-[2px]" />
            <div className="flex flex-row gap-8 items-center">
                {headerItems.map((item) => (
                    <p key={item.id} className={`text-btn cursor-pointer hover:underline text-center ${router.pathname === item.link ? "font-bold" : ""}`}><Link href={item.link}>{item.title}</Link></p>
                ))}
            </div>
           {dashboardBtn()}
        </div>
    )
}}