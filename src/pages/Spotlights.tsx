import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SpotlightsPage: React.FC = () => {
  // Animation variants for smooth image loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  // Spotlight gallery images
  const spotlightImages = [
    {
      src: "/images/spotlight/image1.jpg",
      caption: "Crafting meaningful connections through art"
    },
    {
      src: "/images/spotlight/image2.jpg",
      caption: "Sharing creative moments that inspire"
    },
    {
      src: "/images/spotlight/image3.jpg",
      caption: "Building community through artistic expression"
    },
    {
      src: "/images/spotlight/image4.jpg",
      caption: "Empowering voices through creativity"
    },
    {
      src: "/images/spotlight/image5.jpg",
      caption: "Art that brings hearts together"
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <h1>Spotlight Stories</h1>
        <p>
          Highlighting inspiring stories from our community members, volunteers, and the impact of art in healthcare settings.
        </p>
      </HeroSection>
      
      <ContentSection>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Description>
            Through art, we create lasting connections and bring hope to healthcare environments.
            These moments capture the heart of our mission — where creativity meets compassion,
            and every artistic expression becomes a bridge to healing and joy.
          </Description>
        </motion.div>

        <ImageGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ImageContainer variants={itemVariants}>
            <StyledImage src="/images/spotlight/image1.jpg" alt="Art4Hearts Impact" />
            <Overlay>
              <OverlayText>Bringing art to healing spaces</OverlayText>
            </Overlay>
          </ImageContainer>
          <ImageContainer variants={itemVariants}>
            <StyledImage src="/images/spotlight/image2.jpg" alt="Art4Hearts Community" />
            <Overlay>
              <OverlayText>Creating moments of joy</OverlayText>
            </Overlay>
          </ImageContainer>
          <ImageContainer variants={itemVariants}>
            <StyledImage src="/images/spotlight/image3.jpg" alt="Art4Hearts Volunteers" />
            <Overlay>
              <OverlayText>Volunteers making a difference</OverlayText>
            </Overlay>
          </ImageContainer>
          <ImageContainer variants={itemVariants}>
            <StyledImage src="/images/spotlight/image4.jpg" alt="Art4Hearts Activities" />
            <Overlay>
              <OverlayText>Fostering creative expression</OverlayText>
            </Overlay>
          </ImageContainer>
          <ImageContainer variants={itemVariants}>
            <StyledImage src="/images/spotlight/image5.jpg" alt="Art4Hearts Impact" />
            <Overlay>
              <OverlayText>Building community through art</OverlayText>
            </Overlay>
          </ImageContainer>
        </ImageGrid>
      </ContentSection>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: calc(100vh - ${props => props.theme.spacing.header});
  margin-top: ${props => props.theme.spacing.header};
  background: #ecfdf5;
  position: relative;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%);
  
  h1 {
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: 700;
    color: #065f46;
    margin-bottom: 2rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background: linear-gradient(90deg, #059669, #10b981);
    }
  }
  
  p {
    font-size: clamp(1.2rem, 2vw, 1.4rem);
    max-width: 800px;
    line-height: 1.8;
    color: #065f46;
    margin: 0 auto;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  position: relative;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #047857;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: #10b981;
    opacity: 0.3;
    border-radius: 1px;
  }
`;

const ImageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  padding: 2rem;
  margin: 0 auto;
  max-width: 1400px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    & > *:nth-child(3n+2) {
      transform: translateY(4rem);
    }
    & > *:nth-child(3n+3) {
      transform: translateY(2rem);
    }
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 3/4;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(6, 95, 70, 0.06);
  background: white;
  transform-origin: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(5, 150, 105, 0.1);
    
    img {
      transform: scale(1.05);
    }
    
    div {
      opacity: 1;
      backdrop-filter: blur(2px);
    }
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(6, 95, 70, 0.95) 0%,
    rgba(16, 185, 129, 0.7) 50%,
    rgba(16, 185, 129, 0.4) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  transition: all 0.3s ease;
`;

const OverlayText = styled.span`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  font-weight: 600;
  max-width: 90%;
  position: relative;
  padding: 0.75rem 1.5rem;
  background: rgba(6, 95, 70, 0.8);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  transform: translateY(10px);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(6, 95, 70, 0.2);
  
  ${ImageContainer}:hover & {
    transform: translateY(0);
  }
`;

export default SpotlightsPage;