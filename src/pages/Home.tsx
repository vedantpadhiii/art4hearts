import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCountUp from '../hooks/useCountUp';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

// Hero Section
const HeroSection = styled.section`
  background: linear-gradient(135deg, #c6dddc 0%, #b3d4d2 100%);
  padding: clamp(4rem, 8vh, 5rem) 2rem;
  position: relative;
  overflow: hidden;
  min-height: 85vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: ${({ theme }) => theme.spacing.header};
  width: 100%;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding-left: 2rem;
  padding-right: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
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
`;

const LogoContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 250px;
  max-width: 450px;
  
  img {
    max-width: 100%;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
  }

  @media (max-width: 768px) {
    justify-content: center;
    max-width: 350px;
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  flex: 1;
  text-align: left;
  max-width: 550px;

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
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    text-align: center;
    max-width: 100%;
  }
`;

const HeroButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const HeroButton = styled.a<{ primary?: boolean }>`
  display: inline-block;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid;
  background: #000000;
  color: white;
  border-color: #000000;

  &:hover {
    background: #333333;
    border-color: #333333;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
`;

// Section Container
const SectionContainer = styled(motion.section)`
  padding: clamp(5rem, 10vh, 8rem) 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
  width: 100%;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding-left: 2rem;
  padding-right: 2rem;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const WhiteSection = styled(SectionContainer)`
  background: white;
`;

const LightSection = styled(SectionContainer)`
  background: #f9fafb;
`;

const TealSection = styled(SectionContainer)`
  background: #c6dddc;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: #000000;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
  letter-spacing: -0.01em;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #5ba3a0, #4a9894);
    margin: 1.5rem auto 0;
    border-radius: 2px;
  }
`;

const SectionDescription = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: #000000;
  max-width: 900px;
  margin: 2rem auto 0;
  line-height: 1.8;
`;

// Cards Grid
const CardGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 1rem;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 16px 40px rgba(198, 221, 220, 0.25);
    border-color: #c6dddc;
  }

  h3 {
    font-size: clamp(1.3rem, 2.5vw, 1.5rem);
    color: #000000;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    font-size: 1rem;
    color: #000000;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  a {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: #000000;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      background: #333333;
      color: white;
      transform: scale(1.05);
    }
  }
`;

// Stats Section
const StatGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 1rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 2.5rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(198, 221, 220, 0.2);
  }

  .number {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    color: #000000;
    line-height: 1;
    margin-bottom: 0.8rem;
  }

  .label {
    font-size: clamp(0.9rem, 1.5vw, 1rem);
    color: #000000;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

// List styles
const BenefitsList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  max-width: 600px;
  margin: 2rem auto;
  text-align: left;

  li {
    font-size: 1.1rem;
    color: #000000;
    font-weight: 600;
    padding: 0.8rem 0;
    padding-left: 2rem;
    position: relative;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #5ba3a0;
      font-weight: bold;
      font-size: 1.3rem;
    }
  }
`;

// CTA Button
const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #000000;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 2rem;
  border: 2px solid transparent;

  &:hover {
    background: #333333;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;

// Partners Section
const PartnersSection = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 3rem 2rem;
  align-items: center;
  justify-content: center;
  background: white;
  width: 100%;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding-left: calc(50vw - 50%);
  padding-right: calc(50vw - 50%);

  img {
    max-width: 100%;
    width: auto;
    height: auto;
    max-height: 140px;
    object-fit: contain;
    filter: grayscale(0%);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    gap: 2rem;
    padding: 2.5rem 1rem;
    
    img {
      max-height: 110px;
    }
  }
`;

// Subsection Grid
const SubsectionGrid = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 3rem auto 0;
  max-width: 1000px;
`;

const SubsectionButton = styled.button<{ isActive?: boolean }>`
  padding: 0.8rem 2.2rem;
  border: 2px solid #000000;
  border-radius: 50px;
  background: ${props => props.isActive ? '#000000' : 'transparent'};
  color: ${props => props.isActive ? 'white' : '#000000'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: #000000;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ContentCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  padding: 3rem 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  margin: 2.5rem 0;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;

  div {
    h3 {
      font-size: clamp(1.5rem, 5vw, 2rem);
      color: #000000;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    p {
      font-size: clamp(0.95rem, 3vw, 1.1rem);
      color: #333333;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
  }

  .content-image {
    width: 100%;
    height: 300px;
    object-fit: contain;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;

    .content-image {
      height: 250px;
    }
  }
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  background: #000000;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;

  span {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #333333;
    transform: translateX(4px);

    span {
      transform: translateX(4px);
    }
  }
`;

const Subsection = styled(motion.div)`
  text-align: center;
  padding: 2rem;
`;

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'initiatives' | 'chapters' | 'volunteering'>('initiatives');
  const { targetRef: statsRef, isVisible: statsVisible, hasAnimated: statsAnimated } = useIntersectionObserver({
    threshold: 0.2
  });

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Spreading warmth through art therapy & bracelets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Art4Hearts is a youth-led nonprofit creating beauty and comfort through personalized art, workshops, and handmade creations
          </motion.p>
          <HeroButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <HeroButton as={Link} to="/about" primary>
              Learn More
            </HeroButton>
            <HeroButton as={Link} to="/contact">
              Connect
            </HeroButton>
          </HeroButtonGroup>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ marginTop: '1.5rem', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', fontWeight: 400 }}
          >
            Join our community dedicated to curiosity and creativity through hands-on STEM projects today!
          </motion.p>
        </HeroContent>
        <LogoContainer
          initial={{ scale: 0.5, opacity: 0, x: 40 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.1,
            type: "spring",
            stiffness: 120,
            damping: 8
          }}
        >
          <img src="/Art4Hearts logo.png" alt="Art4Hearts Logo" />
        </LogoContainer>
      </HeroSection>

      {/* Partners Section */}
      <PartnersSection
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <motion.img src="/partners/0.png" alt="Partner 1" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} />
        <motion.img src="/partners/1.png" alt="Partner 2" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} viewport={{ once: true }} />
        <motion.img src="/partners/2.png" alt="Partner 3" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} />
        <motion.img src="/partners/3.png" alt="Partner 4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }} />
        <motion.img src="/partners/4.png" alt="Partner 5" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} />
        <motion.img src="/partners/5.png" alt="Partner 6" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} viewport={{ once: true }} />
        <motion.img src="/partners/6.png" alt="Partner 7" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} />
        <motion.img src="/partners/7.png" alt="Partner 8" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} viewport={{ once: true }} />
      </PartnersSection>

      {/* What is Art4Hearts */}
      <WhiteSection
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What is Art4Hearts?
        </SectionTitle>
        <SectionDescription
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Learn more about our initiatives to bring kindness and love to hospitals, senior centers, etc.
        </SectionDescription>
        
        <SubsectionGrid
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <SubsectionButton
            as={motion.button}
            isActive={activeTab === 'initiatives'}
            onClick={() => setActiveTab('initiatives')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Initiatives
          </SubsectionButton>

          <SubsectionButton
            as={motion.button}
            isActive={activeTab === 'chapters'}
            onClick={() => setActiveTab('chapters')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our Chapters
          </SubsectionButton>

          <SubsectionButton
            as={motion.button}
            isActive={activeTab === 'volunteering'}
            onClick={() => setActiveTab('volunteering')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Volunteering
          </SubsectionButton>
        </SubsectionGrid>

        {/* Content Cards */}
        {activeTab === 'initiatives' && (
          <ContentCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3>🎨 Initiatives</h3>
              <p>
                Discover our creative programs bringing art and comfort to communities, hospitals, and care facilities worldwide. 
                Our art therapy kits, workshops, and personalized bracelets are designed to spread joy and healing to those who need it most.
              </p>
              <StyledLink to="/spotlights">
                Explore More <span>→</span>
              </StyledLink>
            </div>
            <img className="content-image" src="/Art4Hearts logo.png" alt="Initiatives" />
          </ContentCard>
        )}

        {activeTab === 'chapters' && (
          <ContentCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3>🏘️ Our Chapters</h3>
              <p>
                Join a local Art4Hearts chapter and connect with passionate volunteers dedicated to spreading creativity in your community. 
                Our chapters provide leadership opportunities, volunteer hours, and the chance to make a real difference.
              </p>
              <StyledLink to="/about/chapters">
                Explore More <span>→</span>
              </StyledLink>
            </div>
            <img className="content-image" src="/Art4Hearts logo.png" alt="Our Chapters" />
          </ContentCard>
        )}

        {activeTab === 'volunteering' && (
          <ContentCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3>🤝 Volunteering</h3>
              <p>
                Make a difference by volunteering with Art4Hearts. Help create art that brings joy and healing to those who need it most. 
                Earn certified volunteer hours, gain leadership experience, and be part of a global movement for good.
              </p>
              <StyledLink to="/get-involved">
                Explore More <span>→</span>
              </StyledLink>
            </div>
            <img className="content-image" src="/Art4Hearts logo.png" alt="Volunteering" />
          </ContentCard>
        )}
      </WhiteSection>

      {/* Get Involved */}
      <LightSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get Involved
        </SectionTitle>
        <CardGrid
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>🎨 Become a Volunteer</h3>
            <p>Start volunteering remotely by making bracelets or art therapy kits!</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd98E0LsNhBywLdUhlIBmp6e88bjt81Fh1tV6Lz6FklT1LtEg/viewform?usp=send_form" target="_blank" rel="noopener noreferrer">Apply Now</a>
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3>🏘️ Apply to Become a Chapter</h3>
            <p>Anyone, anywhere can start a chapter for their local community.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd0kg3Ymu1uoCwUqhjgHNZyOHoVvaci8IRKYK5XyjUp6GQbnA/viewform" target="_blank" rel="noopener noreferrer">Apply Now</a>
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>📦 Looking for a Kit or Bracelet?</h3>
            <p>If you're a hospital, senior center, or any charitable organization, we'd love to help!</p>
            <a href="https://art4hearts.onrender.com/contact" target="_blank" rel="noopener noreferrer">Contact Us</a>
          </Card>
        </CardGrid>
      </LightSection>

      {/* Stats Section */}
      <WhiteSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Impact
        </SectionTitle>
        <StatGrid
          ref={statsRef}
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <StatCard
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="number">
              {useCountUp({
                end: 4500,
                isVisible: statsVisible || statsAnimated,
                duration: 2500
              }).toLocaleString()}+
            </div>
            <div className="label">Volunteers Worldwide</div>
          </StatCard>
          <StatCard
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
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
          <StatCard
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
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
          <StatCard
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
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
      </WhiteSection>

      {/* Final CTA */}
      <WhiteSection
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to Make a Difference?
        </SectionTitle>
        <SectionDescription
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Join Art4Hearts today and be part of a global movement spreading creativity, comfort, and joy to those who need it most.
        </SectionDescription>
        <CTAButton
          as="a"
          href="https://docs.google.com/forms/d/e/1FAIpQLSd98E0LsNhBywLdUhlIBmp6e88bjt81Fh1tV6Lz6FklT1LtEg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register as a Volunteer
        </CTAButton>
      </WhiteSection>
    </>
  );
};

export default Home;