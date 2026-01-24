export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-main py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="h-10 bg-slate-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-96"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-lg h-96 overflow-hidden"
            >
              <div className="h-56 bg-slate-200 animate-pulse"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-12 bg-slate-200 rounded w-full mt-4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
