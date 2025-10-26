import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background: white;
`;

const HeroSection = styled.section`
  height: 50vh;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #c6dddc 0%, #b3d4d2 100%);
  overflow: visible;
  width: 100%;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding-left: 2rem;
  padding-right: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 0;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  color: #000000;
  margin-bottom: 1.5rem;
  font-weight: 800;
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
    background: linear-gradient(90deg, #c6dddc, #b3d4d2);
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #000000;
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
  position: relative;
  padding: 2rem 0;
  background: white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(198, 221, 220, 0.3) 50%,
      transparent 100%
    );
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(198, 221, 220, 0.3) 50%,
      transparent 100%
    );
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: #000000;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #c6dddc, #b3d4d2);
    border-radius: 2px;
    box-shadow: 0 4px 12px rgba(198, 221, 220, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }
`;

const SubsectionTitle = styled.h3`
  text-align: center;
  color: #000000;
  margin-bottom: 3rem;
  margin-top: 3rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  position: relative;
  padding-bottom: 1.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #c6dddc, transparent);
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
  }
`;

const InstagramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;
  perspective: 1000px;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
    padding: 0 1rem;
  }
`;

const InstagramEmbed = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(198, 221, 220, 0.2);
  background: white;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  transform: translateY(0);
  width: 100%;

  &:hover {
    box-shadow: 0 16px 48px rgba(198, 221, 220, 0.3);
    transform: translateY(-6px);
  }

  blockquote.instagram-media {
    border-radius: 12px !important;
    margin: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
    height: auto !important;
  }

  iframe {
    border: none !important;
    border-radius: 12px !important;
    max-width: 100% !important;
    width: 100% !important;
  }
`;

const PhotoGallerySection = styled.section`
  width: 100%;
  position: relative;
  padding: 4rem 0;
  background: white;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const PhotoCard = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(198, 221, 220, 0.2);
  background: #f5f5f5;
  aspect-ratio: 4 / 3;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);

  &:hover {
    box-shadow: 0 12px 32px rgba(198, 221, 220, 0.3);
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const SpotlightsPage: React.FC = () => {
  // Gallery images - excluding HEIC files as they're not web-compatible
  const galleryImages = [
    { src: '/gallery/DSCF5420.JPG', alt: 'Community event photo' },
    { src: '/gallery/DSCF5430.JPG', alt: 'Community event photo' },
    { src: '/gallery/DSCF5447.JPG', alt: 'Community event photo' },
    { src: '/gallery/DSCF5452.JPG', alt: 'Community event photo' },
    { src: '/gallery/Screenshot 2025-07-05 at 2.47.41 PM.png', alt: 'Community event photo' },
    { src: '/gallery/processed-D10D25C8-6C7A-4597-B16B-1B28EC67801A.jpeg', alt: 'Community event photo' },
  ];

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Process embeds if Instagram script is already loaded
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }

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
          <HeroTitle>Gallery</HeroTitle>
          <HeroSubtitle>Celebrating our community and volunteers</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentContainer>
        <InstagramSection>
          <SectionTitle>Community Spotlight</SectionTitle>
          <SubsectionTitle>Featured Posts</SubsectionTitle>
          
          <InstagramGrid>
            <InstagramEmbed>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DNzbD3K3Izy/?utm_source=ig_embed&amp;utm_campaign=loading"
                data-instgrm-version="14"
              ></blockquote>
            </InstagramEmbed>
            <InstagramEmbed>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DN68DoNiVmm/?utm_source=ig_embed&amp;utm_campaign=loading"
                data-instgrm-version="14"
              ></blockquote>
            </InstagramEmbed>
            <InstagramEmbed>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DO2ukhaDq-t/?utm_source=ig_embed&amp;utm_campaign=loading"
                data-instgrm-version="14"
              ></blockquote>
            </InstagramEmbed>
            <InstagramEmbed>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DO7Im5AAZtk/?utm_source=ig_embed&amp;utm_campaign=loading"
                data-instgrm-version="14"
              ></blockquote>
            </InstagramEmbed>
          </InstagramGrid>
        </InstagramSection>

        <PhotoGallerySection>
          <SubsectionTitle>Photo Gallery</SubsectionTitle>
          <PhotoGrid>
            {galleryImages.map((image, index) => (
              <PhotoCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
              </PhotoCard>
            ))}
          </PhotoGrid>
        </PhotoGallerySection>
      </ContentContainer>
    </PageContainer>
  );
};

export default SpotlightsPage;