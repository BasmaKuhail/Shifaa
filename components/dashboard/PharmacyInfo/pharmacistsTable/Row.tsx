type RowProps<T extends Record<string, any>> = {
  data: T;
};
export default function Row<T extends Record<string, any>>({ data }: RowProps<T>) {
    return(
        <div className="w-full flex flex-row items-center py-3">
            {Object.entries(data).map(([key, value], index) => (
                <div key={index} className="flex-1 text-start">
                    {value}
                </div>
            ))}
        </div>
    )
}