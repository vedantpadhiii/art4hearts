import gsap from 'gsap';
import { keyframes } from 'styled-components';

// GSAP Animations
export const fadeInUp = (element: HTMLElement, delay: number = 0) => {
  return gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 1,
    delay,
    ease: "power3.out"
  });
};

export const staggerFadeInUp = (elements: HTMLElement[], stagger: number = 0.2) => {
  return gsap.from(elements, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger,
    ease: "power3.out"
  });
};

export const scaleIn = (element: HTMLElement, delay: number = 0) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay,
    ease: "back.out(1.7)"
  });
};

export const slideInLeft = (element: HTMLElement, delay: number = 0) => {
  return gsap.from(element, {
    x: -100,
    opacity: 0,
    duration: 1,
    delay,
    ease: "power3.out"
  });
};

export const slideInRight = (element: HTMLElement, delay: number = 0) => {
  return gsap.from(element, {
    x: 100,
    opacity: 0,
    duration: 1,
    delay,
    ease: "power3.out"
  });
};

export const createScrollTrigger = (
  element: HTMLElement, 
  animation: gsap.core.Tween,
  start: string = "top center",
  toggleActions: string = "play none none reverse"
) => {
  return ScrollTrigger.create({
    trigger: element,
    start,
    toggleActions,
    animation
  });
};

export const numberCounter = (element: HTMLElement, endValue: number, duration: number = 2) => {
  return gsap.to(element, {
    innerText: endValue,
    duration,
    snap: { innerText: 1 },
    ease: "power1.inOut"
  });
};

// Styled Components Animations
export const gradientMove = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-2%, -2%) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
`;

export const gradientFlow = keyframes`
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

export const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;