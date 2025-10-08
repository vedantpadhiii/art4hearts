import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiInstagram, FiMail, FiHeart } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.background.dark};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.text.light};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  align-items: start;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FooterTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    opacity: 0.6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.colors.text.light};
  font-size: 1.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 400px;
  margin: 0 auto;
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const HeartIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  animation: beat 1.5s ease infinite;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @keyframes beat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Our Mission</FooterTitle>
          <Description>
            Spreading joy and hope through art, one bracelet at a time. Join us in making a difference in the lives of children and communities worldwide.
          </Description>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Connect With Us</FooterTitle>
          <Description>
            Follow us on social media or reach out via email. We'd love to hear from you!
          </Description>
          <SocialLinks>
            <SocialLink 
              href="https://www.instagram.com/art4heartsorg/" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="icon"><FiInstagram size={20} /></span>
              Instagram
            </SocialLink>
            <SocialLink 
              href="mailto:art4heartsorg@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="icon"><FiMail size={20} /></span>
              Email
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Get Involved</FooterTitle>
          <Description>
            Whether you're an artist, volunteer, or supporter, there are many ways to contribute to our cause and make a positive impact.
          </Description>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <span>© {currentYear} Art4Hearts.</span>
        <span>Made with</span>
        <HeartIcon>
          <span className="icon"><FiHeart size={16} /></span>
        </HeartIcon>
        <span>for a better world</span>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;