const StatusHolder = ({status}:{status:string}) => {
    const statusStyles: Record<string, string> = {
        accepted: "bg-accepted",
        pending: "bg-pending",
        rejected: "bg-rejected",
        expired: "bg-rejected",
        unread: "bg-unread"
    };
    return(
        <div 
            className={`flex  items-center justify-center p-1 px-5 rounded-[14px] gap-2 ${
                statusStyles[status] || "bg-gray-100"
            }`}
        >
            <p className="font-[500] text-12px text-black-700">{status}</p>
        </div>
    )
}
export default StatusHolder;