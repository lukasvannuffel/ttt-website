"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { PARALLAX_FACTOR } from "@/constants/config";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Hero() {
    const isMobile = useIsMobile();
    const parallaxRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Scroll-triggered reveal for mobile using Intersection Observer
    useEffect(() => {
        if (!isMobile || !imageRef.current) return;

        const target = imageRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    target.style.transform = "scale(1)";
                    target.style.opacity = "1";
                    observer.unobserve(target);
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [isMobile]);

    // Scroll-triggered parallax for desktop — direct DOM mutation, no setState
    useEffect(() => {
        if (isMobile) return;

        function handleScroll() {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }

            rafRef.current = requestAnimationFrame(() => {
                if (parallaxRef.current) {
                    parallaxRef.current.style.transform = `translateY(${window.scrollY * PARALLAX_FACTOR}px)`;
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

    const setSharedRef = useCallback((node: HTMLDivElement | null): void => {
        parallaxRef.current = node;
        imageRef.current = node;
    }, []);

    // Initial mobile state -- hidden until intersection fires
    const mobileInitialStyle = isMobile
        ? { transform: "scale(0.95)", opacity: 0, transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }
        : { transition: "transform 0.1s ease-out" };

    return (
        <section
            id="home"
            className="relative grid min-h-screen grid-cols-1 grid-rows-[52vh_auto] overflow-visible min-[320px]:min-h-[100dvh] lg:h-auto lg:min-h-screen lg:grid-cols-2 lg:grid-rows-1"
        >
            <div className="order-1 h-[52vh] lg:hidden" aria-hidden="true" />

            <div className="order-2 relative z-20 -mt-1 flex flex-col justify-start overflow-visible bg-[var(--bg-primary)] px-8 pb-20 pt-10 md:mt-0 md:px-16 md:pt-[140px] lg:order-1 lg:justify-center lg:overflow-hidden lg:bg-gradient-to-b lg:from-[var(--bg-primary)] lg:via-[var(--bg-primary)] lg:to-[rgba(160,210,180,0.08)] lg:pt-[160px] lg:pl-[120px] lg:pr-20">
                {/* Organic background accent */}
                <div
                    className="absolute -right-40 top-0 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--accent-tertiary)] to-transparent opacity-5 blur-3xl pointer-events-none"
                    aria-hidden="true"
                />

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
                    <div className="hero-cta flex flex-col gap-4 sm:flex-row">
                        <Link href="#diensten" className="btn btn-primary glow-on-hover w-full sm:w-auto">
                            Diensten
                        </Link>
                        <Link href="#contact" className="btn btn-secondary glow-on-hover w-full sm:w-auto">
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
                    ref={setSharedRef}
                    className="hero-image-parallax absolute inset-0 h-full w-full"
                    style={mobileInitialStyle}
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
                    style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)" }}
                    aria-hidden="true"
                />

                {/* Solid 2px band at bottom to eliminate subpixel line (mobile) */}
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-[var(--bg-primary)] lg:hidden"
                    aria-hidden="true"
                />
            </div>

            <div
                className="circle-accent absolute right-[-200px] top-1/2 z-10 hidden h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-[var(--border)] md:block"
                aria-hidden="true"
            />
        </section>
    );
}
