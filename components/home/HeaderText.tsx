type headerProps ={
    text: string,
    color:string
}
export default function HeaderText ({text, color}:headerProps){
    return(
        <p className={`font-bold text-lg lg:text-47px md:text-47px text-center
            ${color == "blue" ? "bg-gradient-to-r from-[#3E94B9] to-[#04B6FF] bg-clip-text text-transparent"  : ""}
            ${color == "white"? "text-white" : ""}
            `}>
            {text}
        </p>
    )
}