export default function ErrorMsg({errorMsg}: {errorMsg?: {text: string, isRed?: boolean}}) {
    return (
        <p className={`absolute transform translate-y-20 ${errorMsg?.isRed ? 'text-red-500 text-xs' : 'text-gray-500 text-inpt'}`}>{errorMsg?.text}</p>

    )
}