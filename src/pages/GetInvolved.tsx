import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GetInvolvedContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.dark};
  color: ${props => props.theme.colors.text.light};
`;

const Hero = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${props => props.theme.spacing.large};
  
  h1 {
    font-size: clamp(3rem, 8vw, 8rem);
    font-family: ${props => props.theme.fonts.title};
    margin-bottom: ${props => props.theme.spacing.medium};
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const OpportunitiesSection = styled.section`
  padding: ${props => props.theme.spacing.large};
  max-width: 1400px;
  margin: 0 auto;
`;

const OpportunityCard = styled(motion.div)`
  background: ${props => props.theme.colors.background.darker};
  border-radius: 20px;
  padding: ${props => props.theme.spacing.large};
  margin-bottom: ${props => props.theme.spacing.large};
  
  h3 {
    font-family: ${props => props.theme.fonts.title};
    font-size: 2rem;
    margin-bottom: ${props => props.theme.spacing.medium};
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.medium};
  }
  
  button {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text.light};
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 30px;
    cursor: pointer;
    transition: transform ${props => props.theme.transitions.medium};
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const GetInvolved: React.FC = () => {
  return (
    <GetInvolvedContainer>
      <Hero>
        <div>
          <h1>Get Involved</h1>
          <p>
            Join our mission to bring healing through art. Together, we can make 
            a difference in children's lives.
          </p>
        </div>
      </Hero>
      
      <OpportunitiesSection>
        <OpportunityCard
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3>Volunteer</h3>
          <p>
            Share your time and talents with us. From organizing art workshops 
            to helping with administrative tasks, there are many ways to contribute.
          </p>
          <button>Join as Volunteer</button>
        </OpportunityCard>
        
        <OpportunityCard
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3>Donate</h3>
          <p>
            Support our cause financially. Your donations help us provide art 
            supplies, therapy sessions, and expand our reach to more children.
          </p>
          <button>Make a Donation</button>
        </OpportunityCard>
        
        <OpportunityCard
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3>Partner With Us</h3>
          <p>
            Are you an organization that shares our vision? Let's collaborate 
            to create more impact and reach more children in need.
          </p>
          <button>Become a Partner</button>
        </OpportunityCard>
      </OpportunitiesSection>
    </GetInvolvedContainer>
  );
};

export default GetInvolved;