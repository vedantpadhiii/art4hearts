import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  overflow: visible;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  margin-top: ${({ theme }) => theme.spacing.header};
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
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 700px;

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

  a, button {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: #000000;
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: #333333;
      color: white;
      transform: scale(1.05);
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

const GetInvolved: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Get Involved
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Join our mission to bring healing and creativity through art. Together, we can make a difference in communities worldwide.
          </motion.p>
        </HeroContent>
      </HeroSection>

      {/* Opportunities Section */}
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
          Ways to Get Involved
        </SectionTitle>
        <SectionDescription
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          There are many ways to support Art4Hearts and make an impact. Choose the opportunity that best fits your interests and skills.
        </SectionDescription>
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
            <p>
              Share your time and talents with us. Help create art therapy kits, make bracelets, organize workshops, or assist with administrative tasks. All skills are valued!
            </p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd98E0LsNhBywLdUhlIBmp6e88bjt81Fh1tV6Lz6FklT1LtEg/viewform?usp=send_form" target="_blank" rel="noopener noreferrer">Join as Volunteer</a>
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3>💝 Make a Donation</h3>
            <p>
              Support our cause financially. Your donations help us provide art supplies, expand our programs, and reach more communities in need of healing and creativity.
            </p>
            <button onClick={() => alert('Donation portal coming soon!')}>Make a Donation</button>
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>🏘️ Start a Chapter</h3>
            <p>
              Anyone, anywhere can start a local Art4Hearts chapter. Lead your community, recruit volunteers, and create lasting impact in your school or neighborhood.
            </p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd0kg3Ymu1uoCwUqhjgHNZyOHoVvaci8IRKYK5XyjUp6GQbnA/viewform" target="_blank" rel="noopener noreferrer">Apply to Lead</a>
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3>🤝 Partner With Us</h3>
            <p>
              Are you an organization that shares our vision? Let's collaborate to create impact and reach more people in need of art therapy and creative expression.
            </p>
            <a href="mailto:art4heartsorg@gmail.com">Become a Partner</a>
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>📢 Spread the Word</h3>
            <p>
              Help us grow by sharing our mission on social media, telling your friends and family, or featuring us in your newsletter. Every share makes a difference!
            </p>
            <a href="https://www.instagram.com/art4heartsorg/?hl=en" target="_blank" rel="noopener noreferrer">Follow Us</a>
          </Card>

          <Card
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>🌍 Request Our Services</h3>
            <p>
              If you represent a hospital, senior center, or charitable organization, we'd love to help! Request art therapy kits or a workshop for your community.
            </p>
            <a href="/contact">Contact Us</a>
          </Card>
        </CardGrid>
      </WhiteSection>

      {/* CTA Section */}
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

export default GetInvolved;