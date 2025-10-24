import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageWrapper = styled.div`
  min-height: calc(100vh - ${props => props.theme.spacing.header});
  margin-top: ${props => props.theme.spacing.header};
  background: #f8fafc;
  overflow: hidden;
`;

const NewsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`;

const HeroSection = styled.section`
  position: relative;
  text-align: center;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #2563eb11 0%, #2563eb05 100%);
  margin-bottom: 4rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #2563eb20, transparent);
  }
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    color: #1a365d;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #2563eb, #3b82f6);
      border-radius: 3px;
    }
  }
  
  p {
    font-size: clamp(1.1rem, 1.5vw, 1.25rem);
    color: #475569;
    max-width: 700px;
    margin: 2rem auto 0;
    line-height: 1.7;
    font-weight: 400;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: 2.5rem;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NewsCard = styled(motion.article)`
  position: relative;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(226, 232, 240, 0.8);
  
  .image {
    width: 100%;
    height: 240px;
    background-size: cover;
    background-position: center;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    }
  }
  
  .content {
    padding: 2rem;
    
    .tag {
      display: inline-flex;
      align-items: center;
      background: #2563eb10;
      color: #2563eb;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 100px;
      margin-bottom: 1.25rem;
    }
    
    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1a365d;
      margin-bottom: 1rem;
      line-height: 1.3;
      transition: color 0.3s ease;
    }
    
    .date {
      color: #64748b;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      svg {
        width: 1em;
        height: 1em;
        opacity: 0.75;
      }
    }
    
    p {
      color: #475569;
      line-height: 1.7;
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .read-more {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #2563eb;
      font-weight: 600;
      font-size: 0.875rem;
      transition: gap 0.3s ease;
      
      svg {
        width: 1.25em;
        height: 1.25em;
        transition: transform 0.3s ease;
      }
    }
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    
    h3 {
      color: #2563eb;
    }
    
    .read-more {
      gap: 0.75rem;
      
      svg {
        transform: translateX(2px);
      }
    }
  }
`;

const News: React.FC = () => {
  return (
    <PageWrapper>
      <HeroSection>
        <h1>Spotlight</h1>
        <p>
          Discover inspiring stories from our community and stay updated with the latest
          achievements, partnerships, and the meaningful impact we're creating together.
        </p>
      </HeroSection>
      
      <NewsContainer>
        <NewsGrid>
          <NewsCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="image" 
              style={{ backgroundImage: 'url("/news/chapter-launch.jpg")' }}
            />
            <div className="content">
              <div className="tag">New Chapter</div>
              <h3>Global Expansion: Toronto Chapter Launch</h3>
              <div className="date">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8z" />
                </svg>
                September 25, 2025
              </div>
              <p>
                We're thrilled to announce our expansion into Toronto, bringing art therapy 
                and creative healing to more communities in need. This marks a significant 
                milestone in our mission to spread compassion through art.
              </p>
              <a href="#" className="read-more">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
                </svg>
              </a>
            </div>
          </NewsCard>
          
          <NewsCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div 
              className="image" 
              style={{ backgroundImage: 'url("/news/kits-milestone.jpg")' }}
            />
            <div className="content">
              <div className="tag">Milestone</div>
              <h3>5,000+ Lives Touched Through Art</h3>
              <div className="date">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8z" />
                </svg>
                September 20, 2025
              </div>
              <p>
                A heartwarming achievement as we surpass 5,000 art therapy kits and bracelets 
                delivered. Each piece represents a moment of joy, comfort, and creative 
                expression shared with those in need.
              </p>
              <a href="#" className="read-more">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
                </svg>
              </a>
            </div>
          </NewsCard>
          
          <NewsCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div 
              className="image" 
              style={{ backgroundImage: 'url("/news/workshop.jpg")' }}
            />
            <div className="content">
              <div className="tag">Workshop</div>
              <h3>Summer of Creativity & Connection</h3>
              <div className="date">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8z" />
                </svg>
                September 15, 2025
              </div>
              <p>
                Our summer workshops brought together 500+ participants, fostering meaningful 
                connections and artistic expression. The impact of these sessions continues 
                to ripple through our communities.
              </p>
              <a href="#" className="read-more">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
                </svg>
              </a>
            </div>
          </NewsCard>
        </NewsGrid>
      </NewsContainer>
    </PageWrapper>
  );
};

export default News;