import { useEffect, useState } from 'react';
import { fetchCountries } from "@/lib/countries";

type InputProps = {
    label: string;
    inputText: string;
    value: string;
    onChange: (value: string) => void;
    isTrue: boolean;
    codes: { name: string; dialCode: string; iso: string; }[]
    countryCode:string;
}
type Country = {
  name: string;
  iso: string;
  dialCode: string;
  flag: string;
};

export default function PhoneNum ({label, inputText, value, onChange, isTrue, codes, countryCode}: InputProps){
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const getCountries = async () => {
        const data = await fetchCountries();
        setCountries(data);
        console.log(countries)
        setSelectedCountry(countries.find(c => c.name === "Palestine") || countries[0]); 
        console.log(countries.find(c => c.name === "Palestine"))
        };
        getCountries();
    }, []);

    if (!countries || countries.length == 0){
        return(<div>loading...</div>)
    }
    return(
        
        <div dir="ltr" className="flex flex-col gap-2">
            <label className="text-sm font-bold text-right">{label}</label>
            <div className='flex flex-row gap-2 relative'>
                <img 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-[10px]" 
                    src={`https://flagsapi.com/${selectedCountry?.iso}/flat/64.png`} 
                    width={40}
                />
                
                <select
                    className="px-3 outline-none absolute left-15 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onChange={(e) => {
                        const selected = countries.find(c => c.dialCode === e.target.value)
                        if (selected) {
                            setSelectedCountry(selected)
                            // console.log(selectedCountry)
                        }
                    }}
                >
                    
                    {countries.map((code, index) => 
                        <option 
                            key={index} 
                            value={code.dialCode}
                        >
                            <div className='flex flex-row '>
                                <p>{code.name}</p>
                                <p>({code.dialCode})</p>
                            </div>
                            
                        </option>
                    )}

                </select>
                <input 
                    onChange={(e) => {onChange(e.target.value)} }
                    type="tel"
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