import { useState, useEffect, useCallback } from 'react';

interface UseCountUpProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  isVisible?: boolean;
}

const easeOutQuad = (t: number): number => t * (2 - t);

const useCountUp = ({ end, start = 0, duration = 2000, delay = 0, isVisible = false }: UseCountUpProps) => {
  const [count, setCount] = useState(start);

  const startAnimation = useCallback(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    const totalChange = end - start;

    const updateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      
      setCount(Math.floor(start + totalChange * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, start, duration]);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    const timeoutId = setTimeout(startAnimation, delay);
    return () => clearTimeout(timeoutId);
  }, [isVisible, delay, startAnimation]);

  return count;
};

export default useCountUp;