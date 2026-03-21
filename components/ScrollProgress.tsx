"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress =
        windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{
        backgroundColor: "#14532d",
        height: "4px",
        opacity: 1,
      }}
      role="progressbar"
      aria-label="Scrollvoortgang"
    />
  );
}
