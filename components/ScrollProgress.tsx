"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress =
        windowHeight > 0
          ? (window.scrollY / windowHeight) * 100
          : 0;
      setScrollProgress(progress);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${scrollProgress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
