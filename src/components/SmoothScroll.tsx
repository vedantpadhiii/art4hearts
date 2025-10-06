import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SmoothScrollContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

const ScrollContent = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  pointer-events: all;
  transform-origin: top;
  transition: transform 0.1s ease;
`;

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const scroll = scrollRef.current;
    const ghost = ghostRef.current;
    
    if (!scroll || !ghost) return;

    let ctx = gsap.context(() => {
      const smoothScroll = gsap.to(scroll, {
        y: () => -(ghost.scrollHeight - window.innerHeight),
        ease: 'none',
        scrollTrigger: {
          trigger: ghost,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Handle internal links smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href');
          if (targetId) {
            const target = document.querySelector(targetId);
            if (target) {
              gsap.to(window, {
                duration: 1,
                scrollTo: {
                  y: target,
                  offsetY: 80,
                },
                ease: 'power3.inOut',
              });
            }
          }
        });
      });

      return () => {
        smoothScroll.kill();
      };
    });

    return () => {
      ctx.revert();
    };
  }, [location.pathname]);

  return (
    <>
      <SmoothScrollContainer ref={scrollRef}>
        <ScrollContent>{children}</ScrollContent>
      </SmoothScrollContainer>
      <div ref={ghostRef} style={{ visibility: 'hidden', position: 'relative' }}>
        {children}
      </div>
    </>
  );
};

export default SmoothScroll;
