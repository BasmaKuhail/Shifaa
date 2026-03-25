export default function Box({title, isSelected}:{title:string, isSelected:boolean}){
    return(
        <div 
            className={`rounded-[10px] border border-black-50 text-inpt flex items-center justify-between p-2
            ${isSelected && "bg-blue-1000 text-white"}`}>
            {title}
        </div>
    )
}