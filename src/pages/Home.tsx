import React, { useEffect, useRef } from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MissionStatement from '../components/MissionStatement';
import { float, gradientFlow, gradientMove, pulse, rotate, shimmer } from '../styles/animations';

interface ThemeProps {
  theme: DefaultTheme;
}

interface StyledComponent {
  theme: DefaultTheme;
}

const gradientBackground = ({ theme }: ThemeProps) => css`
  background: linear-gradient(135deg,
    ${theme.colors.secondaryLight} 0%,
    ${theme.colors.secondary} 100%
  );
`;

const radialGradient = ({ theme }: ThemeProps) => css`
  background: radial-gradient(
    circle at center,
    ${theme.colors.primaryLight}20 0%,
    transparent 50%,
    ${theme.colors.secondaryLight}20 100%
  );
`;

// Shared styles
const glassEffect = css<StyledComponent>`
  background: ${({ theme }) => theme.colors.background.glass};
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

gsap.registerPlugin(ScrollTrigger);

const HomeContainer = styled.div<StyledComponent>`
  min-height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.dark};
`;

const HeroSection = styled.section<StyledComponent>`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: 0;
  margin: 0;
`;

const BannerContainer = styled.div<StyledComponent>`
  width: 100%;
  min-height: 100vh;
  padding-top: ${({ theme }) => theme.spacing.header};
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => css`
      linear-gradient(
        135deg,
        ${theme.colors.secondaryLight} 0%,
        ${theme.colors.secondary} 100%
      )
    `};
    opacity: 0.5;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: ${({ theme }) => css`
      radial-gradient(
        circle at center,
        ${theme.colors.primaryLight}20 0%,
        transparent 50%,
        ${theme.colors.info}10 100%
      )
    `};
    animation: ${rotate} 30s linear infinite;
  }
`;

const Banner = styled.img`
  width: 90%;
  max-width: 1200px;
  height: auto;
  margin: 2rem auto;
  object-fit: contain;
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 800px;
  text-align: center;
  padding: 1.5rem;
  background: ${props => props.theme.colors.background.glass};
  border-radius: 16px;
  backdrop-filter: blur(12px);
  box-shadow: 
    0 8px 32px ${props => props.theme.colors.shadow},
    0 0 0 1px ${props => props.theme.colors.primaryLight}20 inset,
    0 0 0 2px ${props => props.theme.colors.secondaryLight}10 inset;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.4s ease;
  animation: float 6s ease-in-out infinite;
  
  &:hover {
    transform: translateX(-50%) translateY(-5px);
    box-shadow: 
      0 15px 40px ${props => props.theme.colors.shadow},
      0 0 0 2px ${props => props.theme.colors.primaryLight}30 inset,
      0 0 0 4px ${props => props.theme.colors.secondaryLight}20 inset;
  }
  
  @keyframes float {
    0%, 100% { transform: translateX(-50%) translateY(0px); }
    50% { transform: translateX(-50%) translateY(-10px); }
  }
  
  @media (max-width: 768px) {
    bottom: 2rem;
    padding: 1rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: ${props => props.theme.colors.text.dark};
  text-align: center;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

const StatSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1rem, 3vw, 2rem);
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  background: ${props => `linear-gradient(
    135deg,
    ${props.theme.colors.background.dark} 0%,
    ${props.theme.colors.background.light} 50%,
    ${props.theme.colors.background.dark} 100%
  )`};
  position: relative;
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => `radial-gradient(
      circle at center,
      ${props.theme.colors.secondary}20 0%,
      transparent 70%
    )`};
    pointer-events: none;
    animation: ${pulse} 8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    right: -100%;
    bottom: -100%;
    background: ${props => `
      radial-gradient(circle at 30% 30%, ${props.theme.colors.primaryLight}10 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, ${props.theme.colors.info}10 0%, transparent 50%),
      radial-gradient(circle at 30% 70%, ${props.theme.colors.warning}10 0%, transparent 50%),
      radial-gradient(circle at 70% 30%, ${props.theme.colors.success}10 0%, transparent 50%)
    `};
    animation: ${gradientMove} 20s ease-in-out infinite;
    z-index: 0;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div<StyledComponent>`
  padding: ${({ theme }) => theme.spacing.large};
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: 16px;
  box-shadow: ${({ theme }) => `
    0 4px 20px ${theme.colors.shadow}20,
    0 0 0 1px ${theme.colors.border} inset
  `};
  text-align: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${props => props.theme.colors.primaryLight}20,
      ${props => props.theme.colors.secondaryLight}20
    );
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 20px 40px ${props => props.theme.colors.shadow}30,
      0 0 0 2px ${props => props.theme.colors.primary}20 inset;

    &::before {
      opacity: 1;
    }

    .number {
      transform: scale(1.1);
      background: linear-gradient(135deg,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.info},
        ${props => props.theme.colors.success}
      );
      -webkit-background-clip: text;
      background-clip: text;
    }

    .label {
      transform: scale(1.05);
      color: ${props => props.theme.colors.primary};
    }
  }
  
  .number {
    font-size: clamp(2rem, 4vw, 3rem);
    margin: 0 0 0.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, 
      ${props => props.theme.colors.primary}, 
      ${props => props.theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.5s ease;
    display: inline-block;
  }
  
  .label {
    font-size: clamp(0.875rem, 2vw, 1rem);
    color: ${props => props.theme.colors.text.dark};
    margin: 0;
    opacity: 0.9;
    font-weight: 500;
    transition: all 0.5s ease;
    letter-spacing: 0.5px;
  }
`;

const RegistrationSection = styled.section`
  padding: ${props => props.theme.spacing.xxlarge} ${props => props.theme.spacing.large};
  background: ${props => props.theme.colors.background.light};
  margin-top: ${props => props.theme.spacing.xxlarge};
  padding-bottom: ${props => props.theme.spacing.xxxlarge};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    ${radialGradient}
    animation: ${gradientMove} 15s ease infinite;
  }
  
  h2 {
    font-size: ${props => props.theme.fontSizes.xxxlarge};
    font-family: ${props => props.theme.fonts.title};
    color: ${props => props.theme.colors.text.dark};
    margin-bottom: ${props => props.theme.spacing.large};
    font-weight: 700;
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => `radial-gradient(circle at center, ${props.theme.colors.primaryLight}20 0%, transparent 50%, ${props.theme.colors.secondaryLight}20 100%)`};
    animation: ${gradientMove} 15s ease infinite;
  }
  
  h2 {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-family: ${props => props.theme.fonts.title};
    color: ${props => props.theme.colors.text.dark};
    margin-bottom: ${props => props.theme.spacing.large};
    font-weight: 700;
    position: relative;
    z-index: 1;

    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background: ${props => `linear-gradient(90deg, ${props.theme.colors.primary}, ${props.theme.colors.info}, ${props.theme.colors.success})`};
      animation: ${gradientFlow} 3s linear infinite;
      background-size: 200% auto;
    }
  }

  p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: ${props => props.theme.colors.text.dark};
    max-width: 900px;
    margin: 0 auto;
    line-height: 1.8;
    opacity: 0.9;
    position: relative;
    z-index: 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  padding: 0 ${props => props.theme.spacing.medium};
`;

const FormEmbed = styled.div`
  margin-top: 4rem;
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px ${props => props.theme.colors.shadow};
  position: relative;
  background: ${props => props.theme.colors.background.light};
  border: 1px solid ${props => props.theme.colors.border};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      ${props => props.theme.colors.secondaryLight}, 
      ${props => props.theme.colors.secondary}
    );
  }

  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg,
      ${props => props.theme.colors.background.glass},
      ${props => props.theme.colors.background.light}
    );
    opacity: 0.5;
    pointer-events: none;
  }
  
  iframe {
    width: 100%;
    height: 800px;
    border: none;
    background: ${props => props.theme.colors.background.light};
    transition: opacity 0.3s ease;
    position: relative;
    z-index: 1;
    
    &:not([loaded]) {
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    margin-top: 3rem;
    iframe {
      height: 600px;
    }
  }
`;

const RegistrationButton = styled.a`
  display: inline-block;
  padding: 1.2rem 3rem;
  background: ${props => props.theme.colors.background.light};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  border-radius: 50px;
  font-family: ${props => props.theme.fonts.body};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  border: 2px solid ${props => props.theme.colors.primary};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      ${props => props.theme.colors.primary}, 
      ${props => props.theme.colors.primaryLight}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px ${props => props.theme.colors.shadow};
    color: ${props => props.theme.colors.background.light};
    border-color: transparent;
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(-2px) scale(0.98);
  }
`;

const Home: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statSectionRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!subtitleRef.current || !statSectionRef.current) {
      return;
    }

    // Initial hero animations
    gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
    
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });

    // Stats section animations
    const statCards = statSectionRef.current.querySelectorAll('.stat-card');
    const numbers = statSectionRef.current.querySelectorAll('.number');
    const labels = statSectionRef.current.querySelectorAll('.label');
    
    gsap.set([statCards, numbers, labels], { opacity: 0 });
    gsap.set(statCards, { y: 50 });
    
    ScrollTrigger.create({
      trigger: statSectionRef.current,
      start: "top center+=100",
      onEnter: () => {
        // Animate cards with a bounce effect
        gsap.to(statCards, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.2)"
        });
        
        // Animate numbers with a smooth countup
        numbers.forEach((number: Element, index: number) => {
          const htmlElement = number as HTMLElement;
          const target = parseInt(htmlElement.getAttribute('data-value') || '0', 10);
          gsap.fromTo(htmlElement, 
            { 
              opacity: 0,
              textContent: '0' 
            },
            {
              opacity: 1,
              duration: 0.6,
              delay: 0.2 + index * 0.1,
              snap: { textContent: 1 },
              textContent: target,
              ease: "power1.inOut",
              onComplete: () => {
                htmlElement.textContent = target + '+';
              }
            }
          );
        });
        
        // Fade in labels after numbers
        gsap.to(labels, {
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 1,
          ease: "power2.out"
        });
      },
      once: true // Only trigger once
    });

    // Mission section animation
    if (missionRef.current) {
      gsap.fromTo(missionRef.current, 
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Parallax effect for hero section
    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      },
      y: (index, target) => -target.offsetHeight * 0.2,
      ease: "none"
    });

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <HomeContainer>
      <HeroSection>
        <BannerContainer>
          <Banner src="/Art4Hearts Banner.png" alt="Art4Hearts Logo" />
          <HeroContent>
            <HeroSubtitle ref={subtitleRef}>
              Art4Hearts is a 501(3)c non-profit based in the Bay Area aiming to spread love through art. Join our creative journey!
            </HeroSubtitle>
          </HeroContent>
        </BannerContainer>
      </HeroSection>

      <div ref={missionRef}>
        <MissionStatement />
      </div>

      <StatSection ref={statSectionRef}>
        <StatCard className="stat-card">
          <div className="number" data-value="4500"></div>
          <div className="label">VOLUNTEERS WORLDWIDE</div>
        </StatCard>
        <StatCard className="stat-card">
          <div className="number" data-value="150"></div>
          <div className="label">ACTIVE CHAPTERS</div>
        </StatCard>
        <StatCard className="stat-card">
          <div className="number" data-value="50"></div>
          <div className="label">COUNTRIES REACHED</div>
        </StatCard>
        <StatCard className="stat-card">
          <div className="number" data-value="1000"></div>
          <div className="label">ART KITS & BRACELETS</div>
        </StatCard>
      </StatSection>

      <RegistrationSection>
        <h2>Join Our Mission!</h2>
        <p>
          Be part of a global movement that brings joy and creativity to those who need it most. 
          Whether you're an artist, student, or someone who wants to make a difference, 
          there's a place for you in the Art4Hearts family.
        </p>
        <ButtonContainer>
          <RegistrationButton 
            href="https://docs.google.com/forms/d/e/1FAIpQLSd98E0LsNhBywLdUhlIBmp6e88bjt81Fh1tV6Lz6FklT1LtEg/viewform" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Register as a Volunteer
          </RegistrationButton>
        </ButtonContainer>
        <FormEmbed>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd98E0LsNhBywLdUhlIBmp6e88bjt81Fh1tV6Lz6FklT1LtEg/viewform?embedded=true&usp=pp_url"
            title="Volunteer Registration Form"
            style={{ width: "100%", height: "800px", border: "none", background: "#fff" }}
            loading="lazy"
            onLoad={(e) => {
              const iframe = e.target as HTMLIFrameElement;
              if (iframe) {
                iframe.setAttribute('loaded', 'true');
              }
            }}
            allowFullScreen
          >
            Loading...
          </iframe>
        </FormEmbed>
      </RegistrationSection>
    </HomeContainer>
  );
};

export default Home;