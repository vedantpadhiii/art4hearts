import React, { useState, ReactElement } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCarouselProps {
  faqs: FAQ[];
  title: string;
}

const FAQCarousel: React.FC<FAQCarouselProps> = ({ faqs, title }) => {
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
    if (newIndex < 0) newIndex = faqs.length - 1;
    if (newIndex >= faqs.length) newIndex = 0;
    setPage([newIndex, newDirection]);
  };

  return (
    <CarouselSection>
      <SectionTitle>{title}</SectionTitle>
      <CarouselContainer>
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <Card
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
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
          >
            <Question>{faqs[currentIndex].question}</Question>
            <Answer>{faqs[currentIndex].answer}</Answer>
            <Progress>
              {currentIndex + 1} / {faqs.length}
            </Progress>
          </Card>
        </AnimatePresence>

        <NavigationButton onClick={() => paginate(-1)} position="left">
          <span className="icon"><FiChevronLeft size={24} /></span>
        </NavigationButton>
        <NavigationButton onClick={() => paginate(1)} position="right">
          <span className="icon"><FiChevronRight size={24} /></span>
        </NavigationButton>
      </CarouselContainer>

      <DotsContainer>
        {faqs.map((_, index) => (
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
    </CarouselSection>
  );
};

const CarouselSection = styled.section`
  padding: 2rem 0;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text.light};
  text-align: center;
  margin-bottom: 2rem;
  font-family: "Playfair Display", serif;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: ${props => props.theme.colors.primary};
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
`;

const Card = styled(motion.div)`
  position: absolute;
  width: 90%;
  max-width: 800px;
  height: auto;
  min-height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  cursor: grab;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

  &:active {
    cursor: grabbing;
  }
`;

const Question = styled.h3`
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  font-family: "Playfair Display", serif;
  line-height: 1.4;
`;

const Answer = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.light};
  line-height: 1.8;
  flex-grow: 1;
  white-space: pre-line;
`;

const Progress = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.text.light};
  opacity: 0.7;
  font-size: 0.9rem;
  margin-top: 1.5rem;
`;

interface NavigationButtonProps {
  position: 'left' | 'right';
}

const NavigationButton = styled.button<NavigationButtonProps>`
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  ${props => props.position}: -50px;
  transform: translateY(-50%);
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text.light};
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  &:hover {
    opacity: 1;
  }

  & > svg {
    width: 24px;
    height: 24px;
    color: ${props => props.theme.colors.text.light};
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 2rem;
`;

interface DotProps {
  active: boolean;
}

const Dot = styled.button<DotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    transform: scale(1.2);
  }
`;

export default FAQCarousel;