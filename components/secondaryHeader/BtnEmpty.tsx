export default function BtnEmpty({ children }: { children: React.ReactNode }) {
    return (
        <div className="
            p-[2px]
            rounded-full
            bg-gradient-to-r
            from-[#3E94B9]
            to-[#04B6FF]
            inline-block
            ">
            <div className="
                bg-white
                rounded-full
                px-6 py-2 w-[10rem]
                flex items-center justify-center
                cursor-pointer
                font-medium
                transition
                hover:bg-gradient-to-r
                hover:from-[#3E94B9]
                hover:to-[#04B6FF]
            ">
                <span className="
                    bg-gradient-to-r
                    from-[#3E94B9]
                    to-[#04B6FF]
                    bg-clip-text
                    text-transparent
                    transition
                    group-hover:text-white
                    ">
                    {children}
                </span>
            </div>
        </div>
    );
}