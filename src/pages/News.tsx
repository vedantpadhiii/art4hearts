import React from 'react';
import styled from 'styled-components';

const NewsContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.dark};
  color: ${props => props.theme.colors.text.light};
  padding: ${props => props.theme.spacing.large};
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.large};
  max-width: 1400px;
  margin: 0 auto;
`;

const NewsCard = styled.article`
  background: ${props => props.theme.colors.background.darker};
  border-radius: 20px;
  overflow: hidden;
  transition: transform ${props => props.theme.transitions.medium};
  
  &:hover {
    transform: translateY(-10px);
  }
  
  .image {
    width: 100%;
    height: 200px;
    background: #333;
  }
  
  .content {
    padding: ${props => props.theme.spacing.medium};
    
    h3 {
      font-family: ${props => props.theme.fonts.title};
      font-size: 1.5rem;
      margin-bottom: ${props => props.theme.spacing.small};
      color: ${props => props.theme.colors.primary};
    }
    
    .date {
      color: ${props => props.theme.colors.text.light}80;
      margin-bottom: ${props => props.theme.spacing.small};
    }
    
    p {
      line-height: 1.6;
    }
  }
`;

const NewsHero = styled.section`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.large};
  
  h1 {
    font-size: clamp(3rem, 6vw, 6rem);
    font-family: ${props => props.theme.fonts.title};
    margin-bottom: ${props => props.theme.spacing.medium};
  }
  
  p {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const News: React.FC = () => {
  return (
    <NewsContainer>
      <NewsHero>
        <h1>Latest News</h1>
        <p>Stay updated with our latest stories, achievements, and impact.</p>
      </NewsHero>
      
      <NewsGrid>
        <NewsCard>
          <div className="image" />
          <div className="content">
            <h3>New Chapter Launch</h3>
            <div className="date">September 25, 2025</div>
            <p>
              Exciting news as we expand our reach with a new chapter opening 
              in Toronto, bringing art therapy to more children.
            </p>
          </div>
        </NewsCard>
        
        <NewsCard>
          <div className="image" />
          <div className="content">
            <h3>1000 Kits Milestone</h3>
            <div className="date">September 20, 2025</div>
            <p>
              Thanks to our dedicated volunteers, we've reached the milestone 
              of delivering 1000 art therapy kits.
            </p>
          </div>
        </NewsCard>
        
        <NewsCard>
          <div className="image" />
          <div className="content">
            <h3>Summer Workshop Success</h3>
            <div className="date">September 15, 2025</div>
            <p>
              Our summer art workshops brought together over 500 participants, 
              creating meaningful connections through creativity.
            </p>
          </div>
        </NewsCard>
      </NewsGrid>
    </NewsContainer>
  );
};

export default News;