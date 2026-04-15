type rowProps = {
    pharmacist: {
        name: string;
        contactNum: string;
        email: string;
        address: string;
    };
    isFrist?: boolean;
}
export default function Row({pharmacist , isFrist = false}:rowProps){
    return(
        <div className={`w-full flex flex-row items-center py-3 border-t border-black-200 ${isFrist && "border-t-0 text-black-500"}`}>   
            <p className="text-inpt w-[22%] text-start">{pharmacist.name}</p>
            <p className="text-inpt w-[22%] text-start">{pharmacist.contactNum}</p>
            <p className="text-inpt w-[34%] text-start">{pharmacist.email}</p>
            <p className="text-inpt w-[22%] text-start">{pharmacist.address}</p>
        </div>
    )
}