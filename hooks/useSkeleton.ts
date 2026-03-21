import { useEffect, useState } from 'react';

/**
 * Hook to manage skeleton loading states
 * Simulates network delay and returns loading state
 */
export function useSkeleton(delay: number = 1500) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return { isLoading };
}

/**
 * Hook for staggered skeleton animations
 */
export function useStaggeredSkeleton(itemCount: number, delayPerItem: number = 100) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(itemCount).fill(false)
  );

  useEffect(() => {
    const timers = Array.from({ length: itemCount }).map((_, index) =>
      setTimeout(() => {
        setVisibleItems((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * delayPerItem)
    );

    return () => timers.forEach(clearTimeout);
  }, [itemCount, delayPerItem]);

  return visibleItems;
}
