import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Chapters = () => {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Our Chapters</Title>
      <Content>
        <MapSection>
          <SectionTitle>Find a Chapter Near You</SectionTitle>
          {/* Interactive map will be added here */}
          <MapPlaceholder>Interactive Map Coming Soon</MapPlaceholder>
        </MapSection>
        <ChaptersList>
          <SectionTitle>Active Chapters</SectionTitle>
          {/* List of chapters will be added here */}
        </ChaptersList>
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

const MapSection = styled.section`
  margin-bottom: 3rem;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.background.light};
  border: 2px dashed ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
`;

const ChaptersList = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1.5rem;
`;

export default Chapters;