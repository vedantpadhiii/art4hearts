import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  triggerOffset?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'scaleUp';
  className?: string;
}

const Section = styled.div`
  opacity: 0;
  visibility: hidden;
  will-change: transform;
`;

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  triggerOffset = '-20%',
  animation = 'fadeUp',
  className,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const getAnimation = () => {
      switch (animation) {
        case 'fadeUp':
          return {
            y: 30,
            opacity: 0,
            visibility: 'hidden',
            duration: 1,
            ease: 'power3.out',
          };
        case 'fadeIn':
          return {
            opacity: 0,
            visibility: 'hidden',
            duration: 1,
            ease: 'power2.out',
          };
        case 'scaleUp':
          return {
            scale: 0.95,
            opacity: 0,
            visibility: 'hidden',
            duration: 1,
            ease: 'power3.out',
          };
        default:
          return {};
      }
    };

    gsap.fromTo(
      section,
      getAnimation(),
      {
        y: 0,
        scale: 1,
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        delay,
        scrollTrigger: {
          trigger: section,
          start: `top ${triggerOffset}`,
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [animation, delay, triggerOffset]);

  return (
    <Section ref={sectionRef} className={className}>
      {children}
    </Section>
  );
};

export default AnimatedSection;