type ButtonProps = {
    text: string;
    onClick: () => void;
}

export default function ButtonFull({text, onClick}: ButtonProps) {
    return(
        <button onClick={onClick} className="bg-blue-500 text-white py-2 rounded-btn cursor-pointer text-btn w-full hover:bg-blue-700 transition-colors">
            {text}
        </button>
    )
}   