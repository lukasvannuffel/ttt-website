"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function OverOns() {
  const imageRef = useScrollReveal<HTMLDivElement>(0.2, "left");
  const contentRef = useScrollReveal<HTMLDivElement>(0.2, "right");
  const [imageSrc, setImageSrc] = useState("/img/Tom.png");
  return (
    <section
      id="over"
      className="bg-gradient-to-b from-[var(--surface)] to-[var(--surface)] min-h-screen flex items-center px-6 py-16 md:px-10 md:py-24 lg:px-16 relative overflow-hidden"
    >
      {/* Organic background accent */}
      <div className="absolute -left-32 top-1/3 w-80 h-80 rounded-full bg-gradient-to-br from-[var(--accent-tertiary)] to-transparent opacity-5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1400px] w-full relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:items-center">
          {/* Image at the top on mobile */}
          <div ref={imageRef} className="opacity-0 flex w-full justify-center items-center order-[-1] mb-6 lg:order-none lg:mb-0">
            <div className="relative aspect-[4/5] w-[280px] md:w-[350px] lg:w-[420px] overflow-hidden group">
              {/* Organic frame background */}
              <div className="absolute -inset-6 bg-gradient-to-br from-[var(--accent-warm)]/30 to-[var(--accent-gold)]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

              <Image
                src={imageSrc}
                alt="Tree Top Tom boomverzorging"
                fill
                className="object-cover object-[top_20%] transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 90vw, 420px"
                priority={false}
                onError={() => setImageSrc("/img/Logo.svg")}
              />
              {/* Organic corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--accent-tertiary)] opacity-30" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--accent-tertiary)] opacity-30" />
            </div>
          </div>

          <div ref={contentRef} className="opacity-0 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-tertiary)] to-[var(--accent-secondary)] opacity-70" />
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--accent-primary)]">
                Over mij
              </p>
            </div>
            <h2 className="mb-10 font-serif text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl">
              Met passie voor vakwerk
            </h2>

            <div className="max-w-2xl space-y-7">
              <p className="text-[var(--text-secondary)] leading-relaxed text-[15px] relative pl-6">
                <span className="absolute -left-3 top-1 text-[var(--accent-tertiary)] text-2xl opacity-30">🌿</span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque nobis deleniti dignissimos! Beatae, sunt cumque?
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed text-[15px] relative pl-6">
                <span className="absolute -left-3 top-1 text-[var(--accent-tertiary)] text-2xl opacity-30">🌱</span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores saepe sequi itaque autem error? Ex, voluptas quibusdam.
              </p>
            </div>

            <Link
              href="#contact"
              className="btn btn-primary mt-12 inline-flex min-h-[44px] items-center justify-center"
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
