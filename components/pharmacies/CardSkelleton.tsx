export default function PharmCardSkeleton() {
    return (
        <div aria-hidden="true" className="w-full animate-pulse rounded-[14px] bg-white p-1 pb-7">
            <div className="h-[190px] w-full rounded-[14px] bg-black-50" />
            <div className="mx-auto mt-7 h-6 w-2/3 rounded bg-black-50" />
            <div className="mx-auto mt-5 h-4 w-4/5 rounded bg-black-50" />
            <div className="mt-6 flex justify-center gap-2">
                <div className="h-10 w-24 rounded-[10px] bg-black-50" />
                <div className="h-10 w-24 rounded-[10px] bg-black-50" />
            </div>
        </div>
    );
}