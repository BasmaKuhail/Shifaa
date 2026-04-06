export default function Title({title , bgColor="blue"}:{title: string, bgColor:"blue" | "white"}){
    return(
        <div className={`ph-1 flex items-center justify-center rounded-full w-[8rem] ${bgColor == "blue" ? "bg-blue-100" : "bg-white"}`}>
            <p className="text-btn text-blue-900 flex">{title}</p>
        </div>
    )
}