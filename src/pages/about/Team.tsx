import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Team = () => {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Our Team</Title>
      <Content>
        <Section>
          <SectionTitle>Leadership</SectionTitle>
          {/* Leadership team members will be added here */}
        </Section>
        <Section>
          <SectionTitle>Advisory Board</SectionTitle>
          {/* Advisory board members will be added here */}
        </Section>
        <Section>
          <SectionTitle>Volunteers</SectionTitle>
          {/* Key volunteers will be added here */}
        </Section>
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
  gap: 3rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1.5rem;
`;

export default Team;