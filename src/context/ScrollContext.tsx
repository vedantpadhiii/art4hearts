import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollSnap } from '../hooks/useScrollSnap';

interface ScrollContextType {
  currentSection: number;
  totalSections: number;
  isScrolling: boolean;
  direction: 'up' | 'down';
  scrollY: number;
  containerRef: React.RefObject<HTMLDivElement>;
  setTotalSections: (total: number) => void;
  scrollToSection: (index: number) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  currentSection: 0,
  totalSections: 0,
  isScrolling: false,
  direction: 'down',
  scrollY: 0,
  containerRef: { current: null },
  setTotalSections: () => {},
  scrollToSection: () => {},
});

export const useScroll = () => useContext(ScrollContext);

interface ScrollProviderProps {
  children: React.ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [totalSections, setTotalSections] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useScrollSnap(containerRef, (index) => {
    setCurrentSection(index);
    setDirection(index > currentSection ? 'down' : 'up');
  });

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSections) return;
    
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('section');
    if (index >= 0 && index < sections.length) {
      setIsScrolling(true);
      setDirection(index > currentSection ? 'down' : 'up');
      
      sections[index].scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(index);
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, [currentSection, totalSections]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      setScrollY(0);
    }
    setCurrentSection(0);
  }, [location.pathname]);

  return (
    <ScrollContext.Provider 
      value={{ 
        currentSection, 
        totalSections, 
        isScrolling, 
        direction,
        scrollY,
        containerRef,
        setTotalSections,
        scrollToSection
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollContext;