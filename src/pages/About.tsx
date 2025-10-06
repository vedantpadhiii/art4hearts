import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: ${props => props.theme.spacing.large};
  background: ${props => props.theme.colors.background.dark};
  color: ${props => props.theme.colors.text.light};
`;

const AboutHero = styled.section`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  h1 {
    font-size: clamp(3rem, 6vw, 6rem);
    font-family: ${props => props.theme.fonts.title};
    margin-bottom: ${props => props.theme.spacing.large};
  }
  
  p {
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    max-width: 800px;
    line-height: 1.6;
  }
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <AboutHero>
        <h1>Our Story</h1>
        <p>
          Art4Hearts began with a simple belief: that art has the power to heal, 
          comfort, and bring joy to those who need it most. Founded in 2023, 
          we've grown from a small group of passionate artists to a nationwide 
          movement of creativity and compassion.
        </p>
      </AboutHero>
    </AboutContainer>
  );
};

export default About;