"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PARALLAX_FACTOR } from "@/constants/config";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Hero() {
  const isMobile = useIsMobile();
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const rafRef = useRef<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered reveal for mobile using Intersection Observer
  useEffect(() => {
    if (!isMobile || !imageRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImageVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  // Scroll-triggered parallax for desktop
  useEffect(() => {
    function handleScroll() {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!isMobile) {
          setOffsetY(window.scrollY * PARALLAX_FACTOR);
        }
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
  }, [isMobile]);

  return (
    <section
      id="home"
      className="relative grid grid-cols-1 grid-rows-[52vh_auto] h-[100svh] lg:h-auto lg:min-h-screen lg:grid-cols-2 lg:grid-rows-1"
    >
      <div className="order-1 h-[52vh] lg:hidden" aria-hidden />
      <div
        className="order-2 -mt-1 relative z-20 flex flex-col justify-center overflow-hidden bg-[var(--bg-primary)] px-8 pb-20 pt-8 md:mt-0 md:px-16 md:pt-[140px] lg:order-1 lg:bg-gradient-to-b lg:from-[var(--bg-primary)] lg:via-[var(--bg-primary)] lg:to-[rgba(160,210,180,0.08)] lg:pt-[160px] lg:pl-[120px] lg:pr-20"
      >
        {/* Organic background accent */}
        <div className="absolute -right-40 top-0 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--accent-tertiary)] to-transparent opacity-5 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="hero-label mb-6">
            Boomverzorging
          </div>
          <h1 className="hero-headline mb-8 font-serif text-5xl font-black leading-[0.9] tracking-tight text-[var(--text-primary)] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px]">
            Tree
            <br />
            <span className="hero-headline-underline">Top Tom</span>
          </h1>
          <p className="hero-cta mb-12 max-w-[500px] text-base leading-relaxed text-[var(--text-secondary)] font-light">
            Professionele boomverzorging in Vlaams-Brabant. Veilig, vakkundig en duurzaam werk met passie voor elke boom.
          </p>
          <div className="hero-cta flex gap-4">
            <Link href="#diensten" className="btn btn-primary glow-on-hover">
              Diensten
            </Link>
            <Link href="#contact" className="btn btn-secondary glow-on-hover">
              Contact me
            </Link>
          </div>
        </div>
      </div>
      <div
        className="hero-image-container fixed left-0 right-0 top-0 z-0 h-[52vh] w-full overflow-hidden lg:order-2 lg:relative lg:left-auto lg:right-auto lg:top-auto lg:h-full"
        style={{
          clipPath: isMobile ? "none" : "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <div
          ref={imageRef}
          className="hero-image-parallax absolute inset-0 h-full w-full"
          style={{
            transform: isMobile
              ? (isImageVisible ? "scale(1)" : "scale(0.95)")
              : `translateY(${offsetY}px)`,
            opacity: isMobile ? (isImageVisible ? 1 : 0) : undefined,
            transition: isMobile
              ? "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
              : "transform 0.1s ease-out",
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
        {/* Mobile: thin, subtle fade at bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%] lg:hidden"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)",
          }}
          aria-hidden
        />
        {/* Solid 2px band at bottom to eliminate subpixel line (mobile) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-[var(--bg-primary)] lg:hidden"
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
