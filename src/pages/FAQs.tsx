import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import FAQCarousel from '../components/FAQCarousel';

const volunteerFAQs = [
  {
    question: "Can I volunteer if I'm not in the U.S.?",
    answer: "Yes, Art4Hearts is a global organization 🌍"
  },
  {
    question: "Can I volunteer if I'm not in high school?",
    answer: "Yes, anyone regardless of age can volunteer!"
  },
  {
    question: "I filled out the volunteer form but I never got a response",
    answer: "Upon registering, you will receive an email within 24 hours. If you do not, please email us at art4heartsorg@gmail.com or resubmit the volunteer registration and double check your email address. In addition, if your inbox is full, we are unable to reach you."
  }
];

const braceletsAndKitsFAQs = [
  {
    question: "What's the process for making bracelets?",
    answer: "1. Fill out the Volunteer Registration Form.\n2. Look over the Bracelets Service Hours Request Form so you know how to track time.\n3. Start making bracelets!\n4. Fill out the Bracelets Service Hours Request Form to log your hours."
  },
  {
    question: "How can I donate the bracelets and art therapy kits?",
    answer: "You can:\n1. Ship it to our P.O. Box Address found in the service request forms\n2. Donate it to your local charitable organization."
  },
  {
    question: "Do we always have to pay for the supplies and shipping?",
    answer: "You will have to pay for your supplies and postage. In the future, once we have more donation funds, we hope to provide financial aid."
  },
  {
    question: "What kind of bracelets do you accept?",
    answer: "We accept charm bracelets, any kind of beaded bracelets, crocheted bracelets, braided bracelets, and friendship/string bracelets.\n\nWe DO NOT accept rainbow loom bracelets. You may use jewelry glue and metal clasps if necessary."
  },
  {
    question: "How are hours measured?",
    answer: "Please keep track of the time you spend making your creations. Your volunteer hours will be based on the amount of time you self-report in the Bracelets Service Hours Request Form."
  }
];

const chaptersFAQs = [
  {
    question: "What is a chapter?",
    answer: "A chapter is a local branch of Art4Hearts led by a volunteer who wants to create a larger impact within their school or community.\n\nChapters organize initiatives such as bracelet-making and art therapy kit donations.\n\nBy starting a chapter, you'll recruit other volunteers, host events, and can serve local hospitals, senior centers, etc. You'll also keep your group organized and connected to our global Art4Hearts community."
  },
  {
    question: "What officers are needed in order to create a chapter?",
    answer: "Having a leadership team is helpful as it can facilitate club proceedings, but it is not required. We recommend appointing a president, vice president, secretary, & treasurer.\n\nAdditional officers can include a social media/outreach head."
  }
];

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background: ${props => props.theme.colors.background.dark};
`;

const HeroSection = styled.section`
  height: 50vh;
  min-height: 400px;
  background: url('/Art4Hearts Banner.png') center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  font-family: "Playfair Display", serif;
  color: ${props => props.theme.colors.text.light};
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(255, 93, 115, 0.3));
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: ${props => props.theme.colors.primary};
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

const ContactSection = styled.section`
  text-align: center;
  margin-top: 4rem;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text.light};
  margin-bottom: 1rem;
  font-family: "Playfair Display", serif;
`;

const ContactText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.light};
  line-height: 1.6;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primaryLight};
  }
`;

const FAQs: React.FC = () => {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Frequently Asked Questions</HeroTitle>
          <HeroSubtitle>Find answers to common questions about Art4Hearts</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentContainer>
        <FAQCarousel
          title="Volunteer FAQs"
          faqs={volunteerFAQs}
        />

        <FAQCarousel
          title="Bracelets & Kits FAQs"
          faqs={braceletsAndKitsFAQs}
        />

        <FAQCarousel
          title="Chapters FAQs"
          faqs={chaptersFAQs}
        />

        <ContactSection>
          <ContactTitle>Still have questions?</ContactTitle>
          <ContactText>
            We're here to help! Reach out to us at{' '}
            <ContactLink href="mailto:art4heartsorg@gmail.com">
              art4heartsorg@gmail.com
            </ContactLink>
          </ContactText>
        </ContactSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default FAQs;