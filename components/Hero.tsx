"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PARALLAX_FACTOR = 0.4;

export function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setOffsetY(window.scrollY * PARALLAX_FACTOR);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2"
    >
      <div className="flex flex-col justify-center px-8 pb-20 pt-[120px] md:px-16 md:pt-[160px] lg:pl-[120px] lg:pr-20 lg:pt-[180px]">
        <div className="hero-label mb-8">
          Professionele Boomverzorging
        </div>
        <h1 className="mb-8 font-serif text-5xl font-black leading-[0.95] tracking-tight text-[var(--text-primary)] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px]">
          Tree
          <br />
          <span className="hero-headline-underline">Top Tom</span>
        </h1>
        <p className="mb-12 max-w-[480px] text-lg leading-relaxed text-[var(--text-secondary)]">
          Veilig en vakkundig boomwerk in Oost-Vlaanderen. Van vellen tot
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
        className="relative h-full min-h-[50vh] w-full overflow-hidden lg:min-h-0"
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
            alt="Professionele boomverzorger aan het werk in de boom in Oost-Vlaanderen"
            fill
            className="object-cover object-center opacity-90"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
      <div
        className="circle-accent absolute right-[-200px] top-1/2 z-10 h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-[var(--border)]"
        aria-hidden
      />
    </section>
  );
}
