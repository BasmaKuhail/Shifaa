type ButtonProps = {
    text: string;
    onClick: () => void;
}

export default function ButtonEmpty({text, onClick}: ButtonProps) {
    return(
        <button onClick={onClick} className="bg-transparent text-blue-500 py-2 rounded-btn cursor-pointer text-btn w-full hover:bg-lightBlue transition-colors border-2 border-blue-500">
            {text}
        </button>
    )
}   