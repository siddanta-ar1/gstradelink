export default function Loading() {
  return (
    <div className="min-h-screen bg-background-secondary pb-28 md:pb-12">
      {/* Sticky header skeleton */}
      <section
        className="sticky top-0 z-30 backdrop-blur-md shadow-sm border-b"
        style={{
          background: "rgba(232, 235, 227, 0.94)",
          borderColor: "rgba(203, 220, 235, 0.5)",
        }}
      >
        <div className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-5 pb-5 md:pt-8 md:pb-6 mx-auto">
          {/* Header skeleton */}
          <div className="mb-6 md:mb-8 animate-pulse">
            <div
              className="h-3 rounded-full w-20 mb-3"
              style={{ background: "rgba(62,94,133,0.12)" }}
            />
            <div
              className="h-9 sm:h-11 rounded w-56 mb-3 max-w-full"
              style={{ background: "rgba(62,94,133,0.10)" }}
            />
            <div
              className="h-3.5 rounded-full w-80 max-w-full"
              style={{ background: "rgba(62,94,133,0.08)" }}
            />
          </div>

          {/* Search bar skeleton */}
          <div
            className="w-full h-12 sm:h-14 rounded-full border animate-pulse"
            style={{
              background: "rgba(255,255,255,0.7)",
              borderColor: "#CBDCEB",
            }}
          />
        </div>
      </section>

      {/* Category filter skeleton */}
      <section className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-6 md:mt-8 mx-auto">
        <div className="flex gap-2.5 pb-1 animate-pulse overflow-hidden">
          {[80, 60, 72, 68, 90, 64, 76].map((w, i) => (
            <div
              key={i}
              className="h-8 shrink-0 rounded-full"
              style={{
                width: `${w}px`,
                background: "rgba(62,94,133,0.10)",
              }}
            />
          ))}
        </div>
        <div
          className="mt-5 h-3.5 w-40 rounded-full animate-pulse"
          style={{ background: "rgba(62,94,133,0.08)" }}
        />
      </section>

      {/* Product grid skeleton */}
      <section className="max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-5 sm:mt-6 mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "1px solid #CBDCEB",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Image placeholder */}
              <div
                className="animate-pulse"
                style={{
                  aspectRatio: "1/1",
                  background: "rgba(62,94,133,0.07)",
                }}
              />
              {/* Text placeholders */}
              <div style={{ padding: "14px" }}>
                <div
                  className="h-3.5 rounded-full w-3/4 mb-2 animate-pulse"
                  style={{ background: "rgba(62,94,133,0.10)" }}
                />
                <div
                  className="h-3 rounded-full w-full mb-1 animate-pulse"
                  style={{ background: "rgba(62,94,133,0.07)" }}
                />
                <div
                  className="h-3 rounded-full w-2/3 animate-pulse"
                  style={{ background: "rgba(62,94,133,0.06)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
