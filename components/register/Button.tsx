type ButtonProps = {
    text: string;
    onClick: () => void;
}

export default function Button({text, onClick}: ButtonProps) {
    return(
        <button onClick={onClick} className="bg-[var(--petrolBlue)] radius-[9px] text-white py-2 px-4 rounded cursor-pointer">
            {text}
        </button>
    )
}   