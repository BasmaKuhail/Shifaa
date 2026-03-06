export default function Title({title}:{title: string}){
    return(
        <div className="ph-1 flex items-center justify-center bg-blue-100 rounded-full w-[8rem]">
            <p className="text-btn text-blue-900 flex">{title}</p>
        </div>
    )
}