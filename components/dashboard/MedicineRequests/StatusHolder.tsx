const StatusHolder = ({status}:{status:string}) => {
    const statusStyles: Record<string, string> = {
        accepted: "bg-accepted",
        pending: "bg-pending",
        rejected: "bg-rejected",
        expired: "bg-rejected",
    };
    return(
        <div 
            className={`flex w-fit items-center justify-center  px-5 texy-inpt rounded-[14px] gap-2 ${
                statusStyles[status] || "bg-gray-100"
            }`}
        >
            <p className="">{status}</p>
        </div>
    )
}
export default StatusHolder;