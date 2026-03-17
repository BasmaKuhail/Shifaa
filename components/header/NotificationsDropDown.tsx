import Image, { StaticImageData } from "next/image";
import profileContainer from "@/public/icons/profileContainer.svg"
type notificationsDropDownProps = {
    notifications: {sender:{name:string, avatar?:StaticImageData}, msg: string, date: Date, action?:{title:string, onClick:() => void}}[]
}
export default function NotificationsDropDown ({notifications}: notificationsDropDownProps){
    return (
        <div dir="rtl" className="bg-white rounded-[12px] p-4 pb-10 w-[21.75rem] flex flex-col gap-1">
            <p className="text-sm font-[500]">الاشعارات</p>
            <div className='flex flex-row justify-between  w-full border-t border-t-black-200 pt-5 mt-5 text-12px font-[500]'>
                <p className="">غير مقروء</p>
                <p className="p-1 px-3 bg-[#E5F7FF] hover:bg-[#cae2ed] cursor-pointer">تميز كمقروءة</p>
            </div>
            <div className="flex flex-col">
                {notifications.map((ntf, indx) => 
                    <div key={indx} className="border border-black-200 bg-black-100 p-2 px-4 flex py-3 flex-row gap-2 justify-start">
                        <Image className="w-[3rem] rounded-full h-[3rem]" src={ntf.sender.avatar ? ntf.sender.avatar : profileContainer} alt="avatar"/> 
                        <div className="flex flex-col gap-3 text-inpt">
                            <p><b>{ntf.sender.name} </b>{ntf.msg}</p>
                            <nav className="flex flex-row items-center justify-between">
                                <p>{ntf.date.toLocaleDateString()}</p>
                                {ntf.action && <div
                                    className="
                                        h-full rounded-[6px] px-5 py-1
                                        bg-gradient-to-b from-[#3E94B9] to-[#04B6FF]
                                        flex items-center justify-center
                                        text-white text-inpt
                                        cursor-pointer
                                        
                                        hover:bg-gradient-to-b                    
                                        hover:from-[#356A82]
                                        hover:to-[#1689B8]
                                        "
                                    onClick={ntf.action.onClick}
                                >
                                {ntf.action.title}
                            </div>}
                            </nav>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}