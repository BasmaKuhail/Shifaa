export default function BtnEmpty({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-[2px] rounded-full bg-gradient-to-r from-[#3E94B9] to-[#04B6FF] flex items-center justify-center">
            <div className="bg-white rounded-full px-6 py-2 w-[10rem] cursor-pointer hover:bg-black-100 transition duration-300 ease-in-out flex items-center justify-center">
                <span className="
                    bg-gradient-to-r 
                    from-[#3E94B9] 
                    to-[#04B6FF]
                    bg-clip-text 
                    text-transparent
                    font-medium"
                >
                    {children}
                </span>
            </div>
        </div>
    );
}
