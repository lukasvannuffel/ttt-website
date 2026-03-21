"use client";

import { useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/constants/config";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

/**
 * Dynamic Instagram Feed — powered by Behold.so
 *
 * Setup:
 * 1. Go to https://behold.so and create a free account
 * 2. Connect your Instagram account (@_tree_top_tom_)
 * 3. Create a new feed → choose "Simple Grid" or "Gallery"
 * 4. Copy your Feed ID from the dashboard
 * 5. Paste it below as BEHOLD_FEED_ID
 *
 * That's it — new posts appear automatically.
 * Free tier: 1 feed, 12 posts, updates every 6 hours.
 */
const BEHOLD_FEED_ID = "FpvRdgx572FiW0fh5Bhe";

export function InstagramFeed() {
  const sectionRef = useScrollReveal<HTMLElement>(0.15);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!BEHOLD_FEED_ID || scriptLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://w.behold.so/widget.js";
    script.type = "module";
    script.async = true;
    document.head.appendChild(script);
    scriptLoaded.current = true;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="opacity-0 relative px-6 py-20 md:px-10 md:py-28 lg:px-16 bg-gradient-to-b from-[rgba(160,210,180,0.06)] to-[var(--surface)] overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute -right-32 top-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-[var(--accent-tertiary)] to-transparent opacity-5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1400px] w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-tertiary)]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
              Volg ons op Instagram
            </p>
            <div className="w-2 h-2 rounded-full bg-[var(--accent-tertiary)]" />
          </div>
          <h2 className="font-serif text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl mb-4">
            @{INSTAGRAM_HANDLE}
          </h2>
          <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-xl mx-auto">
            Bekijk ons laatste werk en volg onze projecten
          </p>
        </div>

        {/* Instagram Feed */}
        <div ref={containerRef} className="w-full">
          {BEHOLD_FEED_ID ? (
            <div
              dangerouslySetInnerHTML={{
                __html: `<behold-widget feed-id="${BEHOLD_FEED_ID}"></behold-widget>`,
              }}
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <a
                  key={i}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]/30"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                    <span className="opacity-40 group-hover:opacity-70 transition-opacity">
                      <InstagramIcon size={24} />
                    </span>
                    <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                      Instagram
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/0 to-[var(--accent-primary)]/0 group-hover:from-[var(--accent-primary)]/5 group-hover:to-[var(--accent-secondary)]/10 transition-all duration-300" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary glow-on-hover inline-flex items-center justify-center gap-2"
          >
            <InstagramIcon size={18} />
            <span>Volg me hier</span>
          </a>
        </div>
      </div>
    </section>
  );
}
