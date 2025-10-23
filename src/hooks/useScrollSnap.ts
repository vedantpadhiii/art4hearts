import { useEffect, useRef } from 'react';

export const useScrollSnap = (containerRef: React.RefObject<HTMLElement>, onSectionChange: (index: number) => void) => {
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling.current) {
        return;
      }

      const now = Date.now();
      if (now - lastScrollTime.current < 100) {
        return;
      }

      isScrolling.current = true;
      lastScrollTime.current = now;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        const sections = Array.from(container.querySelectorAll('section'));
        const containerTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        
        let currentSectionIndex = 0;
        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= containerHeight / 3) {
            currentSectionIndex = index;
          }
        });

        onSectionChange(currentSectionIndex);
        isScrolling.current = false;
      }, 100);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [containerRef, onSectionChange]);
};