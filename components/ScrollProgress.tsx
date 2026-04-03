"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        function handleScroll(): void {
            if (rafRef.current !== null) {
                return;
            }

            rafRef.current = requestAnimationFrame(() => {
                const scrollableHeight: number =
                    document.documentElement.scrollHeight -
                    document.documentElement.clientHeight;

                const progress: number = scrollableHeight > 0
                    ? (window.scrollY / scrollableHeight) * 100
                    : 0;

                if (barRef.current) {
                    barRef.current.style.width = `${progress}%`;
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
    }, []);

    return (
        <div
            ref={barRef}
            className="scroll-progress"
            role="progressbar"
            aria-label="Scrollvoortgang"
            aria-valuemin={0}
            aria-valuemax={100}
        />
    );
}
