import Image from "next/image";
import invite from "@/public/icons/phcyInfo/invite.svg";
import search from "@/public/icons/search.svg"
import Result from "./SearchResults";

function handleSearch (){
    console.log("search")
    return;
}

const dummyResults = [
    {
        avatar: undefined,
        name: "محمد أحمد",
        contactNum: "0123456789",
    },
    {
        avatar: undefined,
        name: "فاطمة علي",
        contactNum: "9876543210",
    }
];

export default function InvitePopup({ onClose }: { onClose: () => void }) {
    return (
        <div dir="rtl" className="w-full h-full bg-black-500/50 absolute top-0 left-0 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white w-[50%] rounded-[14px] p-5 px-10 pb-10 flex flex-col items-center justify-center gap-5" onClick={(e) => e.stopPropagation()}>
                <div className="w-full flex flex-row items-center justify-start gap-2">
                    <Image src={invite} alt="" />
                    <p className="text-lg font-[500] flex flex-row items-center gap-2">دعوة صيدلي</p>
                </div>
                <div dir="rtl" className="relative w-full">
                    <Image 
                        alt=""
                        width={15}
                        src={search} 
                        className="hidden lg:block md:block absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                        onClick={handleSearch} 
                    />
                    <input
                        placeholder="ابحث عن صيدلي بالاسم أو البريد الالكتروني"
                        onChange={(e) => e.target.value}
                        type="text"
                        className='w-full h-[40px]
                            bg-white
                            border border-black-200
                            rounded-[12px]
                            text-right
                            px-12 
                            focus:outline-none
                            text-inpt
                            text-black-500
                            '
                    />
                </div>
                <div className="flex flex-col items-center justify-start gap-2 w-full">
                    {dummyResults.map((result, index) => (
                        <Result key={index} {...result} />
                    ))}
                </div>
                
            </div>
        </div>
    )
}