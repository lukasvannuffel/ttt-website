"use client";

export function ContactSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center px-6 py-20 md:px-10 md:py-24 lg:px-16 bg-gradient-to-b from-[var(--surface)] via-[var(--surface)] to-[var(--surface)] overflow-hidden">
      <div className="mx-auto max-w-4xl w-full relative z-10">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="skeleton-text-sm w-32 mb-6" />
          <div className="space-y-3 mb-4">
            <div className="skeleton-text-lg w-3/4" />
            <div className="skeleton-text-lg w-1/2" />
          </div>
          <div className="space-y-2 max-w-2xl">
            <div className="skeleton-text w-full" />
            <div className="skeleton-text w-4/5" />
          </div>
        </div>

        {/* Form skeleton */}
        <div className="relative bg-white/70 backdrop-blur-sm border border-[rgba(184,149,106,0.2)] rounded-2xl p-8 md:p-12">
          {/* Form fields grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name field */}
            <div className="space-y-3">
              <div className="skeleton-text-sm w-16" />
              <div className="skeleton h-12 w-full rounded-lg" />
            </div>

            {/* Email field */}
            <div className="space-y-3">
              <div className="skeleton-text-sm w-16" />
              <div className="skeleton h-12 w-full rounded-lg" />
            </div>

            {/* Phone field */}
            <div className="space-y-3">
              <div className="skeleton-text-sm w-24" />
              <div className="skeleton h-12 w-full rounded-lg" />
            </div>

            {/* Service select */}
            <div className="space-y-3">
              <div className="skeleton-text-sm w-16" />
              <div className="skeleton h-12 w-full rounded-lg" />
            </div>
          </div>

          {/* Message field - full width */}
          <div className="mb-6 space-y-3">
            <div className="skeleton-text-sm w-16" />
            <div className="skeleton h-32 w-full rounded-lg" />
          </div>

          {/* Submit button skeleton */}
          <div className="skeleton h-12 w-48 rounded-sm" />

          {/* Trust elements skeleton */}
          <div className="mt-12 grid w-full grid-cols-3 gap-4 text-center md:gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="skeleton-text-lg w-12 mx-auto" />
                  <div className="skeleton-text-sm w-20 mx-auto" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
