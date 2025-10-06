import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

const HomeContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.background.dark};
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 8rem);
  font-family: ${props => props.theme.fonts.title};
  color: ${props => props.theme.colors.text.light};
  text-align: center;
  line-height: 0.9;
  margin: 0;
  opacity: 0;
  transform: translateY(50px);
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-top: ${props => props.theme.spacing.medium};
  opacity: 0;
  transform: translateY(30px);
`;

const StatSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.large};
  padding: ${props => props.theme.spacing.large};
  background: ${props => props.theme.colors.background.darker};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.medium};
  
  .number {
    font-size: 3rem;
    font-family: ${props => props.theme.fonts.title};
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.small};
  }
  
  .label {
    color: ${props => props.theme.colors.text.light};
    font-size: 1.2rem;
  }
`;

const MissionSection = styled.section`
  padding: ${props => props.theme.spacing.large};
  background: ${props => props.theme.colors.background.dark};
  
  h2 {
    font-size: clamp(2rem, 4vw, 4rem);
    font-family: ${props => props.theme.fonts.title};
    color: ${props => props.theme.colors.text.light};
    margin-bottom: ${props => props.theme.spacing.large};
    text-align: center;
  }
  
  p {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: ${props => props.theme.colors.text.light};
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
    text-align: center;
  }
`;

const Home: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: -0.5
    });
  }, []);

  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle ref={titleRef}>
          Art4Hearts
        </HeroTitle>
        <HeroSubtitle ref={subtitleRef}>
          Creating smiles through art, one heart at a time
        </HeroSubtitle>
      </HeroSection>

      <StatSection>
        <StatCard>
          <div className="number">1000+</div>
          <div className="label">Art Therapy Kits Delivered</div>
        </StatCard>
        <StatCard>
          <div className="number">20+</div>
          <div className="label">Active Chapters</div>
        </StatCard>
        <StatCard>
          <div className="number">5000+</div>
          <div className="label">Lives Touched</div>
        </StatCard>
      </StatSection>

      <MissionSection>
        <h2>Our Mission</h2>
        <p>
          We believe in the transformative power of art to heal, inspire, and bring joy. 
          Through our dedicated network of volunteers and chapters, we create and deliver 
          personalized art therapy kits to children in hospitals, bringing color and 
          creativity to their healing journey.
        </p>
      </MissionSection>
    </HomeContainer>
  );
};

export default Home;