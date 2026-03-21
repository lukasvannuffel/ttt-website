"use client";

export function DienstenSkeleton() {
  return (
    <section className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)] to-[var(--surface)] py-16">
      {/* Header skeleton */}
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16 mb-12 text-center">
        <div className="skeleton-text-sm w-32 mx-auto mb-4" />
        <div className="space-y-3 mb-6">
          <div className="skeleton-text-lg w-2/3 mx-auto" />
          <div className="skeleton-text-lg w-1/2 mx-auto" />
        </div>
        <div className="skeleton-text w-3/4 mx-auto" />
      </div>

      {/* Carousel skeleton - 3 cards */}
      <div className="w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                {/* Card image */}
                <div className="skeleton h-[400px] rounded-lg" />

                {/* Card content */}
                <div className="space-y-3 p-2">
                  <div className="skeleton-text-sm w-12" />
                  <div className="skeleton-text-lg w-3/4" />
                  <div className="space-y-2">
                    <div className="skeleton-text w-full" />
                    <div className="skeleton-text w-5/6" />
                  </div>

                  {/* Tags skeleton */}
                  <div className="flex gap-2 pt-2">
                    <div className="skeleton h-6 w-20 rounded-sm" />
                    <div className="skeleton h-6 w-24 rounded-sm" />
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Navigation dots skeleton */}
        <div className="flex justify-center gap-3 mt-12">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`skeleton-circle ${
                  i === 0 ? "h-3 w-8" : "h-2 w-2"
                }`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
