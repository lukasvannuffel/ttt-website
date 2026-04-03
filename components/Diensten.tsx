"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Dienst } from "@/types/diensten";
import { MIN_SWIPE_DISTANCE_PX } from "@/constants/config";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import dienstenData from "@/data/diensten.json";

// Type-safe cast validated at build time by the Dienst interface
const diensten: Dienst[] = dienstenData;

function ServiceImagePlaceholder({
    icon,
    title,
    index,
}: {
    icon: string;
    title: string;
    index: number;
}) {
    return (
        <div
            className="relative h-full w-full overflow-hidden"
            style={{
                background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 60%, var(--accent-tertiary) 100%)",
            }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/85">
                <span className="text-5xl" aria-hidden="true">
                    {icon}
                </span>
                <span className="max-w-[85%] text-center text-xs font-light opacity-75">
                    {title}
                </span>
            </div>
            <div className="absolute bottom-3 right-3 font-serif text-3xl font-light text-white/15" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
            </div>
        </div>
    );
}

const CARD_HOVER_CLASSES = "hover:shadow-[0_24px_48px_rgba(27,67,50,0.2)] hover:-translate-y-2 hover:border-[var(--accent-tertiary)]";

function ServiceCard({
    dienst,
    index,
    isActive,
}: {
    dienst: Dienst;
    index: number;
    isActive: boolean;
}) {
    const ref = useScrollReveal(0.2);

    return (
        <article
            ref={ref}
            className={`group flex h-full flex-col border border-[var(--border)] bg-[var(--surface)] transition-all duration-500 opacity-0 ${CARD_HOVER_CLASSES}`}
            style={{ animationDelay: `${index * 0.08}s` }}
            aria-current={isActive ? "true" : undefined}
        >
            <div className="relative h-[200px] w-full shrink-0 overflow-hidden md:h-[240px] bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)]">
                {dienst.image ? (
                    <Image
                        src={dienst.image}
                        alt={dienst.title}
                        fill
                        className="object-cover object-center transition-transform duration-600 group-hover:scale-120 opacity-85 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                ) : (
                    <ServiceImagePlaceholder
                        icon={dienst.icon}
                        title={dienst.title}
                        index={index}
                    />
                )}

                {/* Overlay accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-primary)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--accent-warm)]/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-6 py-7 md:px-7 md:py-8">
                <div className="min-h-[8rem] shrink-0">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold tracking-widest text-[var(--accent-primary)] opacity-60">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-grow h-0.5 bg-gradient-to-r from-[var(--accent-tertiary)] to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                    </div>
                    <h3 className="font-serif text-lg font-bold leading-tight text-[var(--text-primary)] md:text-xl group-hover:text-[var(--accent-primary)] transition-colors duration-400">
                        {dienst.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {dienst.description}
                    </p>
                </div>

                <div className="min-h-[3rem] shrink-0 pt-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {dienst.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-sm border border-[var(--accent-tertiary)] bg-gradient-to-br from-[var(--accent-tertiary)]/8 to-transparent px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[var(--text-secondary)] transition-all duration-300 group-hover:border-[var(--accent-warm)] group-hover:bg-gradient-to-br group-hover:from-[var(--accent-warm)]/15 group-hover:to-transparent group-hover:text-[var(--accent-warm)]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
    const path = direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";

    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d={path} />
        </svg>
    );
}

const NAV_BUTTON_CLASSES = "group flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-[var(--accent-tertiary)] bg-gradient-to-br from-[var(--accent-tertiary)]/10 to-transparent text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:bg-gradient-to-br hover:from-[var(--accent-primary)]/15 hover:to-transparent hover:text-[var(--accent-primary)] hover:shadow-[0_8px_20px_rgba(27,67,50,0.15)] disabled:pointer-events-none disabled:opacity-30";

export function Diensten() {
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useScrollReveal<HTMLElement>(0.3);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    const isMobile = useIsMobile();

    // Responsive visible cards count
    const cardsVisible = isMobile ? 1 : 3;
    const cardWidthPercent = 100 / cardsVisible;
    const maxIndex = Math.max(0, diensten.length - cardsVisible);

    const atStart = activeIndex === 0;
    const atEnd = activeIndex >= maxIndex;

    const goPrev = useCallback(() => {
        setActiveIndex((i) => Math.max(0, i - 1));
    }, []);

    const goNext = useCallback(() => {
        setActiveIndex((i) => Math.min(maxIndex, i + 1));
    }, [maxIndex]);

    // Keyboard navigation — only when focus is inside the section
    useEffect(() => {
        function handleKeydown(e: KeyboardEvent) {
            if (!sectionRef.current?.contains(document.activeElement)) return;

            if (e.key === "ArrowLeft") {
                goPrev();
                e.preventDefault();
            } else if (e.key === "ArrowRight") {
                goNext();
                e.preventDefault();
            }
        }

        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [goPrev, goNext]);

    // Reset active index when card count changes (mobile ↔ desktop)
    useEffect(() => {
        setActiveIndex((i) => Math.min(i, maxIndex));
    }, [maxIndex]);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };
    }, []);

    const handleTouchEnd = useCallback(
        (e: React.TouchEvent) => {
            const start = touchStartRef.current;
            touchStartRef.current = null;

            if (!start) return;

            const deltaX = e.changedTouches[0].clientX - start.x;
            const deltaY = e.changedTouches[0].clientY - start.y;

            const isHorizontalSwipe =
                Math.abs(deltaX) > Math.abs(deltaY) &&
                Math.abs(deltaX) > MIN_SWIPE_DISTANCE_PX;

            if (!isHorizontalSwipe) return;

            if (deltaX < 0 && !atEnd) {
                goNext();
            } else if (deltaX > 0 && !atStart) {
                goPrev();
            }
        },
        [goNext, goPrev, atStart, atEnd],
    );

    const dotButtons = useMemo(
        () =>
            Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                        index === activeIndex
                            ? "h-3 w-8 md:h-3 md:w-10 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_4px_12px_rgba(27,67,50,0.2)]"
                            : "h-2 w-2 md:h-2.5 md:w-2.5 bg-[var(--border)] hover:bg-[var(--accent-tertiary)]"
                    }`}
                />
            )),
        [maxIndex, activeIndex],
    );

    return (
        <section
            ref={sectionRef}
            id="diensten"
            className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)] to-[rgba(45,110,95,0.05)]"
            style={{ scrollMarginTop: "6rem" }}
            tabIndex={0}
        >
            {/* Background accents */}
            <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-[var(--accent-tertiary)] to-transparent opacity-[0.06] blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-32 left-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-[var(--accent-secondary)] to-transparent opacity-5 blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center px-6 py-12 md:px-10 md:py-16 lg:px-16 relative z-10">
                <header ref={headerRef} className="mb-12 shrink-0 text-center md:mb-16 opacity-0">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-tertiary)]" aria-hidden="true" />
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                            Onze Diensten
                        </p>
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-tertiary)]" aria-hidden="true" />
                    </div>
                    <h2 className="font-serif text-3xl font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl">
                        Vakwerk in elke tak
                    </h2>
                    <p className="mt-4 text-[var(--text-secondary)] text-sm md:text-base max-w-2xl mx-auto">
                        Professionele boomverzorging voor elk project, van vellen tot onderhoud
                    </p>
                </header>

                <div className="flex w-full flex-col items-center">
                    <div
                        className="relative h-[540px] w-full overflow-hidden touch-pan-y md:h-[520px]"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/40 via-transparent to-[var(--bg-primary)]/40 pointer-events-none z-20" aria-hidden="true" />

                        <div
                            className="flex h-full items-stretch transition-transform duration-400 ease-out"
                            style={{ transform: `translateX(-${activeIndex * cardWidthPercent}%)` }}
                        >
                            {diensten.map((dienst, index) => (
                                <div
                                    key={dienst.title}
                                    className="flex h-full flex-shrink-0 px-1 md:px-2"
                                    style={{
                                        width: `${cardWidthPercent}%`,
                                        minWidth: `${cardWidthPercent}%`,
                                    }}
                                >
                                    <ServiceCard
                                        dienst={dienst}
                                        index={index}
                                        isActive={index >= activeIndex && index < activeIndex + cardsVisible}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex shrink-0 items-center justify-center gap-6 md:mt-12">
                        <button
                            type="button"
                            onClick={goPrev}
                            disabled={atStart}
                            aria-label="Vorige dienst"
                            className={NAV_BUTTON_CLASSES}
                        >
                            <Chevron direction="left" />
                        </button>

                        <div
                            className="flex gap-3"
                            role="tablist"
                            aria-label="Diensten navigatie"
                        >
                            {dotButtons}
                        </div>

                        <button
                            type="button"
                            onClick={goNext}
                            disabled={atEnd}
                            aria-label="Volgende dienst"
                            className={NAV_BUTTON_CLASSES}
                        >
                            <Chevron direction="right" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
