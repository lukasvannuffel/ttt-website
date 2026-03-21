"use client";

import { useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INSTAGRAM_HANDLE = "_tree_top_tom_";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

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
const BEHOLD_FEED_ID = "#"; // ← Paste your Behold feed ID here

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

    return () => {
      // Cleanup not strictly needed since script is idempotent
    };
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
            /* Placeholder until Behold is configured */
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
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="opacity-40 group-hover:opacity-70 transition-opacity"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                      Instagram
                    </span>
                  </div>
                  {/* Hover overlay */}
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
            className="btn btn-secondary glow-on-hover inline-flex flex-row items-center gap-2"
            style={{ verticalAlign: "middle", justifyContent: "center" }}
          >
            <span className="flex flex-row items-center gap-2">
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
                className="inline align-middle"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="inline align-middle">Volg me hier</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
