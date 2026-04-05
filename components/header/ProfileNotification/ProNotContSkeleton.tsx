export default function ProNotContSkeleton() {
  return (
    <div dir="rtl" className="flex flex-row gap-5 items-center justify-between animate-pulse">
      
      {/* notification icon skeleton */}
      <div className="w-10 h-10 bg-gray-200 rounded-[10px]"></div>

      {/* vertical line */}
      <div className="w-[1px] h-[35px] bg-gray-200"></div>

      {/* profile skeleton */}
      <div dir="ltr" className="flex items-center gap-3">
        {/* avatar */}
        <div className="w-10 h-11 bg-gray-200 rounded-[10px]"></div>

        {/* text */}
        <div className="flex flex-col gap-2">
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
          <div className="w-10 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
      
    </div>
  );
}