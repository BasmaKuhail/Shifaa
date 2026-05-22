type RowProps<T extends Record<string, any>> = {
  data: T;
};
export default function Row<T extends Record<string, any>>({ data }: RowProps<T>) {
    return(
        <div className="w-full flex flex-row items-center p-3 hover:bg-gray-50 cursor-pointer text-12px font-[500]"> 
            {Object.entries(data).map(([key, value], index) => (
                <div key={key} className="flex-1 text-center">
                    {value}
                </div>
            ))}
        </div>
    )
}