type dropDownProps ={
    title: string,
    elements: (string)[]
}

export default function DropDownMenu({title, elements}:dropDownProps){
    return(
        <div className="bg-white rounded-[12px] flex flex-col p-5 gap-3">
            <div className="flex flex-row-reverse justify-between items-center gap-1">
                <p className="text-inpt">تصنيف {title} </p>
                <a href="#" className="hover:underline text-xs">اعادة الضبط</a>
            </div>
            <div className="flex flex-col">
                <div 
                    style={{ direction: "rtl" }}
                    className="flex flex-col gap-2 
                        h-[14rem] overflow-y-scroll overflow-x-hidden "
                >
                    {elements.map((element, index) => 
                        <div className="flex flex-row gap-2 px-3">
                            <input 
                                className="scale-150 bg-gradient-to-r from-[#3E94B9] to-[#04B6FF]" 
                                key={index} 
                                type="checkbox" 
                                value={element}/>
                            <p className="text-inpt">{element}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}