export default function BtnEmpty({ children }: { children: React.ReactNode }) {
    return (
        <div className="
            flex items-center justify-center 
            p-[2px]
            rounded-full
            bg-gradient-to-r
            from-[#3E94B9]
            to-[#04B6FF]
            inline-block
            hover:p-0
            hover:border hover:border-white hover:border-[2px]
            ">
            <div className="
                group
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
                    group
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