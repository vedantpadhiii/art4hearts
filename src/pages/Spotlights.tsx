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
        <HeroTitle>Spotlight Stories</HeroTitle>
        <HeroSubtitle>
          Highlighting inspiring stories from our community members, volunteers, and the impact of art in healthcare settings.
        </HeroSubtitle>
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
  min-height: 100vh;
  background: ${props => props.theme.colors.background.dark};
`;

const HeroSection = styled.div`
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  color: ${props => props.theme.colors.text.light};
  margin-bottom: 1.5rem;
  font-family: "Playfair Display", serif;
`;

const HeroSubtitle = styled.p`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.text.light};
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.9;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text.light};
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  font-family: "Playfair Display", serif;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    opacity: 0.6;
  }
`;

const ImageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 1400px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    & > *:nth-child(4),
    & > *:nth-child(5) {
      grid-column: span 1.5;
    }
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 3/4;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  background: ${props => props.theme.colors.background.light};
  transform-origin: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    
    img {
      transform: scale(1.1);
    }
    
    div {
      opacity: 1;
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
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const OverlayText = styled.span`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  font-family: "Playfair Display", serif;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

export default SpotlightsPage;