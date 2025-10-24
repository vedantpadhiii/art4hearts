import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCarouselProps {
  faqs: FAQ[];
  title: string;
}

const FAQSection = styled.section`
  padding: 2rem 0 4rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #5b21b6;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
  position: relative;

  &:after {
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

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    gap: 2rem;
    padding: 0 1rem;
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
    padding: 0 0.5rem;
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.75rem;
  }

  &:hover {
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.2);
    transform: translateY(-4px);
  }
`;

const Question = styled.h3`
  font-size: 1.4rem;
  color: #5b21b6;
  margin-bottom: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  position: relative;
  padding-left: 1.75rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    top: 0;
    color: #8b5cf6;
  }
`;

const Answer = styled.p`
  font-size: 1.05rem;
  color: #6d28d9;
  line-height: 1.7;
  white-space: normal;
  opacity: 0.9;
  padding-left: 1.75rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    padding-left: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.55;
    padding-left: 1.25rem;
  }
`;

const FAQCarousel: React.FC<FAQCarouselProps> = ({ faqs, title }) => {
  return (
    <FAQSection>
      <SectionTitle>{title}</SectionTitle>
      <CardsGrid
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {faqs.map((faq, index) => (
          <Card
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Question>{faq.question}</Question>
            <Answer>{faq.answer}</Answer>
          </Card>
        ))}
      </CardsGrid>
    </FAQSection>
  );
};

export default FAQCarousel;