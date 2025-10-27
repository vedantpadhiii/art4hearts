import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  background: #ffffff;
  margin-top: ${props => props.theme.spacing.header};
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #c6dddc 0%, #b3d4d2 100%);
  padding: clamp(5rem, 10vh, 8rem) 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);

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
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;

  h1 {
    font-size: clamp(2.8rem, 5.5vw, 4.2rem);
    color: #000000;
    font-weight: 800;
    margin-bottom: 1.2rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  p {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    color: #000000;
    font-weight: 500;
    line-height: 1.8;
    margin-bottom: 0;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(4rem, 8vh, 6rem) 2rem;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const InfoCard = styled.div`
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(198, 221, 220, 0.25);
    border-color: #c6dddc;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #000000;
    margin-bottom: 1.5rem;
  }

  div {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: #000000;
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    a, span {
      color: #000000;
      text-decoration: none;
      font-size: 0.95rem;
      line-height: 1.6;
      display: block;

      &:hover {
        color: #c6dddc;
      }
    }
  }
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1.5rem;
`;

const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <HeroSection>
        <HeroContent>
          <h1>Get In Touch</h1>
          <p>
            We'd love to hear from you. Reach out to learn more about Art4Hearts and how you can make a difference.
          </p>
        </HeroContent>
      </HeroSection>

      <ContentContainer>
        <InfoSection>
          <InfoCard>
            <h3>📧 Email</h3>
            <div>
              <a href="mailto:art4heartsorg@gmail.com">art4heartsorg@gmail.com</a>
            </div>
          </InfoCard>

          <InfoCard>
            <h3>📍 Location</h3>
            <div>
              <span>14435 Big Basin Way, Suite C, PMB 175</span>
              <span>Saratoga, CA 95070</span>
            </div>
          </InfoCard>

          <InfoCard>
            <h3>🤝 Connect With Us</h3>
            <SocialContainer>
              <a
                href="https://www.instagram.com/art4hearts.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.25rem',
                  background: '#000000',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
              >
                Instagram
              </a>
              <a
                href="https://linktr.ee/art4hearts"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.25rem',
                  background: '#000000',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
              >
                Linktree
              </a>
            </SocialContainer>
          </InfoCard>
        </InfoSection>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ color: '#000000', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Thank you for your interest in Art4Hearts. We'll get back to you as soon as possible!
          </p>
        </div>
      </ContentContainer>
    </ContactContainer>
  );
};

export default Contact;