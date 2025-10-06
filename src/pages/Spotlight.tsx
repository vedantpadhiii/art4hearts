import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Spotlight = () => {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Spotlight Stories</Title>
      <Content>
        <Description>
          Highlighting inspiring stories from our community members, volunteers, and the impact
          of art in healthcare settings.
        </Description>
        <StoriesGrid>
          {/* Story cards will be added here */}
          <StoryCard>
            <StoryImage />
            <StoryContent>
              <StoryTitle>Coming Soon</StoryTitle>
              <StoryExcerpt>Our first spotlight story is on its way...</StoryExcerpt>
            </StoryContent>
          </StoryCard>
        </StoriesGrid>
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
  margin-bottom: 1rem;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const StoryCard = styled.article`
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StoryImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.colors.secondary}20;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StoryContent = styled.div`
  padding: 1.5rem;
`;

const StoryTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const StoryExcerpt = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

export default Spotlight;