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

const PhotoItem = styled(motion.img)`
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
              src="/Photos/Cary, North Carolina/572171669_17855370453555521_6099618948601915028_n.jpeg"
              alt="Cary North Carolina"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Cary, North Carolina/Screenshot 2025-10-24 at 5.54.23 PM.png"
              alt="Cary North Carolina 2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Cary, North Carolina/Screenshot 2025-10-24 at 5.54.37 PM.png"
              alt="Cary North Carolina 3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/DH Conley High School/Screenshot 2025-10-14 at 2.53.15 PM.png"
              alt="DH Conley High School"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Elite Scholars Academy/Screenshot 2025-10-14 at 2.24.06 PM.png"
              alt="Elite Scholars Academy 1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Elite Scholars Academy/Screenshot 2025-10-14 at 2.24.14 PM.png"
              alt="Elite Scholars Academy 2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Elite Scholars Academy/Screenshot 2025-10-14 at 2.24.22 PM.png"
              alt="Elite Scholars Academy 3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Elite Scholars Academy/Screenshot 2025-10-14 at 2.49.45 PM.png"
              alt="Elite Scholars Academy 4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Elite Scholars Academy/Screenshot 2025-10-14 at 2.49.57 PM.png"
              alt="Elite Scholars Academy 5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Elite Scholars Academy/Screenshot 2025-10-14 at 2.50.04 PM.png"
              alt="Elite Scholars Academy 6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Etiwanda High School/Screenshot 2025-10-14 at 2.57.10 PM.png"
              alt="Etiwanda High School 1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Etiwanda High School/Screenshot 2025-10-14 at 2.57.21 PM.png"
              alt="Etiwanda High School 2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Etiwanda High School/Screenshot 2025-10-14 at 3.00.46 PM.png"
              alt="Etiwanda High School 3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Etiwanda High School/Screenshot 2025-10-14 at 3.00.58 PM.png"
              alt="Etiwanda High School 4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Etiwanda High School/Screenshot 2025-10-14 at 3.01.25 PM.png"
              alt="Etiwanda High School 5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Isaac Bear Early College High School/Screenshot 2025-10-14 at 2.51.26 PM.png"
              alt="Isaac Bear Early College 1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Isaac Bear Early College High School/Screenshot 2025-10-14 at 2.51.34 PM.png"
              alt="Isaac Bear Early College 2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Isaac Bear Early College High School/Screenshot 2025-10-14 at 2.51.44 PM.png"
              alt="Isaac Bear Early College 3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Maeve, August Volunteer of the Month/image0 (1).jpeg"
              alt="Maeve Volunteer 1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Maeve, August Volunteer of the Month/image2.jpeg"
              alt="Maeve Volunteer 2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/McKeel Academy of Technology/Screenshot 2025-10-14 at 3.03.34 PM.png"
              alt="McKeel Academy 1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/McKeel Academy of Technology/Screenshot 2025-10-14 at 3.03.52 PM.png"
              alt="McKeel Academy 2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/McKeel Academy of Technology/Screenshot 2025-10-14 at 3.03.58 PM.png"
              alt="McKeel Academy 3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/McKeel Academy of Technology/Screenshot 2025-10-14 at 3.04.05 PM.png"
              alt="McKeel Academy 4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/McKeel Academy of Technology/Screenshot 2025-10-14 at 3.04.13 PM.png"
              alt="McKeel Academy 5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/McKeel Academy of Technology/Screenshot 2025-10-14 at 3.04.18 PM.png"
              alt="McKeel Academy 6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.25 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Medina, Tennessee/processed-C469C3CA-C7B6-441E-9CEC-E3B4080A92C3.jpeg"
              alt="Medina Tennessee 1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Medina, Tennessee/processed-D10D25C8-6C7A-4597-B16B-1B28EC67801A.jpeg"
              alt="Medina Tennessee 2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.35 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Medina, Tennessee/processed-E2F05DC8-3F5E-4ED4-848F-0AF469A57C65.jpeg"
              alt="Medina Tennessee 3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Parkway North High School/Screenshot 2025-10-14 at 2.54.32 PM.png"
              alt="Parkway North High School"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.45 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Saratoga High School/Resized_20250321_165909.JPEG"
              alt="Saratoga High School 1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Saratoga High School/Screenshot 2025-07-05 at 2.47.41 PM.png"
              alt="Saratoga High School 2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.55 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Saratoga High School/club rush sept 5.jpg"
              alt="Saratoga High School 3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Yangon, Myanmar/DSCF5409.JPG"
              alt="Yangon Myanmar 1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.65 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Yangon, Myanmar/DSCF5420.JPG"
              alt="Yangon Myanmar 2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Yangon, Myanmar/DSCF5430.JPG"
              alt="Yangon Myanmar 3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.75 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Yangon, Myanmar/DSCF5447.JPG"
              alt="Yangon Myanmar 4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Yangon, Myanmar/DSCF5451.JPG"
              alt="Yangon Myanmar 5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.85 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Yangon, Myanmar/DSCF5452.JPG"
              alt="Yangon Myanmar 6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.9 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Yangon, Myanmar/DSCF5455.JPG"
              alt="Yangon Myanmar 7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.95 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Yangon, Myanmar/DSCF5465.JPG"
              alt="Yangon Myanmar 8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <PhotoItem
              src="/Photos/Yangon, Myanmar/DSCF5468.JPG"
              alt="Yangon Myanmar 9"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
          </PhotosGrid>
        </PhotosSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default SpotlightsPage;