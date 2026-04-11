import SecondaryHeader from "../home/secondaryHeader/SecondaryHeader";
import SideNav from "./SideNav";

export default function Dashboard() {
    return (
        <div dir="rtl" className="flex flex-row mt-15 ">
            <div className="pt-4 pr-4 md:pr-8 lg:pr-20 xl:pr-30 w-[30%]">
                <SideNav/>
            </div>
            <div className="bg-blue-100 pt-8 pr-20 pl-4 md:pl-8 lg:pl-20 xl:pl-30 w-full">
                <div className="mt-0">
                    <h1 className="text-3xl font-bold">مرحبًا بك في لوحة التحكم</h1>
                    <p className="text-lg text-gray-600">هنا يمكنك إدارة حسابك ومتابعة نشاطك.</p>
                </div>
                
            </div>
        </div>
    );
}