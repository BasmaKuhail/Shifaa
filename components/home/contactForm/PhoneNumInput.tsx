import { useState } from 'react';

type InputProps = {
    label: string;
    inputText: string;
    value: string;
    onChange: (value: string) => void;
    isTrue: boolean;
    countryCode:string;
}
export default function PhoneNum ({label, inputText, value, onChange, isTrue, countryCode}: InputProps){
    const countryCodes = [
        { name: "Palestine", dialCode: "+970", iso: "ps" },
        { name: "Saudi Arabia", dialCode: "+966", iso: "sa" },
        { name: "Egypt", dialCode: "+20", iso: "eg" }
    ]

    return(
        <div dir="rtl" className="flex flex-col gap-2">
            <label className="text-sm font-bold text-right">{label}</label>
            <div className='flex flex-row gap-2 relative'>
                <img className="absolute left-4 top-1/2 transform -translate-y-1/2" src={`https://flagcdn.com/24x18/ps.png`} width={20} />
                <select
                    value={countryCode}
                    className="px-3 outline-none absolute left-11 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                    <option value="+970">+970</option>
                    <option value="+966">+966</option>
                    <option value="+20">+20</option>
                    <option value="+962">+962</option>
                </select>
                <input 
                    onChange={(e) => {onChange(e.target.value)} }
                    type="tel"
                    dir='ltr'
                    value={value}
                    placeholder={inputText}
                    className={`border rounded-inpt p-2 w-full text-right focus:outline-none text-inpt h-[52px] md:h-[45px]
                        ${
                        value
                            ? isTrue
                            ? 'border-[#1A71F6]'
                            : 'border-[#FF1F1F]'
                            : ''
                        }
                        ${'border-[#D1D1D1] focus:border-[#1A71F6]'}
                    `}
                />
            </div>
            
        </div>
    )
}