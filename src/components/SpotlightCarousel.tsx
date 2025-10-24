import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface Photo {
  id: number;
  url: string;
}

interface SpotlightCarouselProps {
  photos: Photo[];
}

const CarouselSection = styled.section`
  padding: 4rem 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #5b21b6;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%);
    border-radius: 2px;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  perspective: 1200px;
  padding: 3rem 0;
  margin: 2rem auto;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);

  @media (max-width: 768px) {
    min-height: 500px;
    padding: 2rem 0;
  }
`;

const Image = styled(motion.img)`
  position: relative;
  width: 85%;
  max-width: 800px;
  height: auto;
  max-height: 550px;
  object-fit: cover;
  cursor: grab;
  box-shadow: 0 16px 48px rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  transition: box-shadow 0.3s ease;

  @media (max-width: 768px) {
    width: 90%;
    max-height: 420px;
  }

  &:hover {
    box-shadow: 0 24px 64px rgba(139, 92, 246, 0.3);
  }

  &:active {
    cursor: grabbing;
  }
`;

const NavButton = styled(motion.button)<{ left?: boolean; right?: boolean }>`
  position: absolute;
  top: 50%;
  ${props => props.left ? 'left: 2rem;' : ''}
  ${props => props.right ? 'right: 2rem;' : ''}
  transform: translateY(-50%);
  background: white;
  border: none;
  width: 56px;
  height: 56px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  opacity: 0.9;
  z-index: 2;
  border-radius: 50%;
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.2);

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    ${props => props.left ? 'left: 1rem;' : ''}
    ${props => props.right ? 'right: 1rem;' : ''}
  }

  &:hover {
    opacity: 1;
    box-shadow: 0 12px 32px rgba(139, 92, 246, 0.3);
    transform: translateY(-50%) scale(1.08);
  }

  &:active {
    transform: translateY(-50%) scale(0.92);
  }
`;

const Arrow = styled.div<{ direction: 'left' | 'right' }>`
  width: 10px;
  height: 10px;
  border: solid #7c3aed;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(${props => props.direction === 'left' ? '135deg' : '-45deg'});
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 3.5rem;
  margin-bottom: 2rem;
`;

interface DotProps {
  active: boolean;
}

const Dot = styled.button<DotProps>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid ${props => props.active ? '#8b5cf6' : '#e9d5ff'};
  background: ${props => props.active ? '#8b5cf6' : 'white'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  padding: 0;
  box-shadow: ${props => props.active ? '0 4px 12px rgba(139, 92, 246, 0.35)' : 'none'};

  &:hover {
    transform: scale(1.35);
    border-color: #8b5cf6;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
`;

const Progress = styled.div`
  text-align: center;
  color: #8b5cf6;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const SpotlightCarousel: React.FC<SpotlightCarouselProps> = ({ photos }) => {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = photos.length - 1;
    if (newIndex >= photos.length) newIndex = 0;
    setPage([newIndex, newDirection]);
  };

  return (
    <CarouselSection>
      <SectionTitle>Photo Carousel</SectionTitle>
      <CarouselContainer>
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <Image
            key={currentIndex}
            src={photos[currentIndex].url}
            alt={`Spotlight photo ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 400, damping: 25 },
              opacity: { duration: 0.15 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </AnimatePresence>

        <NavButton
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          left
          onClick={() => paginate(-1)}
        >
          <Arrow direction="left" />
        </NavButton>
        <NavButton
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          right
          onClick={() => paginate(1)}
        >
          <Arrow direction="right" />
        </NavButton>
      </CarouselContainer>

      <DotsContainer>
        {photos.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => {
              const newDirection = index > currentIndex ? 1 : -1;
              setPage([index, newDirection]);
            }}
          />
        ))}
      </DotsContainer>

      <Progress>
        {currentIndex + 1} / {photos.length}
      </Progress>
    </CarouselSection>
  );
};

export default SpotlightCarousel;
