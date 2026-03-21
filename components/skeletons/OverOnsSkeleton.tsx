"use client";

export function OverOnsSkeleton() {
  return (
    <section className="min-h-screen flex items-center px-6 py-16 md:px-10 md:py-24 lg:px-16 relative overflow-hidden bg-gradient-to-b from-[var(--surface)] to-[var(--surface)]">
      <div className="mx-auto max-w-[1400px] w-full relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:items-center">
          {/* Left side - Image skeleton */}
          <div className="flex w-full justify-center items-center">
            <div className="relative aspect-[4/5] w-[280px] md:w-[350px] lg:w-[420px] overflow-hidden rounded-3xl">
              <div className="skeleton w-full h-full" />
            </div>
          </div>

          {/* Right side - Content skeleton */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Label skeleton */}
            <div className="skeleton-text-sm w-24" />

            {/* Heading skeleton */}
            <div className="space-y-3">
              <div className="skeleton-text-lg w-4/5" />
              <div className="skeleton-text-lg w-3/5" />
            </div>

            {/* Description paragraphs */}
            <div className="space-y-3 max-w-2xl">
              <div className="skeleton-text w-full" />
              <div className="skeleton-text w-full" />
              <div className="skeleton-text w-4/5" />
            </div>

            {/* Separator */}
            <div className="h-px bg-[var(--border)]" />

            {/* More description */}
            <div className="space-y-3">
              <div className="skeleton-text w-full" />
              <div className="skeleton-text w-3/4" />
            </div>

            {/* CTA Button skeleton */}
            <div className="skeleton h-12 w-40 rounded-sm mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
