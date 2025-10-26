import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  title: string;
}

const Section = styled.section`
  padding: 4rem 0;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2rem;
    left: -20%;
    right: -20%;
    height: calc(100% + 4rem);
    background: transparent;
    z-index: -1;
    border-radius: 30px;
    box-shadow: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: #000000;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 700;
  position: relative;
  letter-spacing: -0.02em;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 4px;
    background: linear-gradient(90deg, #c6dddc, #b3d4d2);
    border-radius: 2px;
    opacity: 0.7;
  }
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 2rem;
  max-width: 900px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -3rem;
    width: 6px;
    height: 100px;
    background: transparent;
    transform: translateY(-50%);
    border-radius: 3px;
    opacity: 0.5;
  }
`;

const AccordionItem = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(198, 221, 220, 0.2);
  transform: translateY(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(198, 221, 220, 0.3);
  }
`;

const QuestionButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  text-align: left;
  padding: 1.75rem 2rem;
  background: ${props => props.isOpen ? '#f0f0f0' : 'white'};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 2px solid transparent;

  &:hover {
    background: #f0f0f0;
    color: #000000;
  }

  &:focus {
    outline: none;
    background: #f0f0f0;
    border-bottom-color: #000000;
  }

  span {
    margin-right: 2rem;
    position: relative;
    
    &::before {
      content: '•';
      position: absolute;
      left: -1.5rem;
      color: #000000;
      opacity: ${props => props.isOpen ? '1' : '0'};
      transform: scale(${props => props.isOpen ? '1.2' : '1'});
      transition: all 0.3s ease;
    }
  }

  svg {
    min-width: 24px;
    transform: rotate(${props => props.isOpen ? '180deg' : '0deg'}) 
               scale(${props => props.isOpen ? '1.1' : '1'});
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 2px 4px rgba(198, 221, 220, 0.3));
  }
`;

const AnswerContent = styled(motion.div)`
  background: white;
  padding: 0.5rem 2rem;
  font-size: 1.15rem;
  color: #000000;
  line-height: 1.8;
  opacity: 1;
  position: relative;
  
  p {
    padding: 1.5rem 0;
    position: relative;
    color: #000000;
    
    &::before {
      content: '';
      position: absolute;
      left: -1rem;
      top: 1.5rem;
      bottom: 1.5rem;
      width: 2px;
      background: transparent;
      opacity: 0;
      border-radius: 1px;
    }
  }
`;

const ChevronIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5 8.5L12 15.5L19 8.5" 
      stroke="#000000" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs, title }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <AccordionContainer>
        {faqs.map((faq, index) => (
          <AccordionItem key={index}>
            <QuestionButton 
              onClick={() => toggleAccordion(index)}
              isOpen={openIndex === index}
            >
              <span>{faq.question}</span>
              <ChevronIcon />
            </QuestionButton>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <AnswerContent
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: "auto", 
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3 },
                      opacity: { duration: 0.3, delay: 0.1 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3 },
                      opacity: { duration: 0.2 }
                    }
                  }}
                >
                  <p style={{ padding: "1.5rem 0" }}>{faq.answer}</p>
                </AnswerContent>
              )}
            </AnimatePresence>
          </AccordionItem>
        ))}
      </AccordionContainer>
    </Section>
  );
};

export default FAQAccordion;