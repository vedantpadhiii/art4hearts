import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ChapterButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: #000000;
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #333333;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
`;

const AboutContainer = styled.div`
  min-height: calc(100vh - ${props => props.theme.spacing.header});
  margin-top: ${props => props.theme.spacing.header};
  background: white;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #c6dddc 0%, #b3d4d2 100%);
  padding: clamp(6rem, 10vh, 8rem) 2rem;
  position: relative;
  overflow: visible;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  width: 100%;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding-left: 2rem;
  padding-right: 2rem;

  @media (max-width: 768px) {
    min-height: auto;
    gap: 2rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -15%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
    animation: float 8s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(20px); }
  }
  
  h1 {
    font-size: clamp(3rem, 6vw, 4.5rem);
    font-weight: 700;
    color: #000000;
    margin-bottom: 1.2rem;
    position: relative;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: clamp(1.05rem, 2vw, 1.4rem);
    max-width: 800px;
    line-height: 1.8;
    color: #000000;
    margin: 0 auto;
  }
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #000000;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MissionCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  
  h2 {
    font-size: 2.5rem;
    color: #000000;
    margin-bottom: 1.5rem;
    font-weight: 600;
    text-align: center;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #000000;
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
    color: #000000;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    font-size: 1.1rem;
    color: #000000;
    line-height: 1.6;
  }
`;

const ImpactSection = styled.section`
  background: white;
  padding: 4rem 2rem;
  text-align: center;
  
  h2 {
    font-size: 2.5rem;
    color: #000000;
    margin-bottom: 3rem;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
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
    color: #000000;
    margin-bottom: 1rem;
  }
  
  .label {
    font-size: 1.1rem;
    color: #000000;
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
              color: '#000000', 
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

        <SectionTitle>Our Values</SectionTitle>
        
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