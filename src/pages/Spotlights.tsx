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
  margin-top: ${({ theme }) => theme.spacing.header};
  padding: clamp(5rem, 10vh, 8rem) 2rem;
  box-sizing: border-box;

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

const PhotosSection = styled.section`
  width: 100%;
  position: relative;
  padding: 4rem 2rem;
  background: white;
`;

const PhotosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 3rem auto 0;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const PhotoItemImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(198, 221, 220, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 12px 32px rgba(198, 221, 220, 0.3);
    transform: translateY(-4px) scale(1.02);
  }

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 150px;
  }
`;

interface PhotoItemProps {
  src: string;
  alt: string;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ src, alt }) => (
  <PhotoItemImg src={src} alt={alt} loading="lazy" />
);

const SpotlightsPage: React.FC = () => {
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

        <PhotosSection>
          <SectionTitle>Photos</SectionTitle>
          <PhotosGrid>
            <PhotoItem
              src="/Photos/jpegmini_optimized/FullSizeRender_5.jpg"
              alt="Art4Hearts Photo 1"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/IMG_2650.jpg"
              alt="Art4Hearts Photo 2"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/IMG_3335.jpg"
              alt="Art4Hearts Photo 3"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/IMG_3336.jpg"
              alt="Art4Hearts Photo 4"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/IMG_7093_2.jpg"
              alt="Art4Hearts Photo 5"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/IMG_8900.jpg"
              alt="Art4Hearts Photo 6"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/IMG_8904.jpg"
              alt="Art4Hearts Photo 7"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/IMG_8906.jpg"
              alt="Art4Hearts Photo 8"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/IMG_9354.jpg"
              alt="Art4Hearts Photo 9"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/IMG_9363.jpg"
              alt="Art4Hearts Photo 10"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/Resized_20250321_165909.jpg"
              alt="Art4Hearts Photo 11"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/image0_(1).jpg"
              alt="Art4Hearts Photo 12"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/image2.jpg"
              alt="Art4Hearts Photo 13"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/processed-C469C3CA-C7B6-441E-9CEC-E3B4080A92C3.jpg"
              alt="Art4Hearts Photo 14"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/processed-D10D25C8-6C7A-4597-B16B-1B28EC67801A.jpg"
              alt="Art4Hearts Photo 15"
            />
            <PhotoItem
              src="/Photos/jpegmini_optimized/processed-E2F05DC8-3F5E-4ED4-848F-0AF469A57C65.jpg"
              alt="Art4Hearts Photo 16"
            />
          </PhotosGrid>
        </PhotosSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default SpotlightsPage;