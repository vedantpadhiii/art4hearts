import React from 'react';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.dark};
  color: ${props => props.theme.colors.text.light};
  overflow: hidden;
`;

const ProjectsHero = styled.section`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${props => props.theme.spacing.large};
  
  h1 {
    font-size: clamp(3rem, 6vw, 6rem);
    font-family: ${props => props.theme.fonts.title};
    margin-bottom: ${props => props.theme.spacing.large};
  }
`;

const ProjectsGrid = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: ${props => props.theme.spacing.large};
  gap: ${props => props.theme.spacing.large};
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProjectCard = styled.div`
  flex: 0 0 80vw;
  min-height: 60vh;
  scroll-snap-align: center;
  background: ${props => props.theme.colors.background.darker};
  padding: ${props => props.theme.spacing.large};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h2 {
    font-size: clamp(2rem, 4vw, 4rem);
    font-family: ${props => props.theme.fonts.title};
    margin-bottom: ${props => props.theme.spacing.medium};
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.medium};
  }
`;

const Projects: React.FC = () => {
  return (
    <ProjectsContainer>
      <ProjectsHero>
        <h1>Our Projects</h1>
      </ProjectsHero>
      
      <ProjectsGrid>
        <ProjectCard>
          <h2>Art Therapy Kits</h2>
          <p>
            Personalized art supplies and creative activities designed to bring 
            joy and therapeutic benefits to children in hospitals.
          </p>
        </ProjectCard>
        
        <ProjectCard>
          <h2>Healing Bracelets</h2>
          <p>
            Handcrafted bracelets made with love, spreading hope and 
            connecting hearts across distances.
          </p>
        </ProjectCard>
        
        <ProjectCard>
          <h2>Community Workshops</h2>
          <p>
            Interactive art sessions bringing together volunteers and 
            beneficiaries to create, share, and heal together.
          </p>
        </ProjectCard>
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default Projects;