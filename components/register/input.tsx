import unshowPass from '../../public/icons/unshowPass.svg'

type InputProps = {
    label: string;
    type: 'text' | 'email' | 'password';
    inputText: string;
}

export default function Input({label, type, inputText}: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-right">{label}</label>
            <div className="relative">
                <input type={type} className="border border-[#D1D1D1] rounded-md p-2 text-right w-full focus:border-[#1A71F6] focus:outline-none"
                    value={inputText} />
                {type === 'password' && <img src="/icons/unshowPass.svg" className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer" />}
            </div>
        </div>
    )
}