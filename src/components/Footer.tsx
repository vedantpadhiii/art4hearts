import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.background.darker};
  padding: ${props => props.theme.spacing.large} ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.text.light};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.large};
`;

const FooterSection = styled.div`
  h3 {
    font-family: ${props => props.theme.fonts.title};
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.small};
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Art4Hearts</h3>
          <p>Creating smiles through art, one heart at a time.</p>
        </FooterSection>
        <FooterSection>
          <h3>Contact</h3>
          <p>Email: info@art4hearts.org</p>
          <p>Phone: (555) 123-4567</p>
        </FooterSection>
        <FooterSection>
          <h3>Follow Us</h3>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>Facebook</p>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;