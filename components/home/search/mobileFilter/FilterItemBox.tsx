type FilterItemBoxProps = {
    title: string;
    isSelected: boolean;
    onClick: () => void;
}

export default function Box({title, isSelected, onClick}:FilterItemBoxProps){
    return(
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isSelected}
            className={`cursor-pointer rounded-[10px] border border-black-50 text-inpt flex items-center justify-between p-2
            ${isSelected && "bg-blue-1000 text-white"}`}>
            {title}
        </button>
    )
}
