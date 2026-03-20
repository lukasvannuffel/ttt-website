"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PARALLAX_FACTOR } from "@/constants/config";

export function Hero() {
  const [offsetY, setOffsetY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function handleScroll() {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setOffsetY(window.scrollY * PARALLAX_FACTOR);
        rafRef.current = null;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="relative grid h-screen grid-cols-1 grid-rows-[1fr_auto] overflow-hidden lg:min-h-screen lg:grid-cols-2 lg:grid-rows-1 lg:h-auto"
    >
      <div className="order-2 -mt-1 flex flex-col justify-center bg-[var(--bg-primary)] px-8 pb-20 pt-8 md:mt-0 md:px-16 md:pt-[160px] lg:order-1 lg:pt-[180px] lg:pl-[120px] lg:pr-20">
        <div className="hero-label mb-8">
          Boomverzorging
        </div>
        <h1 className="mb-8 font-serif text-5xl font-black leading-[0.95] tracking-tight text-[var(--text-primary)] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px]">
          Tree
          <br />
          <span className="hero-headline-underline">Top Tom</span>
        </h1>
        <p className="mb-12 max-w-[480px] text-lg leading-relaxed text-[var(--text-secondary)]">
          Veilig en vakkundig boomwerk in Vlaams-Brabant. Van vellen tot
          snoeien, met passie voor elke boom.
        </p>
        <div className="flex gap-4">
          <Link href="#diensten" className="btn btn-primary">
            Diensten
          </Link>
          <Link href="#contact" className="btn btn-secondary">
            Contact me
          </Link>
        </div>
      </div>
      <div
        className="order-1 relative min-h-0 w-full overflow-hidden lg:order-2 lg:h-full"
        style={{
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <div
          className="absolute inset-0 min-h-full min-w-full transition-transform duration-100 ease-out"
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          <Image
            src="/img/hero.png"
            alt="Professionele boomverzorger aan het werk in de boom in Vlaams-Brabant"
            fill
            className="object-cover object-top opacity-90 lg:object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        {/* Mobile: short, aggressive fade at bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 lg:hidden"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 0%, var(--bg-primary) 35%, transparent 100%)",
          }}
          aria-hidden
        />
        {/* Solid 2px band at bottom to eliminate subpixel line (mobile) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-[var(--bg-primary)] lg:hidden"
          aria-hidden
        />
        {/* Desktop: very narrow soft edge along diagonal – only softens the cut, does not cover the photo */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[10%] lg:block"
          style={{
            background:
              "linear-gradient(98deg, var(--bg-primary) 0%, var(--bg-primary) 75%, transparent 100%)",
            clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
          }}
          aria-hidden
        />
      </div>
      <div
        className="circle-accent absolute right-[-200px] top-1/2 z-10 hidden h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-[var(--border)] md:block"
        aria-hidden
      />
    </section>
  );
}
