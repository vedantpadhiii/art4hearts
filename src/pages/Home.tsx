import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCountUp from '../hooks/useCountUp';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// Hero Section
const HeroSection = styled.section`
  background: #c6dddc;
  padding: clamp(6rem, 10vh, 8rem) 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.header};

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;

  h1 {
    font-size: clamp(2.5rem, 6vw, 4rem);
    color: #1a365d;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    color: #4a9894;
    font-weight: 500;
    line-height: 1.6;
    margin: 0;
  }
`;

// About Section
const AboutSection = styled.section`
  padding: clamp(4rem, 8vh, 6rem) 2rem;
  background: white;
  text-align: center;

  h2 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    color: #1a365d;
    font-weight: 700;
    margin-bottom: 2rem;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 4px;
      background: linear-gradient(90deg, #5ba3a0, #4a9894);
      border-radius: 2px;
    }
  }

  p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: #1e293b;
    max-width: 900px;
    margin: 3rem auto 0;
    line-height: 1.8;
  }
`;

// Get Involved Section
const GetInvolvedSection = styled.section`
  padding: clamp(4rem, 8vh, 6rem) 2rem;
  background: #f9fafb;

  h2 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    color: #1a365d;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(198, 221, 220, 0.2);
    border-color: #c6dddc;
  }

  h3 {
    font-size: 1.5rem;
    color: #1a365d;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: #4a9894;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  a {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: #c6dddc;
    color: #1a365d;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: #5ba3a0;
      color: white;
    }
  }
`;

// Stats Section
const StatsSection = styled.section`
  padding: clamp(4rem, 8vh, 6rem) 2rem;
  background: white;

  h2 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    color: #1a365d;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4rem;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const StatCard = styled.div`
  background: #c6dddc;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;

  .number {
    font-size: clamp(3rem, 5vw, 4rem);
    font-weight: 800;
    color: #1a365d;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: 1rem;
    color: #1a365d;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

// Start a Chapter Section
const ChapterSection = styled.section`
  padding: clamp(4rem, 8vh, 6rem) 2rem;
  background: #c6dddc;

  h2 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    color: #1a365d;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
  }

  .benefits {
    max-width: 800px;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      font-size: 1.1rem;
      color: #1a365d;
      font-weight: 500;
      text-align: left;
    }
  }

  a {
    display: inline-block;
    margin-top: 2rem;
    padding: 1rem 2.5rem;
    background: white;
    color: #1a365d;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: #1a365d;
      color: white;
    }
  }
`;

// CTA Section
const CTASection = styled.section`
  padding: clamp(4rem, 8vh, 6rem) 2rem;
  background: white;
  text-align: center;

  h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: #1a365d;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: #4a9894;
    max-width: 800px;
    margin: 0 auto 2rem;
    line-height: 1.8;
  }

  a {
    display: inline-block;
    padding: 1rem 2.5rem;
    background: #c6dddc;
    color: #1a365d;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: #5ba3a0;
      color: white;
    }
  }
`;

const Home: React.FC = () => {
  const { targetRef: statsRef, isVisible: statsVisible, hasAnimated: statsAnimated } = useIntersectionObserver({
    threshold: 0.3
  });

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <h1>Spreading love through art</h1>
          <p>Art4Hearts is a youth-led nonprofit creating beauty and comfort through personalized art, workshops, and handmade creations</p>
        </HeroContent>
      </HeroSection>

      {/* What is Art4Hearts */}
      <AboutSection>
        <h2>What is Art4Hearts?</h2>
        <p>
          Art4Hearts is a 501(c)(3) nonprofit based in the Bay Area dedicated to spreading creativity and comfort through handcrafted art therapy kits, 
          engaging art workshops, and personalized bracelets with uplifting messages. We believe everyone deserves to experience the healing power of art.
        </p>
      </AboutSection>

      {/* Get Involved */}
      <GetInvolvedSection>
        <h2>Get Involved</h2>
        <CardGrid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>🎨 Volunteer</h3>
            <p>Earn volunteer hours and make a meaningful impact in your community by creating art with us.</p>
            <Link to="/get-involved">Learn More</Link>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3>🏘️ Start a Chapter</h3>
            <p>Lead a local Art4Hearts chapter and build a community of passionate artists and creators in your area.</p>
            <Link to="/about/chapters">Learn More</Link>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>📚 Learn & Support</h3>
            <p>Discover our projects, read stories from recipients, and stay updated on our latest initiatives.</p>
            <Link to="/spotlights">Learn More</Link>
          </Card>
        </CardGrid>
      </GetInvolvedSection>

      {/* Stats Section */}
      <StatsSection>
        <h2>Our Impact</h2>
        <StatGrid ref={statsRef}>
          <StatCard>
            <div className="number">
              {useCountUp({
                end: 4500,
                isVisible: statsVisible || statsAnimated,
                duration: 2500
              }).toLocaleString()}+
            </div>
            <div className="label">Volunteers Worldwide</div>
          </StatCard>
          <StatCard>
            <div className="number">
              {useCountUp({
                end: 150,
                isVisible: statsVisible || statsAnimated,
                duration: 2000,
                delay: 200
              }).toLocaleString()}+
            </div>
            <div className="label">Active Chapters</div>
          </StatCard>
          <StatCard>
            <div className="number">
              {useCountUp({
                end: 50,
                isVisible: statsVisible || statsAnimated,
                duration: 1500,
                delay: 400
              }).toLocaleString()}+
            </div>
            <div className="label">Countries Reached</div>
          </StatCard>
          <StatCard>
            <div className="number">
              {useCountUp({
                end: 1000,
                isVisible: statsVisible || statsAnimated,
                duration: 2000,
                delay: 600
              }).toLocaleString()}+
            </div>
            <div className="label">Kits & Bracelets</div>
          </StatCard>
        </StatGrid>
      </StatsSection>

      {/* Start a Chapter */}
      <ChapterSection>
        <h2>Start a Chapter</h2>
        <p style={{ fontSize: '1.1rem', color: '#1a365d', maxWidth: '800px', margin: '0 auto 1rem' }}>
          Join our mission to bring art and creativity to communities worldwide. Here's what you get:
        </p>
        <ul className="benefits">
          <li>💰 Leadership Opportunities</li>
          <li>📜 Certified Volunteer Hours</li>
          <li>🤝 Community Engagement</li>
          <li>🎓 Strengthen Your Resume</li>
          <li>🎉 Lots of Fun & Support</li>
        </ul>
        <div style={{ textAlign: 'center' }}>
          <Link to="/about/chapters">Get Started</Link>
        </div>
      </ChapterSection>

      {/* Final CTA */}
      <CTASection>
        <h2>Ready to Make a Difference?</h2>
        <p>
          Join Art4Hearts today and be part of a global movement spreading creativity, comfort, and joy to those who need it most.
        </p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSd98E0LsNhBywLdUhlIBmp6e88bjt81Fh1tV6Lz6FklT1LtEg/viewform" target="_blank" rel="noopener noreferrer">
          Register as a Volunteer
        </a>
      </CTASection>
    </>
  );
};

export default Home;