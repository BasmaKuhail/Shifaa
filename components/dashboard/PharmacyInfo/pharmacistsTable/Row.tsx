type RowProps<T extends Record<string, any>> = {
    data: T;
    isFirst?: boolean;
    columnClassNames?: Partial<Record<keyof T, string>>;
};
export default function Row<T extends Record<string, any>>({ data, isFirst=false, columnClassNames = {} }: RowProps<T>) {
    return(
        <div 
            className={`w-full flex flex-row items-center p-3 font-[500] 
                ${isFirst ? 
                    "bg-black-10 text-inpt rounded-t-[16px] text-black-700" : 
                    "text-12px hover:bg-blue-70 cursor-pointer"
                }`
            }
        >
            {Object.entries(data).map(([key, value], index) => (
                <div 
                    key={key} 
                    className={`text-center min-w-0 ${
                        columnClassNames[key as keyof T] ?? "flex-1"
                    }`}
                    >
                    {value}
                </div>
            ))}
        </div>
    )
}