type headerProps ={
    text: string,
    isBlue:boolean
}
export default function HeaderText ({text, isBlue}:headerProps){
    return(
        <p className={`font-bold text-27px lg:text-47px md:text-47px ${isBlue ? 
            "bg-gradient-to-r from-[#3E94B9] to-[#04B6FF] bg-clip-text text-transparent" : ""}`}>
            {text}
        </p>
    )
}