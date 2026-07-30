import { useOverlay } from "@/contexts/OverlayContext";
import ArrowRight from "@/public/icons/error/arrowRight";

export default function UpArrow (){
    const { headerMenuOpen } = useOverlay();

    if (headerMenuOpen) return null;

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
                fixed bottom-6 right-3 z-[100]
                rounded-full 
                p-4
                bg-gradient-to-r from-[#329CCB] to-[#668DCA]
                flex items-center justify-center 
                cursor-pointer 
                shadow-lg 
                hover:shadow-xl
                hover:scale-110 transition"
                type="button"
                aria-label="scroll up"
            >
            <ArrowRight className="rotate-270 text-white "/>
        </button>
    )
}
