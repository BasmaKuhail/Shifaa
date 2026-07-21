export default function BtnEmpty({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
    return (
        <div onClick={onClick} className="
            flex items-center justify-center 
            p-[2px]
            rounded-full
            bg-gradient-to-r
            from-[#329CCB]
            to-[#668DCA]
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
                hover:from-[#329CCB]
                hover:to-[#668DCA]
            ">
                <span className="
                    group
                    bg-gradient-to-r
                    from-[#329CCB]
                    to-[#668DCA]
                    bg-clip-text
                    text-transparent
                    transition
                    group-hover:text-white
                    text-btn
                    ">
                    {children}
                </span>
            </div>
        </div>
    );
}
