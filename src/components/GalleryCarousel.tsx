import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface GalleryCarouselProps {
  images: string[];
}

const CarouselContainer = styled.div`
  position: relative;
  width: 75%;
  margin: 0 auto;
  overflow: hidden;
  padding: 2rem 0;
  background: linear-gradient(to bottom, #f5f5f5, #ffffff);

  @media (max-width: 1024px) {
    width: 85%;
  }

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const ScrollTrack = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  padding: 0 2rem;
  width: fit-content;
`;

const ImageItem = styled.div`
  flex: 0 0 auto;
  width: clamp(220px, 35vw, 400px);
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(198, 221, 220, 0.3);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: clamp(160px, 50vw, 280px);
  }
`;

const ScrollGradient = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;

  &.left {
    left: 0;
    width: 60px;
    background: linear-gradient(to right, rgba(245, 245, 245, 0.8), transparent);

    @media (max-width: 768px) {
      width: 40px;
    }
  }

  &.right {
    right: 0;
    width: 60px;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.8), transparent);

    @media (max-width: 768px) {
      width: 40px;
    }
  }
`;

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {
  // Create a seamless loop by duplicating images
  const duplicatedImages = [...images, ...images, ...images];

  // Calculate animation duration based on number of images
  // Each image gets about 3 seconds of screen time
  const animationDuration = images.length * 4;

  return (
    <CarouselContainer>
      <ScrollTrack
        animate={{
          x: [0, -images.length * (300 + 24)], // 300px item width + 24px gap
        }}
        transition={{
          duration: animationDuration,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <ImageItem key={index}>
            <img src={image} alt={`Gallery item ${index + 1}`} />
          </ImageItem>
        ))}
      </ScrollTrack>

      <ScrollGradient className="left" />
      <ScrollGradient className="right" />
    </CarouselContainer>
  );
};

export default GalleryCarousel;
