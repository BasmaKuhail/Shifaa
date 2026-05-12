import Image from "next/image";
import Card from "../PharmacyInfo/CardContainer";
import search from "@/public/icons/search.svg"
import Row from "../PharmacyInfo/pharmacistsTable/Row";
import StatusHolder from "../MedicineRequests/StatusHolder";
import Sent from "@/public/icons/invitations/sent";
import Resend from "@/public/icons/invitations/resend";

export default function Invitations() {
    function handleSearch (){
        console.log("search")
        return;
    }

    const requests = [
        {id:1, customerName:"محمد أحمد", PhoneNum:"+123456789", email:"mohamed@example.com", status:"pending", resendStatus:"expired"},
        {id:2, customerName:"فاطمة علي", PhoneNum:"+987654321", email:"fatima@example.com", status:"accepted", resendStatus:"resent"},
        {id:3, customerName:"علي محمد", PhoneNum:"+456789123", email:"ali@example.com", status:"rejected", resendStatus:"resend"},
    ];
    return(
        <div className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <p className="font-semibold text-27px">إدارة الدعوات</p>
            <Card title="ادع صيدلي للانضمام إلى صيدليتك" >
                <div className="w-full flex flex-col mb-5">
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
                </div>
            </Card>
            <Card title="الدعوات المرسلة والحالات" >
                <div className="flex w-full flex-col px-10">
                    <div className="text-black-500 text-inpt">
                        <Row data={{customerName: "اسم الصيدلي", PhoneNum: "رقم التواصل", email: "البريد الإلكتروني", status: "حالة الدعوة", resendStatus:"إعادة إرسال الدعوة"}} />
                    </div>
                    {requests.map((req) => (
                        <div className="flex border-t border-gray-200 w-full items-center text-inpt">
                            <Row 
                                key={req.id} 
                                data={{
                                    customerName: req.customerName, 
                                    PhoneNum: req.PhoneNum,
                                    email: req.email,
                                    status: <StatusHolder status={req.status} />,
                                    resendStatus: 
                                        req.status === "accepted" 
                                        ? 
                                            <Sent className="text-black-200"/> 
                                        : 
                                            <Resend className={`${req.resendStatus === "resend" ? "text-black-500 cursor-pointer" : "text-blue-1000"}`} />
                                }} 
                            />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}