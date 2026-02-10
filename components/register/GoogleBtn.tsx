export default function GoogleBtn({text}: {text: string}) {
    return (
        <button onClick={() => {}} className="text-btn py-2 rounded-btn border flex items-center justify-center gap-2  cursor-pointer w-full hover:bg-gray-100 transition-colors">
            <img src={"/icons/google.png"} className="inline-block w-5 h-5 mr-2 " />
            {text}      
        </button>
    )
}
