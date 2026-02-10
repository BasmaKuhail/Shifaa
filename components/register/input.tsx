import { on } from 'events';
import { useState } from 'react';

type InputProps = {
    label: string;
    type: 'text' | 'email' | 'password';
    inputText: string;
    value: string;
    onChange: (value: string) => void;
}

export default function Input({label, type, value, onChange}: InputProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [passSrc, setPassSrc] = useState<string>('/icons/unshowPass.svg');
    const [inputType, setInputType] = useState<'text' | 'email' | 'password'>(type);
    const togglePasswordVisibility = () => {
        setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
        setPassSrc((prev) => (prev === '/icons/unshowPass.svg' ? '/icons/showPass.svg' : '/icons/unshowPass.svg'));
    };

    const [validEmail, setValidEmail] = useState<boolean>(true);
    const checkEmail = (email: string) => {
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setValidEmail(false);
        } else {
            setValidEmail(true);
        }
    }

    const [validPassword, setValidPassword] = useState<boolean>(true);
    const checkPassword = (password: string) => {
        if(password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[@$!%*?&]/.test(password)) {
            setValidPassword(false);
        } else {
            setValidPassword(true);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-right">{label}</label>
            <div className="relative">
                <input 
                    onChange={(e) => {onChange(e.target.value); checkEmail(e.target.value); checkPassword(e.target.value); setInputValue(e.target.value)}} 
                    type={inputType} 
                    value={inputValue}
                    placeholder={label}
                    className={`border rounded-inpt p-2 w-full text-right focus:outline-none text-inpt h-[52px] md:h-[45px]
                        ${
                        type === 'email' && inputValue
                            ? validEmail
                            ? 'border-[#1A71F6]'
                            : 'border-[#FF1F1F]'
                            : ''
                        }
                        ${
                        type === 'password' && inputValue
                            ? validPassword
                            ? 'border-[#1A71F6]'
                            : 'border-[#FF1F1F]'
                            : ''
                        }
                        ${type === 'text' ? 'border-[#D1D1D1] focus:border-[#1A71F6]' : 'border-[#D1D1D1] focus:border-[#1A71F6]'}
                    `}
                    />
                {type === 'password' && 
                    <img 
                        src={passSrc} 
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility} />}
            </div>
        </div>
    )
}