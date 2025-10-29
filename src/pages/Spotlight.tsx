import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SpotlightCarousel from '../components/SpotlightCarousel';

const spotlightPhotos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1543269865-cbdf26ce6c5f?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  },
];

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background: #f5f3ff;
`;

const HeroSection = styled.section`
  height: 50vh;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  background: #ede9fe;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.header};
  width: 100%;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: clamp(5rem, 10vh, 8rem) 2rem;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #c4b5fd33 0%, #a78bfa33 50%, #8b5cf633 100%);
    z-index: 0;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.9) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  color: #5b21b6;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, #8b5cf6, #7c3aed);
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #6d28d9;
  font-weight: 500;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

const InstagramSection = styled.section`
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #5b21b6;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #8b5cf6, #7c3aed);
    opacity: 0.5;
  }
`;

const InstagramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const InstagramEmbed = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);

  iframe {
    border: none;
    border-radius: 12px;
  }
`;

const CarouselSection = styled.section`
  width: 100%;
`;

const Spotlight: React.FC = () => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Spotlight</HeroTitle>
          <HeroSubtitle>Celebrating our community and volunteers</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentContainer>
        <InstagramSection>
          <SectionTitle>Chapter Spotlight</SectionTitle>
          <h3 style={{ textAlign: 'center', color: '#6d28d9', marginBottom: '2rem', fontSize: '1.3rem' }}>
            Volunteer of the Month (August)
          </h3>
          <InstagramGrid>
            <InstagramEmbed>
              <iframe
                src="https://www.instagram.com/p/DNzbD3K3Izy/?embed&utm_campaign=loading"
                width="320"
                height="400"
                frameBorder="0"
                scrolling="no"
                allowTransparency
              ></iframe>
            </InstagramEmbed>
          </InstagramGrid>

          <h3 style={{ textAlign: 'center', color: '#6d28d9', marginBottom: '2rem', fontSize: '1.3rem' }}>
            Chapter Spotlight: Medina, Tennessee
          </h3>
          <InstagramGrid>
            <InstagramEmbed>
              <iframe
                src="https://www.instagram.com/p/DN68DoNiVmm/?embed&utm_campaign=loading"
                width="320"
                height="400"
                frameBorder="0"
                scrolling="no"
                allowTransparency
              ></iframe>
            </InstagramEmbed>
          </InstagramGrid>

          <h3 style={{ textAlign: 'center', color: '#6d28d9', marginBottom: '2rem', fontSize: '1.3rem' }}>
            Chapter Spotlight: Yangon, Myanmar
          </h3>
          <InstagramGrid>
            <InstagramEmbed>
              <iframe
                src="https://www.instagram.com/p/DO2ukhaDq-t/?embed&utm_campaign=loading"
                width="320"
                height="400"
                frameBorder="0"
                scrolling="no"
                allowTransparency
              ></iframe>
            </InstagramEmbed>
          </InstagramGrid>

          <h3 style={{ textAlign: 'center', color: '#6d28d9', marginBottom: '2rem', fontSize: '1.3rem' }}>
            Chapter Spotlight: Yangon, Myanmar (Reel)
          </h3>
          <InstagramGrid>
            <InstagramEmbed>
              <iframe
                src="https://www.instagram.com/p/DO7Im5AAZtk/?embed&utm_campaign=loading"
                width="320"
                height="500"
                frameBorder="0"
                scrolling="no"
                allowTransparency
              ></iframe>
            </InstagramEmbed>
          </InstagramGrid>
        </InstagramSection>

        <CarouselSection>
          <SpotlightCarousel photos={spotlightPhotos} />
        </CarouselSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default Spotlight;
