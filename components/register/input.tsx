import { useState } from 'react';
import addAttatchmentIcon from "@/public/icons/switchToPharmacist/addAttatchment.svg";
import Image from 'next/image';
type InputProps = {
    label: string;
    type: 'text' | 'email' | 'password' | 'textarea' | 'file';
    inputText: string;
    value: string | File | null;
    onChange: (value: string | File | null) => void;
    isTrue: boolean;
    editable?:boolean
}

export default function Input({label, type, inputText, value, onChange, isTrue, editable=true}: InputProps) {
    const [passSrc, setPassSrc] = useState<string>('/icons/unshowPass.svg');
    const [inputType, setInputType] = useState<'text' | 'email' | 'password' | 'textarea' | 'file'>(type);
    const togglePasswordVisibility = () => {
        setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
        setPassSrc((prev) => (prev === '/icons/unshowPass.svg' ? '/icons/showPass.svg' : '/icons/unshowPass.svg'));
    };



    return (
        <div dir="rtl" className="flex flex-col gap-2">
            <label className="text-sm font-bold text-right">{label}</label>
            <div className="relative">
                {(type == 'textarea') ? (
                    <textarea 
                        rows={10}
                        className={`border rounded-inpt p-2 w-full text-right focus:outline-none text-inpt
                            ${
                            value
                                ? isTrue
                                ? 'border-[#1A71F6]'
                                : 'border-[#FF1F1F]'
                                : ''
                            }
                            ${'border-[#D1D1D1] focus:border-[#1A71F6] '}
                        `}
                        value={typeof value === 'string' ? value : ''}
                        placeholder={inputText}
                        onChange={(e) => {onChange(e.target.value)} }
                        readOnly={editable?true : false}>
                    </textarea>
                )  : type === 'file' ? (
                    <div className="relative border border-[#D1D1D1] rounded-inpt h-[52px] md:h-[45px] flex items-center justify-center cursor-pointer overflow-hidden">
                        
                        {/* Hidden real input */}
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                onChange(file);
                            }}
                            disabled={!editable}
                        />

                        {/* Custom UI */}
                        <div className="flex items-center gap-2 pointer-events-none text-xs text-gray-500">
                            <Image 
                                src={addAttatchmentIcon} 
                                alt='add attachment'
                                width={18}
                                height={18}
                            />
                            {value instanceof File && (
                                <span >
                                    {value.name}
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    <input 
                        onChange={(e) => {onChange(e.target.value)} }
                        type={inputType} 
                        value={typeof value === 'string' ? value : ''}
                        placeholder={inputText}
                        dir="auto"
                        
                        onCopy={(e) => type === 'password' && e.preventDefault()}
                        onPaste={(e) => type === 'password' && e.preventDefault()}
                        onCut={(e) => type === 'password' && e.preventDefault()}
                        onContextMenu={(e) => type === 'password' && e.preventDefault()}
                        onDrop={(e) => type === 'password' && e.preventDefault()}
                        disabled={!editable?true : false}
                        className={`border rounded-inpt p-2 w-full text-right focus:outline-none text-inpt h-[52px] md:h-[45px]
                            ${
                            value
                                ? isTrue
                                ? 'border-[#1A71F6]'
                                : 'border-[#FF1F1F]'
                                : ''
                            }
                            border-[#D1D1D1] focus:border-[#1A71F6]
                        `}
                    />
                )}
                {type === 'password' && 
                    <img 
                        src={passSrc} 
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility} />
                }
            </div>
        </div>
    )
}