type gradProps = {
    text: string,
    onClick: () => void
}
export default function GradientBrn({text, onClick}:gradProps){
    return(
        <div
                className="
                    h-full
                    px-10
                    rounded-[30px]
                    bg-gradient-to-r
                    from-[#3E94B9]
                    to-[#04B6FF]
                    flex
                    items-center
                    justify-center
                    text-white
                    cursor-pointer
                    "
                onClick={onClick}>
                    {text}
                
            </div>
    )
}