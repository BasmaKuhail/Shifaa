
export default function Title({ title }: { title: string }) {
    return (
        <h1 className="text-lg md:text-title font-bold font-sans">{title}</h1>
    )
}