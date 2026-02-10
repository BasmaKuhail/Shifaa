type ButtonProps = {
    text: string;
    onClick: () => void;
}

export default function Button({text, onClick}: ButtonProps) {
    return(
        <button onClick={onClick} className="bg-blue-500 text-white py-2 rounded-btn cursor-pointer text-btn w-full md:w-[70%] hover:bg-blue-700 transition-colors">
            {text}
        </button>
    )
}   