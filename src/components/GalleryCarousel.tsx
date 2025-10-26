import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryCarouselProps {
  images: string[];
}

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(198, 221, 220, 0.3);
  background: #f5f5f5;
`;

const ImageWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const PrevButton = styled(NavButton)`
  left: 20px;
`;

const NextButton = styled(NavButton)`
  right: 20px;
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.8rem;
  z-index: 10;
`;

const Dot = styled.button<{ isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Infinite carousel effect using modulo
  const getImageIndex = (index: number) => {
    return ((index % images.length) + images.length) % images.length;
  };

  const currentImage = images[getImageIndex(currentIndex)];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <CarouselContainer>
      <AnimatePresence mode="wait">
        <ImageWrapper
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={currentImage} alt="Gallery" />
        </ImageWrapper>
      </AnimatePresence>

      <PrevButton onClick={handlePrev} aria-label="Previous image">
        ‹
      </PrevButton>
      <NextButton onClick={handleNext} aria-label="Next image">
        ›
      </NextButton>

      <DotContainer>
        {images.map((_, index) => (
          <Dot
            key={index}
            isActive={getImageIndex(currentIndex) === index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </DotContainer>
    </CarouselContainer>
  );
};

export default GalleryCarousel;
