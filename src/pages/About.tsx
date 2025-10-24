import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ChapterButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);

  &:hover {
    background: #1d4ed8;
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
  }
`;

const AboutContainer = styled.div`
  min-height: calc(100vh - ${props => props.theme.spacing.header});
  margin-top: ${props => props.theme.spacing.header};
  background: #e2eeff;  /* Deeper blue background */
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%);
  
  h1 {
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: 700;
    color: #1a365d;
    margin-bottom: 2rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background: linear-gradient(90deg, #2563eb, #1d4ed8);
    }
  }
  
  p {
    font-size: clamp(1.2rem, 2vw, 1.4rem);
    max-width: 800px;
    line-height: 1.8;
    color: #1e293b;
    margin: 0 auto;
  }
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const MissionCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  
  h2 {
    font-size: 2.5rem;
    color: #2563eb;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #1e293b;
    margin-bottom: 2rem;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const ValueCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    font-size: 1.5rem;
    color: #2563eb;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    font-size: 1.1rem;
    color: #1e293b;
    line-height: 1.6;
  }
`;

const ImpactSection = styled.section`
  background: rgba(255, 255, 255, 0.8);
  padding: 4rem 2rem;
  text-align: center;
  
  h2 {
    font-size: 2.5rem;
    color: #1a365d;
    margin-bottom: 3rem;
    font-weight: 600;
  }
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ImpactCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  
  .number {
    font-size: 3rem;
    font-weight: 700;
    color: #2563eb;
    margin-bottom: 1rem;
  }
  
  .label {
    font-size: 1.1rem;
    color: #1e293b;
    line-height: 1.4;
  }
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <h1>About Us</h1>
        <p>
          Art4Hearts is a nonprofit organization dedicated to providing volunteer opportunities 
          through creating heartfelt cards and art kits. We invite individuals passionate about 
          contributing to the community to explore our platform and engage with our creative features.
        </p>
      </HeroSection>

      <ContentSection>
        <MissionCard
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Mission</h2>
          <p>
            We started Art4Hearts to follow through our mission of spreading love to community 
            members who are in need of care. Our dedicated team of over 4,500 volunteers has 
            collectively donated more than 5,000 bracelets and art therapy kits, making a 
            meaningful impact in communities worldwide.
          </p>
          <div style={{ 
            marginTop: '2.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem',
            flexWrap: 'wrap' 
          }}>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#2563eb', 
              fontWeight: '600',
              margin: '0' 
            }}>
              Art4Hearts currently has 150+ chapters around the world
            </p>
            <ChapterButton 
              to="/about/chapters" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Chapters Map
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                style={{ width: '1.25em', marginLeft: '0.5em' }}
              >
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
              </svg>
            </ChapterButton>
          </div>
        </MissionCard>

        <h2 style={{ 
          fontSize: '2.5rem', 
          color: '#1a365d', 
          marginBottom: '2rem', 
          textAlign: 'center' 
        }}>
          Our Values
        </h2>
        
        <ValuesGrid>
          <ValueCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3>Creativity</h3>
            <p>We believe in the power of artistic expression to heal, connect, and inspire positive change in our communities.</p>
          </ValueCard>
          
          <ValueCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Compassion</h3>
            <p>Every art kit and bracelet we create is made with care and understanding, reaching out to those who need support.</p>
          </ValueCard>
          
          <ValueCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3>Community</h3>
            <p>We foster a global network of volunteers and chapters, united in our mission to spread joy through art.</p>
          </ValueCard>
        </ValuesGrid>
      </ContentSection>

      <ImpactSection>
        <h2>Our Impact</h2>
        <ImpactGrid>
          <ImpactCard>
            <div className="number">4,500+</div>
            <div className="label">Volunteers Worldwide</div>
          </ImpactCard>
          <ImpactCard>
            <div className="number">150+</div>
            <div className="label">Active Chapters</div>
          </ImpactCard>
          <ImpactCard>
            <div className="number">5,000+</div>
            <div className="label">Art Kits & Bracelets Delivered</div>
          </ImpactCard>
          <ImpactCard>
            <div className="number">50+</div>
            <div className="label">Countries Reached</div>
          </ImpactCard>
        </ImpactGrid>
      </ImpactSection>
    </AboutContainer>
  );
};

export default About;