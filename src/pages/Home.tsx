import React from 'react';
import styled from 'styled-components';
import MissionStatement from '../components/MissionStatement';
import { useScroll } from '../context/ScrollContext';
import { float, gradientFlow, gradientMove, pulse, rotate } from '../styles/animations';
import useCountUp from '../hooks/useCountUp';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface StyledSectionProps {
  $isActive: boolean;
}

const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.dark};
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow-y: auto;

  .sections-container {
    position: relative;
    width: 100%;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.dark};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => `${theme.colors.primary}40`};
    border-radius: 20px;
    border: 2px solid ${({ theme }) => theme.colors.background.dark};
    transition: background-color 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}80`};
  }
`;

const Section = styled.section<StyledSectionProps>`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: ${({ theme }) => `${theme.spacing.xxlarge} ${theme.spacing.large}`};
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background-color: ${props => props.$isActive ? '#fff8e1' : 'white'};
`;

const HeroSection = styled(Section)`
  height: 100vh;
  position: relative;
  margin: 0;
  padding: 0;
  z-index: 1;
`;

const BannerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => `linear-gradient(
      135deg,
      ${theme.colors.primaryLight} 0%,
      ${theme.colors.secondaryLight} 50%,
      ${theme.colors.primaryLight} 100%
    )`};
    opacity: 0.3;
    animation: ${gradientMove} 15s ease infinite;
  }
`;

const Banner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/Art4Hearts Banner.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 250, 250, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: ${({ theme }) => theme.borderRadii.large};
  transition: all 0.4s ease;
  animation: ${float} 6s ease-in-out infinite;
  
  &:hover {
    transform: translate(-50%, -55%);
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: ${({ theme }) => theme.colors.text.dark};
  text-align: center;
  margin: 0;
  line-height: 1.6;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const StatSectionWrapper: React.FC<{
  children: (props: {
    targetRef: React.RefObject<HTMLDivElement>;
    isVisible: boolean;
    hasAnimated: boolean;
  }) => React.ReactNode;
}> = ({ children }) => {
  const { targetRef, isVisible, hasAnimated } = useIntersectionObserver({
    threshold: 0.3
  });
  return <>{children({ targetRef, isVisible, hasAnimated })}</>;
};

const StatSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(1.5rem, 4vw, 2.5rem);
  padding: clamp(3rem, 6vw, 5rem);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xlarge};
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadii.large};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(100, 150, 255, 0.12);
  backdrop-filter: blur(8px);
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(100, 150, 255, 0.2);
    background: rgba(255, 255, 255, 0.95);
  }

  .number {
    font-size: clamp(3.5rem, 6vw, 4.5rem);
    font-weight: 800;
    color: #1e40af; /* Darker blue for better contrast */
    margin-bottom: 1.25rem;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  
  .label {
    font-size: clamp(0.875rem, 2vw, 1rem);
    color: #1e293b; /* Darker slate for better contrast */
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    line-height: 1.4;
  }
`;

const MissionSectionContent = styled.div`
  padding: clamp(4rem, 10vh, 6rem) 2rem;
  background: #fff8e1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  min-height: 100vh;
  
  h2 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    color: #333;
    font-weight: 700;
    margin-bottom: 2rem;
    position: relative;
  }
  
  p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: #333;
    max-width: 900px;
    line-height: 1.8;
    margin: 0 auto;
    opacity: 0.85;
  }
`;

const RegisterSection = styled(Section)`
  text-align: center;
  
  h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    color: ${({ theme }) => theme.colors.text.dark};
    margin-bottom: 2rem;
    
    &::after {
      content: '';
      display: block;
      width: 100px;
      height: 3px;
      margin: 1rem auto;
      background: ${({ theme }) => `linear-gradient(90deg, 
        ${theme.colors.primary}, 
        ${theme.colors.secondary}
      )`};
      animation: ${gradientFlow} 3s linear infinite;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const RegisterButton = styled.a`
  display: inline-block;
  padding: 1.2rem 3rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background.light};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadii.full};
  font-weight: 600;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px ${({ theme }) => `${theme.colors.shadow}40`};
  }
`;

const FormEmbed = styled.div`
  margin-top: 4rem;
  width: 100%;
  max-width: 900px;
  border-radius: ${({ theme }) => theme.borderRadii.large};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.light};
  box-shadow: 0 10px 30px ${({ theme }) => `${theme.colors.shadow}20`};
  
  iframe {
    width: 100%;
    height: 800px;
    border: none;
  }
`;

const Home: React.FC = () => {
  const { currentSection, containerRef } = useScroll();

  return (
    <HomeContainer ref={containerRef}>
      <div className="sections-container">
        <HeroSection $isActive={currentSection === 0}>
          <BannerContainer>
            <Banner role="img" aria-label="Art4Hearts Banner" />
            <HeroContent>
              <HeroSubtitle>
                Art4Hearts is a 501(3)c non-profit based in the Bay Area aiming to spread love through art. 
                Join our creative journey!
              </HeroSubtitle>
            </HeroContent>
          </BannerContainer>
        </HeroSection>

        <Section $isActive={currentSection === 1} style={{backgroundColor: '#fff8e1'}}>
          <h2 style={{
            fontSize: '4.5rem',
            marginBottom: '2.5rem',
            color: '#333',
            fontWeight: '700',
            letterSpacing: '0.02em'
          }}>
            OUR MISSION
          </h2>
          <p style={{
            fontSize: '1.2rem',
            maxWidth: '900px',
            lineHeight: '1.8',
            color: '#333',
            padding: '0 2rem'
          }}>
            Art4Hearts is a youth-led nonprofit spreading creativity and comfort through crafting personalized art therapy kits, 
            leading art workshops, and handmaking bracelets with uplifting messages to brighten the lives of communities we serve.
          </p>
        </Section>

        <Section $isActive={currentSection === 2} style={{ backgroundColor: '#f0f7ff' }}>
          <StatSectionWrapper>
            {({ targetRef, isVisible, hasAnimated }) => (
              <StatSection ref={targetRef} style={{ backgroundColor: 'transparent' }}>
                <StatCard>
                  <div className="number">
                    {useCountUp({ 
                      end: 4500, 
                      isVisible: isVisible || hasAnimated,
                      duration: 2500
                    }).toLocaleString()}+
                  </div>
                  <div className="label">VOLUNTEERS WORLDWIDE</div>
                </StatCard>
                <StatCard>
                  <div className="number">
                    {useCountUp({ 
                      end: 150, 
                      isVisible: isVisible || hasAnimated,
                      duration: 2000,
                      delay: 200
                    }).toLocaleString()}+
                  </div>
                  <div className="label">ACTIVE CHAPTERS</div>
                </StatCard>
                <StatCard>
                  <div className="number">
                    {useCountUp({ 
                      end: 50, 
                      isVisible: isVisible || hasAnimated,
                      duration: 1500,
                      delay: 400
                    }).toLocaleString()}+
                  </div>
                  <div className="label">COUNTRIES REACHED</div>
                </StatCard>
                <StatCard>
                  <div className="number">
                    {useCountUp({ 
                      end: 1000, 
                      isVisible: isVisible || hasAnimated,
                      duration: 2000,
                      delay: 600
                    }).toLocaleString()}+
                  </div>
                  <div className="label">ART KITS & BRACELETS</div>
                </StatCard>
              </StatSection>
            )}
          </StatSectionWrapper>
        </Section>

        <RegisterSection $isActive={currentSection === 3}>
          <h2>Join Our Mission!</h2>
          <p>
            Be part of a global movement that brings joy and creativity to those who need it most. 
            Whether you're an artist, student, or someone who wants to make a difference, 
            there's a place for you in the Art4Hearts family.
          </p>
          <ButtonContainer>
            <RegisterButton 
              href="https://docs.google.com/forms/d/e/1FAIpQLSd98E0LsNhBywLdUhlIBmp6e88bjt81Fh1tV6Lz6FklT1LtEg/viewform" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Register as a Volunteer
            </RegisterButton>
          </ButtonContainer>
          <FormEmbed>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSd98E0LsNhBywLdUhlIBmp6e88bjt81Fh1tV6Lz6FklT1LtEg/viewform?embedded=true"
              title="Volunteer Registration Form"
              loading="lazy"
            />
          </FormEmbed>
        </RegisterSection>
      </div>
    </HomeContainer>
  );
};

export default Home;