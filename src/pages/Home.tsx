import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCountUp from '../hooks/useCountUp';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import GalleryCarousel from '../components/GalleryCarousel';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../index.css';


// FAQ Data
const homepageFAQs = [
  {
    question: "Can I volunteer if I'm not in the U.S.?",
    answer: "Yes, Art4Hearts is a global organization 🌍"
  },
  {
    question: "Can I volunteer if I'm not in high school?",
    answer: "Yes, anyone regardless of age can volunteer!"
  },
  {
    question: "What's the process for making bracelets?",
    answer: "1. Fill out the Volunteer Registration Form.\n2. Look over the Bracelets Service Hours Request Form so you know how to track time.\n3. Start making bracelets!\n4. Fill out the Bracelets Service Hours Request Form to log your hours."
  },
  {
    question: "How can I donate the bracelets and art therapy kits?",
    answer: "You can:\n1. Ship it to our P.O. Box Address found in the service request forms\n2. Donate it to your local charitable organization."
  },
  {
    question: "What is a chapter?",
    answer: "A chapter is a local branch of Art4Hearts led by a volunteer who wants to create a larger impact within their school or community.\n\nChapters organize initiatives such as bracelet-making and art therapy kit donations.\n\nBy starting a chapter, you'll recruit other volunteers, host events, and can serve local hospitals, senior centers, etc. You'll also keep your group organized and connected to our global Art4Hearts community."
  }
];

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
  padding: clamp(5rem, 10vh, 8rem) 2rem;
  position: relative;
  overflow: visible;
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
  min-width: 0;
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
  max-width: 600px;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;

  h1 {
    font-size: clamp(2.8rem, 5.5vw, 4.2rem);
    color: #000000;
    font-weight: 800;
    margin-bottom: 1.2rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  p {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    color: #000000;
    font-weight: 500;
    line-height: 1.8;
    margin-bottom: 2rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
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
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const HeroButton = styled.a<{ primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid;
  background: #000000;
  color: white;
  border-color: #000000;
  white-space: nowrap;
  flex-shrink: 0;

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

const CTASection = styled(SectionContainer)`
  background: #ffcfec;
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

const MapEmbedSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 1rem;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  margin-top: 2rem;

  .leaflet-container {
    height: 100%;
    width: 100%;
    background: white;
    border-radius: 12px;
  }

  .leaflet-marker-icon {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  .leaflet-popup-content-wrapper {
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(198, 221, 220, 0.25);
  }

  .leaflet-popup-tip {
    background: white;
  }

  @media (max-width: 768px) {
    height: 400px;
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

const InstructionButton = styled.a`
  display: inline-block;
  padding: 0.7rem 1.8rem;
  background: #000000;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  margin-top: 0.8rem;
  margin-right: 0.8rem;
  border: 2px solid transparent;

  &:hover {
    background: #333333;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }
`;

// Gallery Section
const GallerySection = styled(SectionContainer)`
  background: white;
`;

const GalleryContentWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;

  @media (max-width: 1024px) {
    width: 92%;
  }

  @media (max-width: 768px) {
    width: 96%;
    max-width: 100%;
  }
`;

const GalleryButton = styled(motion.a)`
  display: inline-block;
  padding: 0.9rem 2rem;
  background: #000000;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 2.5rem;
  border: 2px solid transparent;

  &:hover {
    background: #333333;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
`;

// Partners Section
const PartnersSection = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 2rem 2rem;
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
    max-height: 200px;
    object-fit: contain;
    filter: grayscale(0%);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 1.5rem 1rem;
    
    img {
      max-height: 150px;
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
    text-align: left;

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

// FAQ Section
const FAQContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1100px;
  margin: 4rem auto 0;
  padding: 3rem 2rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const FAQLeft = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FAQIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FAQList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FAQItem = styled(motion.li)<{ isActive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  background: ${props => props.isActive ? '#c6dddc' : '#f9fafb'};
  border-radius: 8px;
  border-left: 4px solid ${props => props.isActive ? '#5ba3a0' : '#c6dddc'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.isActive ? '#c6dddc' : '#eeeff0'};
    transform: translateX(4px);
  }
`;

const FAQQuestion = styled.span<{ isActive?: boolean }>`
  font-size: 1rem;
  color: ${props => props.isActive ? '#000000' : '#000000'};
  font-weight: ${props => props.isActive ? '700' : '600'};
  flex: 1;
`;

const FAQToggle = styled.span<{ isOpen?: boolean }>`
  font-size: 1.2rem;
  color: ${props => props.isOpen ? '#5ba3a0' : '#c6dddc'};
  font-weight: bold;
  margin-left: 1rem;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const FAQRight = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(198, 221, 220, 0.1) 0%, rgba(179, 212, 210, 0.05) 100%);
  border-radius: 12px;
  border: 2px solid rgba(198, 221, 220, 0.2);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const FAQAnswerDisplay = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FAQAnswerTitle = styled(motion.h3)`
  font-size: 1.2rem;
  color: #000000;
  font-weight: 700;
  margin: 0;
  line-height: 1.6;
`;

const FAQAnswerText = styled(motion.p)`
  font-size: 1rem;
  color: #333333;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`;

const FAQPlaceholder = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999999;
  text-align: center;
  gap: 1rem;

  span {
    font-size: 3rem;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }
`;

const FAQLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background: #000000;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background: #333333;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
`;

// Chapters data for map
const chaptersData = [
  { name: 'Art4Hearts: Minnesota Connections Academy', leader: 'Makayla Anderson', location: 'Saint Paul', region: 'Minnesota', country: 'USA', email: 'amakayla900@gmail.com', lat: 44.9537, lng: -93.0900 },
  { name: 'Art4Hearts Chandler AZ', leader: 'Siena Verdugo', location: 'Chandler', region: 'Arizona', country: 'USA', email: 'art4heartschandler@gmail.com', lat: 33.3062, lng: -111.8413 },
  { name: 'Art4Hearts Crest High School', leader: 'Mallory Bowen', location: 'Shelby', region: 'North Carolina', country: 'USA', email: 'mallorybowen2022@gmail.com', lat: 35.2790, lng: -81.6381 },
  { name: 'Art4Hearts Lebanon High School', leader: 'Addy Wright', location: 'Lebanon', region: 'Indiana', country: 'USA', email: 'theaddisonwright@gmail.com', lat: 40.0423, lng: -86.4656 },
  { name: 'Art4Hearts Palm Beach Gardens', leader: 'Keira Compiani', location: 'Palm Beach Gardens', region: 'Florida', country: 'USA', email: 'Kmae.compiani@gmail.com', lat: 26.8158, lng: -80.1065 },
  { name: 'Art4Hearts Suffolk County Long Island', leader: 'Aishwarya Kammili', location: 'Suffolk', region: 'New York', country: 'USA', email: 'aishwaryakammili@gmail.com', lat: 40.9176, lng: -72.7554 },
  { name: 'Art4Hearts Bridgewater', leader: 'Neila Roach', location: 'Bridgewater', region: 'Massachusetts', country: 'USA', email: 'roachneila21@gmail.com', lat: 41.9813, lng: -71.0084 },
  { name: 'Art4Hearts Frontier International Academy', leader: 'Noor Ahmed', location: 'Hamtramck', region: 'Michigan', country: 'USA', email: 'zaralovescats143@gmail.com', lat: 42.2324, lng: -83.0673 },
  { name: 'Art4Hearts West Campus High School', leader: 'Janey Saechao', location: 'Sacramento', region: 'California', country: 'USA', email: 'art4heartswchs@gmail.com', lat: 38.5816, lng: -121.4944 },
  { name: 'Art4Hearts Atherton High School', leader: 'Delaney Payton', location: 'Louisville', region: 'Kentucky', country: 'USA', email: 'art4heartsahs@gmail.com', lat: 38.2527, lng: -85.7585 },
  { name: 'Art4Hearts Apple Valley High School', leader: 'Marley Fic', location: 'Apple Valley', region: 'California', country: 'USA', email: '2026.marleyfic@gmail.com', lat: 34.5001, lng: -117.1812 },
  { name: 'Art4Hearts Surprise, AZ', leader: 'Christina Barsch-Kuzmyn', location: 'Surprise', region: 'Arizona', country: 'USA', email: 'art4heartssurprise@gmail.com', lat: 33.6390, lng: -112.3692 },
  { name: 'Art4Hearts Denver', leader: 'Ellie Carroll', location: 'Denver', region: 'Colorado', country: 'USA', email: 'Elliecarrolladvocacy@gmail.com', lat: 39.7392, lng: -104.9903 },
  { name: 'Art4Hearts Gilbert Classical Academy', leader: 'Sophie Kephart', location: 'Gilbert', region: 'Arizona', country: 'USA', email: 'sophiegkephart@gmail.com', lat: 33.3528, lng: -111.7890 },
  { name: 'Art4Hearts Milpitas Middle College High School', leader: 'Nishka Gohel', location: 'Milpitas', region: 'California', country: 'USA', email: 'nishkangohel@gmail.com', lat: 37.4281, lng: -121.8863 },
  { name: 'Art4Hearts Clear Creek High School', leader: 'Hafsa Syed', location: 'League City', region: 'Texas', country: 'USA', email: 'Hafsasyed009@gmail.com', lat: 29.4849, lng: -95.1181 },
  { name: 'Art4Hearts SEA', leader: 'Selene Maldonado', location: 'Ormond Beach', region: 'Florida', country: 'USA', email: 'selene0925@icloud.com', lat: 29.2876, lng: -81.0573 },
  { name: 'Art4Hearts ABQ', leader: 'Nicole Ibarra', location: 'Albuquerque', region: 'New Mexico', country: 'USA', email: 'munecamisticas@outlook.com', lat: 35.0844, lng: -106.6504 },
  { name: 'Art4Hearts Emerson High School', leader: 'Andrea Capati', location: 'McKinney', region: 'Texas', country: 'USA', email: 'andrealorin.capati.169@k12.friscoisd.org', lat: 33.1972, lng: -96.6397 },
  { name: 'Art4Hearts San Jose', leader: 'Emily Mai', location: 'San Jose', region: 'California', country: 'USA', email: 'emilykimmai@gmail.com', lat: 37.3382, lng: -121.8863 },
  { name: 'Art4Hearts DH Conley HS', leader: 'Maddie Adrias', location: 'Greenville', region: 'North Carolina', country: 'USA', email: 'art4hearts.dhc@gmail.com', lat: 35.6129, lng: -82.3982 },
  { name: 'Art4Hearts Medina, TN', leader: 'Payton Wilson', location: 'Medina', region: 'Tennessee', country: 'USA', email: 'Paytonw680@outlook.com', lat: 35.4434, lng: -88.7162 },
  { name: 'Art4Hearts Miami, FL', leader: 'Melody Monge', location: 'Miami', region: 'Florida', country: 'USA', email: 'melodymonge902@gmail.com', lat: 25.7617, lng: -80.1918 },
  { name: 'Art4Hearts Frisco, TX', leader: 'Khyathi Motukuri', location: 'Frisco', region: 'Texas', country: 'USA', email: 'art4hearts.frisco@gmail.com', lat: 33.1506, lng: -96.8236 },
  { name: 'Art4Hearts Saddle River Day School', leader: 'Emma Ehrenkranz', location: 'Saddle River', region: 'New Jersey', country: 'USA', email: 'emma.ehrenkranz@icloud.com', lat: 40.9616, lng: -74.0352 },
  { name: 'Art4Hearts Webber Academy', leader: 'Kylah Meghani', location: 'Calgary', region: 'Alberta', country: 'Canada', email: 'art4heartswebber@gmail.com', lat: 51.0447, lng: -114.0719 },
  { name: 'Art4Hearts Saint Paul High School', leader: 'Ariana Soto', location: 'Santa Fe Springs', region: 'California', country: 'USA', email: 'ariana335024@gmail.com', lat: 33.9453, lng: -118.0951 },
  { name: 'Art4Hearts Irvine High School', leader: 'Iman Rizvi', location: 'Irvine', region: 'California', country: 'USA', email: 'arts4heartsihschapter@gmail.com', lat: 33.6846, lng: -117.8265 },
  { name: 'Art4Hearts Waxhaw, NC', leader: 'Shyna Jalota', location: 'Waxhaw', region: 'North Carolina', country: 'USA', email: 'shyna.jalota13@gmail.com', lat: 34.8797, lng: -80.7483 },
  { name: 'Art4Hearts Hinesville, Georgia', leader: 'Kamilah Perez-Concepcion', location: 'Hinesville', region: 'Georgia', country: 'USA', email: 'milahpc.09@gmail.com', lat: 31.8418, lng: -81.6200 },
  { name: 'Art4Hearts Strawberry Crest High School', leader: 'Nishita Moravineni', location: 'Shelby', region: 'North Carolina', country: 'USA', email: 'art4heartsschs@gmail.com', lat: 35.2790, lng: -81.6381 },
  { name: 'Art4Hearts Cary, NC', leader: 'Mackenzie Sanders', location: 'Cary', region: 'North Carolina', country: 'USA', email: 'Mackenzies0308@gmail.com', lat: 35.7915, lng: -78.7811 },
  { name: 'Art4Hearts Newfane High School', leader: 'Adalyn Shepard', location: 'Newfane', region: 'New York', country: 'USA', email: 'Adalyneshepard56@gmail.com', lat: 43.0530, lng: -78.8020 },
  { name: 'Art4Hearts Brooke Point High School', leader: 'Kanwal Naveed', location: 'Stafford', region: 'Virginia', country: 'USA', email: 'kanwalnaveed2010@icloud.com', lat: 38.4161, lng: -77.6706 },
  { name: 'Art4Hearts Bay City Western High School', leader: 'Autumn Lyons', location: 'Bay City', region: 'Michigan', country: 'USA', email: 'lyonsaut2028@bcschools.net', lat: 43.5891, lng: -83.8846 },
  { name: 'Art4Hearts Walnut', leader: 'Lyonn', location: 'Walnut', region: 'California', country: 'USA', email: 'art4heartswalnut@gmail.com', lat: 34.0105, lng: -117.8660 },
  { name: 'Art4Hearts Newark', leader: '', location: 'Newark', region: 'California', country: 'USA', email: 'art4heartnewark@gmail.com', lat: 37.5485, lng: -122.0363 },
  { name: 'Westlake High School', leader: 'Emma Kashyap', location: 'Westlake Village', region: 'California', country: 'USA', email: 'art4heartswhs@gmail.com', lat: 34.1438, lng: -118.8113 },
  { name: 'Art4Hearts North Garland High School', leader: '', location: 'Garland', region: 'Texas', country: 'USA', email: 'nghsarthearts@gmail.com', lat: 32.9126, lng: -96.6345 },
  { name: 'Art4Hearts Isaac Bear Early College High School', leader: 'Mackenzie Ryan', location: 'Wilmington', region: 'North Carolina', country: 'USA', email: 'art4heartsibechs@gmail.com', lat: 34.2257, lng: -77.9447 },
  { name: 'Art4Hearts Mission Oak High School', leader: 'Sparrow Silva', location: 'Tulare', region: 'California', country: 'USA', email: 'art4heartsMOHS@gmail.com', lat: 36.2417, lng: -119.3535 },
  { name: 'Art4Hearts Louis D Brandeis High School', leader: 'Angela Grace Aquino', location: 'San Antonio', region: 'Texas', country: 'USA', email: 'art4hearts.louisdbrandeishs@gmail.com', lat: 29.4241, lng: -98.4936 },
  { name: 'Art4Hearts Lakewood High School', leader: 'Ella Morgan', location: 'Lakewood', region: 'Colorado', country: 'USA', email: 'art4hearts.lakewoodhs@gmail.com', lat: 39.7139, lng: -105.0844 },
  { name: 'Art4Hearts Columbia', leader: 'Mackenna Maddox', location: 'Columbia', region: 'South Carolina', country: 'USA', email: 'art4heartscolumbia@gmail.com', lat: 34.0007, lng: -81.0348 },
  { name: 'Art4Hearts Salt Lake City', leader: '', location: 'Salt Lake City', region: 'Utah', country: 'USA', email: 'art4hearts.slc@gmail.com', lat: 40.7608, lng: -111.8910 },
  { name: 'Art4Hearts El Modena High School', leader: 'Sarah Dinh', location: 'Orange', region: 'California', country: 'USA', email: 'elmo.art4hearts@gmail.com', lat: 33.7879, lng: -117.8527 },
  { name: 'Art4Hearts Orlando', leader: '', location: 'Orlando', region: 'Florida', country: 'USA', email: 'art4hearts.orlando@gmail.com', lat: 28.5421, lng: -81.3723 },
  { name: 'Art4Hearts St. Mary\'s Preparatory High School', leader: 'Adelina', location: 'West Bloomfield', region: 'Michigan', country: 'USA', email: '', lat: 42.5419, lng: -83.4788 },
  { name: 'Art4Hearts Pasco High School', leader: 'Jenna Bragg', location: 'Pasco', region: 'Washington', country: 'USA', email: 'art4heartspasco@gmail.com', lat: 46.2396, lng: -119.1007 },
  { name: 'Art4Hearts 10th of Ramadan City', leader: 'Menna Esam', location: '10th of Ramadan City', region: 'Sharkya', country: 'Egypt', email: 'mennaabozahra2008@gmail.com', lat: 30.4850, lng: 31.4455 },
  { name: 'Art4Hearts King\'s College Alicante', leader: 'Alejandra Lín', location: 'Elche', region: 'Alicante', country: 'Spain', email: 'Alejandra.lin189@gmail.com', lat: 38.2688, lng: -0.6954 },
  { name: 'Art4Hearts Yangon, Myanmar', leader: 'Clara Zaw', location: 'Yangon', region: 'Yangon', country: 'Myanmar', email: 'clara.nguushweyizaw@gmail.com', lat: 16.8661, lng: 96.1951 },
  { name: 'Art4Hearts The Millennium School', leader: 'Aleena Ahmed', location: 'Dubai', region: 'Dubai', country: 'United Arab Emirates', email: 'Aleenaahmed063@gmail.com', lat: 25.2048, lng: 55.2708 },
  { name: 'Art4Hearts Athens', leader: 'Danae Lianantonaki', location: 'Athens', region: 'Attica', country: 'Greece', email: 'art4heartsathens@gmail.com', lat: 37.9838, lng: 23.7275 },
  { name: 'Art4Hearts Segamat', leader: 'Lee Jing', location: 'Segamat', region: 'Johor', country: 'Malaysia', email: 'art4hearts.segamat@gmail.com', lat: 2.7250, lng: 102.8125 }
];

// ChaptersMapEmbed Component
const ChaptersMapEmbed: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Only initialize if not already initialized
    if (mapInstanceRef.current) return;

    try {
      // Create map with default center (USA)
      const map = L.map(mapRef.current).setView([39.8283, -98.5795], 4);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Create custom heart icon
      const createHeartIcon = (isUSA: boolean) => {
        const color = isUSA ? '#8b5cf6' : '#ec4899'; // purple for USA, pink for international
        return L.divIcon({
          html: `<div style="
            width: 30px;
            height: 30px;
            background: ${color};
            border-radius: 50% 50% 0 0;
            transform: rotate(-45deg);
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          "></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          className: 'custom-marker'
        });
      };

      // Group chapters by coordinates to handle overlaps
      const markerGroups: { [key: string]: typeof chaptersData } = {};
      chaptersData.forEach(chapter => {
        const key = `${chapter.lat},${chapter.lng}`;
        if (!markerGroups[key]) {
          markerGroups[key] = [];
        }
        markerGroups[key].push(chapter);
      });

      // Add markers for each location group
      Object.entries(markerGroups).forEach(([coords, chapters]) => {
        const [lat, lng] = coords.split(',').map(Number);
        const isUSA = chapters[0].country === 'USA';
        
        const marker = L.marker([lat, lng], {
          icon: createHeartIcon(isUSA)
        }).addTo(map);

        // Create popup content - show all chapters at this location
        let popupContent = '';
        if (chapters.length === 1) {
          const chapter = chapters[0];
          popupContent = `
            <div style="font-family: 'Kollektif', sans-serif; font-size: 14px; max-width: 250px;">
              <strong>${chapter.name}</strong><br/>
              <strong>Location:</strong> ${chapter.location}, ${chapter.region}<br/>
              <strong>Country:</strong> ${chapter.country}<br/>
              ${chapter.leader ? `<strong>Leader:</strong> ${chapter.leader}<br/>` : ''}
              ${chapter.email ? `<strong>Email:</strong> ${chapter.email}` : ''}
            </div>
          `;
        } else {
          popupContent = `
            <div style="font-family: 'Kollektif', sans-serif; font-size: 14px; max-width: 250px;">
              <strong>${chapters.length} Chapters at this location:</strong><br/><br/>
              ${chapters.map(ch => `
                <strong>${ch.name}</strong><br/>
                ${ch.leader ? `Leader: ${ch.leader}<br/>` : ''}
                ${ch.email ? `Email: ${ch.email}<br/>` : ''}
                <br/>
              `).join('')}
            </div>
          `;
        }

        marker.bindPopup(popupContent);
      });

      mapInstanceRef.current = map;

      // Handle window resize for responsive map
      const handleResize = () => {
        if (mapInstanceRef.current) {
          setTimeout(() => mapInstanceRef.current?.invalidateSize(), 250);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, []);

  return <MapContainer ref={mapRef} />;
};

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'initiatives' | 'chapters' | 'volunteering'>('initiatives');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
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
              Contact Us
            </HeroButton>
          </HeroButtonGroup>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ marginTop: '1.5rem', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', fontWeight: 400 }}
          >
            Join our community dedicated to crafting meaningful items to translate warmth
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
          <img src="/Art4Hearts-Logo-NoBackground.png" alt="Art4Hearts Logo" />
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
          Learn more about our initiatives to bring kindness and love to hospitals, senior centers, and other charitable organizations.
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
              <h3>Initiatives</h3>
              <p>
                <strong>Art Therapy Kits:</strong> Through art therapy, we hope to spread warmth and bring comfort to the recipients of the kit. Recipients can engage with a creative outlet.
              </p>
              <InstructionButton 
                href="https://www.instagram.com/p/DMTzV_3PXf5/?img_index=5" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Instructions on Instagram →
              </InstructionButton>

              <p style={{marginTop: '2rem'}}>
                <strong>Bracelets:</strong> Make handmade bracelets for someone in need of care. These bracelets provide comfort and encouragement to those who receive them.
              </p>
              <InstructionButton 
                href="https://www.instagram.com/p/DMTzV_3PXf5/?img_index=1" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Instructions on Instagram →
              </InstructionButton>
            </div>
            <img className="content-image" src="/Art4Hearts-Logo-NoBackground.png" alt="Initiatives" />
          </ContentCard>
        )}

        {activeTab === 'chapters' && (
          <ContentCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3>Our Chapters</h3>
              <p>
                Discover our growing network of over 150 Art4Hearts chapters worldwide, where leaders of all ages are using art to uplift their communities across the globe!
              </p>
              <StyledLink to="/about/chapters">
                Explore More <span>→</span>
              </StyledLink>
            </div>
            <img className="content-image" src="/Art4Hearts-Logo-NoBackground.png" alt="Our Chapters" />
          </ContentCard>
        )}

        {activeTab === 'volunteering' && (
          <ContentCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3>Volunteering</h3>
              <p>
                Apply to be an Art4Hearts volunteer today to share art with those in need—no experience required! Enjoy the flexibility of remote volunteering while earning certified volunteer hours.
              </p>
              <StyledLink to="/get-involved">
                Explore More <span>→</span>
              </StyledLink>
            </div>
            <img className="content-image" src="/volunteering-packing.png" alt="Volunteering" />
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
            <h3>Become a Volunteer</h3>
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
            <h3>Apply to Become a Chapter</h3>
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
            <h3>Looking for a Kit or Bracelet?</h3>
            <p>If you're a hospital, senior center, or any charitable organization, we'd love to help!</p>
            <a href="https://art4hearts.onrender.com/contact" target="_blank" rel="noopener noreferrer">Contact Us</a>
          </Card>
        </CardGrid>
      </LightSection>

      {/* Gallery Section */}
      <GallerySection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Gallery
        </SectionTitle>
        <GalleryContentWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ width: '100%' }}
          >
            <GalleryCarousel 
              images={[
                '/gallery/572171669_17855370453555521_6099618948601915028_n.jpg',
                '/gallery/DSCF5420.jpg',
                '/gallery/DSCF5468.jpg',
                '/gallery/IMG_8906.jpg',
                '/gallery/club_rush_sept_5.jpg',
                '/gallery/image2.jpg',
              ]}
            />
          </motion.div>
          <GalleryButton
            as={Link}
            to="/gallery"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More →
          </GalleryButton>
        </GalleryContentWrapper>
      </GallerySection>

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

        <MapEmbedSection>
          <ChaptersMapEmbed />
        </MapEmbedSection>
      </WhiteSection>

      {/* FAQ Section */}
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
          Frequently Asked Questions
        </SectionTitle>
        <FAQContainer
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <FAQLeft>
            <FAQList>
              {homepageFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FAQItem
                    isActive={expandedFAQ === index}
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  >
                    <FAQQuestion isActive={expandedFAQ === index}>{faq.question}</FAQQuestion>
                    <FAQToggle isOpen={expandedFAQ === index}>●</FAQToggle>
                  </FAQItem>
                </motion.div>
              ))}
            </FAQList>
          </FAQLeft>

          <FAQRight
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {expandedFAQ !== null ? (
              <FAQAnswerDisplay
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <FAQAnswerTitle
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {homepageFAQs[expandedFAQ].question}
                </FAQAnswerTitle>
                <FAQAnswerText
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {homepageFAQs[expandedFAQ].answer}
                </FAQAnswerText>
              </FAQAnswerDisplay>
            ) : (
              <FAQPlaceholder
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span>❓</span>
                <p>Click a question to see the answer</p>
              </FAQPlaceholder>
            )}
            
            <motion.div
              style={{ marginTop: 'auto', paddingTop: '1.5rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FAQLink
                as={Link}
                to="/faqs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All FAQs →
              </FAQLink>
            </motion.div>
          </FAQRight>
        </FAQContainer>
      </WhiteSection>

      {/* Final CTA */}
      <CTASection
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
      </CTASection>
    </>
  );
};

export default Home;