"use client";

export function HeroSkeleton() {
  return (
    <section className="relative grid h-screen grid-cols-1 grid-rows-[1fr_auto] overflow-hidden lg:min-h-screen lg:grid-cols-2 lg:grid-rows-1 lg:h-auto bg-gradient-to-b from-[var(--bg-primary)] to-[rgba(160,210,180,0.08)]">
      {/* Left side - text content skeleton */}
      <div className="order-2 flex flex-col justify-center bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)] to-[rgba(160,210,180,0.08)] px-8 pb-20 pt-8 md:px-16 md:pt-[140px] lg:order-1 lg:pt-[160px] lg:pl-[120px] lg:pr-20 relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          {/* Label skeleton */}
          <div className="skeleton-text-sm w-32" />

          {/* Headline skeletons */}
          <div className="space-y-3">
            <div className="skeleton-text-lg w-3/4" />
            <div className="skeleton-text-lg w-2/3" />
          </div>

          {/* Description skeletons */}
          <div className="space-y-2 max-w-[500px]">
            <div className="skeleton-text w-full" />
            <div className="skeleton-text w-full" />
            <div className="skeleton-text w-3/4" />
          </div>

          {/* Buttons skeleton */}
          <div className="flex gap-4 pt-4">
            <div className="skeleton h-12 w-32 rounded-sm" />
            <div className="skeleton h-12 w-32 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Right side - image skeleton */}
      <div className="order-1 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent to-[rgba(160,210,180,0.1)] lg:order-2">
        <div className="skeleton h-full w-full" />
      </div>
    </section>
  );
}
