"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Dienst } from "@/types/diensten";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MOBILE_BREAKPOINT_PX } from "@/constants/config";

import dienstenData from "@/data/diensten.json";

const diensten = dienstenData as Dienst[];

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
      className="relative h-full w-full overflow-hidden bg-[var(--bg-primary)]"
      style={{
        background: `linear-gradient(135deg, var(--accent-tertiary) 0%, var(--accent-secondary) 40%, var(--accent-primary) 100%)`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/90">
        <span className="text-4xl" aria-hidden>
          {icon}
        </span>
        <span className="max-w-[85%] text-center text-xs opacity-80">
          {title}
        </span>
      </div>
      <div className="absolute bottom-2 right-2 font-serif text-4xl font-bold text-white/20">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

const ServiceCard = ({
  dienst,
  index,
  isActive,
}: {
  dienst: Dienst;
  index: number;
  isActive: boolean;
}) => {
  return (
    <article
      className="group flex h-full flex-col border border-[var(--border)] bg-[var(--surface)]"
      aria-current={isActive ? "true" : undefined}
    >
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden md:h-[220px]">
        {dienst.image ? (
          <Image
            src={dienst.image}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <ServiceImagePlaceholder
            icon={dienst.icon}
            title={dienst.title}
            index={index}
          />
        )}
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
        <div className="min-h-[7.5rem] shrink-0">
          <span
            className="mb-1 block font-mono text-xs font-medium tracking-widest text-[var(--accent-primary)]"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-lg font-bold leading-tight text-[var(--text-primary)] md:text-xl">
            {dienst.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {dienst.description}
          </p>
        </div>
        <div className="min-h-[3rem] shrink-0 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {dienst.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-[var(--border)] bg-[var(--bg-primary)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* <a
          href={dienst.href ?? "#"}
          className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-4 text-sm font-semibold text-[var(--accent-primary)] no-underline transition-all hover:gap-3"
        >
          Meer informatie
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a> */}
      </div>
    </article>
  );
};

const MemoizedServiceCard = ({ ...props }: any) => <ServiceCard {...props} />;

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
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

export function Diensten() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const cardsVisible = isMobile ? 1 : 3;
  const cardWidthPercent = 100 / cardsVisible;
  const maxIndex = Math.max(0, diensten.length - cardsVisible);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(Math.max(0, diensten.length - cardsVisible), i + 1));
  }, []);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const section = sectionRef.current;
      if (!section?.contains(document.activeElement)) {
        return;
      }

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

  const atStart = activeIndex === 0;
  const atEnd = activeIndex >= maxIndex;

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

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

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - start.x;
      const deltaY = endY - start.y;

      const minSwipeDistance = 50;
      if (
        Math.abs(deltaX) > Math.abs(deltaY) &&
        Math.abs(deltaX) > minSwipeDistance
      ) {
        if (deltaX < 0 && !atEnd) {
          goNext();
        } else if (deltaX > 0 && !atStart) {
          goPrev();
        }
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
          className={`h-2 w-2 rounded-full transition-colors md:h-2.5 md:w-2.5 ${
            index === activeIndex
              ? "bg-[var(--accent-primary)]"
              : "bg-[var(--border)] hover:bg-[var(--accent-tertiary)]"
          }`}
        />
      )),
    [maxIndex, activeIndex],
  );

  return (
    <section
      ref={sectionRef}
      id="diensten"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)]"
      style={{ scrollMarginTop: "6rem" }}
      tabIndex={0}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center px-6 py-8 md:px-10 md:py-12 lg:px-16">
        <header className="mb-6 shrink-0 text-center md:mb-8">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
            Onze Diensten
          </p>
          <h2 className="font-serif text-3xl font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl">
            Vakwerk in elke tak
          </h2>
        </header>

        <div className="flex w-full flex-col items-center">
          <div
            className="h-[440px] w-full overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex h-full items-stretch transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${activeIndex * cardWidthPercent}%)`,
              }}
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
                  <MemoizedServiceCard
                    dienst={dienst}
                    index={index}
                    isActive={
                      index >= activeIndex &&
                      index < activeIndex + cardsVisible
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex shrink-0 items-center justify-center gap-4 md:mt-6">
            <button
              type="button"
              onClick={goPrev}
              disabled={atStart}
              aria-label="Vorige dienst"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] disabled:pointer-events-none disabled:opacity-40"
            >
              <Chevron direction="left" />
            </button>

            <div
              className="flex gap-2"
              role="tablist"
              aria-label="Diensten"
            >
              {dotButtons}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={atEnd}
              aria-label="Volgende dienst"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] disabled:pointer-events-none disabled:opacity-40"
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
