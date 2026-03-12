export default function UpArrow (){
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return(
        <button 
            onClick={scrollToTop}
            className="
                fixed bottom-6 right-3 z-50
                rounded-full 
                p-4
                bg-gradient-to-r from-[#3E94B9] to-[#04B6FF]
                flex items-center justify-center 
                cursor-pointer 
                shadow-lg 
                hover:shadow-xl
                hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
        </button>
    )
}