import React from 'react';
import styled from 'styled-components';
import { useScroll } from '../context/ScrollContext';

const MissionWrapper = styled.section`
  padding: clamp(4rem, 10vh, 6rem) 2rem;
  background: ${props => props.theme.colors.background.light};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      ${props => props.theme.colors.secondaryLight}40 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 2px;
    background: linear-gradient(
      90deg, 
      transparent,
      ${props => props.theme.colors.primary}40,
      ${props => props.theme.colors.secondary}40,
      transparent
    );
  }
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: ${props => props.theme.colors.text.dark};
  font-family: ${props => props.theme.fonts.title};
  font-weight: 700;
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.secondary}
    );
  }
`;

const Description = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: ${props => props.theme.colors.text.dark};
  max-width: 900px;
  line-height: 1.8;
  margin: 0 auto;
  opacity: 0.85;
  position: relative;
  z-index: 1;
  font-family: ${props => props.theme.fonts.body};
  font-weight: 400;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

interface MissionStatementProps {
  isActive?: boolean;
}

const MissionStatement: React.FC<MissionStatementProps> = () => {
  const { currentSection } = useScroll();
  const isActive = currentSection === 1;
  
  return (
    <MissionWrapper style={{
      opacity: isActive ? 1 : 0,
      transform: `translateY(${isActive ? 0 : '30px'})`,
      transition: 'opacity 0.6s ease, transform 0.6s ease'
    }}>
      <Title>OUR MISSION</Title>
      <Description>
        Art4Hearts is a youth-led nonprofit spreading creativity and comfort through crafting personalized art therapy kits, 
        leading art workshops, and handmaking bracelets with uplifting messages to brighten the lives of communities we serve.
      </Description>
    </MissionWrapper>
  );
};

export default MissionStatement;