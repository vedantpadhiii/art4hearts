import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FAQs = () => {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Frequently Asked Questions</Title>
      <Content>
        <FAQSection>
          {/* FAQ items will be added here */}
          <FAQItem>
            <Question>What is Art4Hearts?</Question>
            <Answer>
              Art4Hearts is a non-profit organization dedicated to bringing art and creativity
              to healthcare settings, helping patients through artistic expression.
            </Answer>
          </FAQItem>
          {/* More FAQ items will be added */}
        </FAQSection>
      </Content>
    </PageContainer>
  );
};

const PageContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FAQSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FAQItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Question = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Answer = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

export default FAQs;