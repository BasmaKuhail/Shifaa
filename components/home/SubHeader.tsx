
export default function SubHeader ({text, color}:{text: string, color:string}){
    return(
        <p className={`lg:font-semibold md:font-semibold text-inpt lg:text-21px md:text-21px ${color == "white" ?"text-white" : ""}`}>
            {text}
        </p>
    )
}