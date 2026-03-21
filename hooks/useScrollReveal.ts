import { useEffect, useRef, RefObject } from "react";

type AnimationType = "up" | "left" | "right" | "scale" | "fade";

export function useScrollReveal<T extends HTMLElement>(
  threshold = 0.1,
  animationType: AnimationType = "up"
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animationMap = {
            up: "reveal",
            left: "reveal-left",
            right: "reveal-right",
            scale: "reveal-scale",
            fade: "reveal",
          };
          entry.target.classList.add(animationMap[animationType]);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, animationType]);

  return ref;
}
