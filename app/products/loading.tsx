export default function Loading() {
  return (
    <div className="min-h-screen bg-background-secondary py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="h-8 bg-primary-100 rounded-full w-48 mb-3"></div>
          <div className="h-4 bg-primary-100 rounded-full w-72 max-w-full"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border border-border-primary rounded-2xl sm:rounded-3xl overflow-hidden"
            >
              <div className="aspect-square bg-primary-100 animate-pulse"></div>
              <div className="p-3 sm:p-4 space-y-3">
                <div className="h-4 bg-primary-100 rounded-full w-3/4 animate-pulse"></div>
                <div className="h-3 bg-primary-100 rounded-full w-full animate-pulse"></div>
                <div className="h-9 bg-primary-100 rounded-xl w-full mt-2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
