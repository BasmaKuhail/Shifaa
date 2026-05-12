type ErrorMsgProps = {
  text?: string;
  isRed?: boolean;
};

export default function ErrorMsg({text, isRed = false}: ErrorMsgProps) {
    if (!text) return null;
    return (
        <p className={`absolute transform translate-y-20 ${isRed ? 'text-red-500 text-xs' : 'text-gray-500 text-xs lg:text-inpt '}`}>{text}</p>

    )
}