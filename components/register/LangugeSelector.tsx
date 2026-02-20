import { useState } from "react";

export default function LanguageSelector() {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
        console.log('Selected language:', event.target.value);
    }
    return (
        <select className="text-input" value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="arabic">العربية (فلسطين)</option>
            <option value="english">English (US)</option>
        </select>
    )
}