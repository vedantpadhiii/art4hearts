import gsap from 'gsap';

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