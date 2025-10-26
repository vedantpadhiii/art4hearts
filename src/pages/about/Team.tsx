import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background: #ffffff;
  padding-top: 80px;

  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

const HeroSection = styled.section`
  height: 50vh;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #c6dddc 0%, #b3d4d2 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 0;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  color: #000000;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, #c6dddc, #b3d4d2);
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #000000;
  font-weight: 500;
  margin-top: 3rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TeamSection = styled.div`
  margin-bottom: 3rem;
`;

const TeamSectionTitle = styled.h2`
  display: none;
`;

const ContentSection = styled(motion.section)`
  width: 100%;
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
`;

const MemberCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  background: #fafafa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(198, 221, 220, 0.2);
  }
`;

const ImagePlaceholder = styled.div`
  width: 220px;
  height: 280px;
  background: linear-gradient(135deg, #c6dddc 0%, #b3d4d2 100%);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(198, 221, 220, 0.15);
  border: 2px solid rgba(198, 221, 220, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;

  ${MemberCard}:hover & {
    box-shadow: 0 12px 32px rgba(198, 221, 220, 0.25);
    border-color: rgba(198, 221, 220, 0.4);
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 200px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderText = styled.span`
  color: #f472b6;
  font-size: 0.9rem;
  text-align: center;
`;

const MemberName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NamesList = styled(motion.div)`
  display: none;
`;

const NameItem = styled(motion.div)`
  display: none;
`;

const NameItemText = styled.div`
  display: none;
`;

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0.3rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MemberRole = styled.p`
  font-size: 0.95rem;
  color: #000000;
  font-weight: 600;
  margin-bottom: 0.8rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const MemberBio = styled.p`
  font-size: 0.9rem;
  color: #666666;
  line-height: 1.5;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fbcfe8;
  color: #f472b6;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  font-size: 1.2rem;

  &:hover {
    background: #f472b6;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(244, 114, 182, 0.3);
  }
`;

const AltColorSection = styled(ContentSection)`
  display: none;
`;

const AltSectionTitle = styled.h1`
  display: none;
`;

const AltSectionDescription = styled.p`
  display: none;
`;

const AltHeadingUnderline = styled.div`
  display: none;
`;

const AltTeamSectionTitle = styled.h2`
  display: none;
`;

const AltNameItem = styled(NameItem)`
  display: none;
`;

const AltName = styled(Name)`
  display: none;
`;

const AltRole = styled(MemberRole)`
  display: none;
`;

const Team: React.FC = () => {
  const allTeamMembers = [
    { name: 'Grace Lin', image: '0684.jpg', role: 'Co-President', bio: 'Grace leads Art4Hearts with vision and compassion, driving the organization\'s mission forward.' },
    { name: 'Ruiyan Zhu', image: '0820.jpg', role: 'Co-President', bio: 'Ruiyan co-leads the organization with dedication to making art accessible to all.' },
    { name: 'Aidan Liu', image: '0382.jpg', role: 'Co-Vice President', bio: 'Aidan oversees chapter development and expansion across the nation.' },
    { name: 'Vedant Sinha', image: '0239.jpg', role: 'Co-Vice President', bio: 'Vedant supports the organization\'s strategic initiatives and chapter success.' },
    { name: 'Sophie Qi', image: '0151.jpg', role: 'Social Media Team', bio: 'Sophie creates engaging content that connects us with our community.' },
    { name: 'Sophie Qin', image: '0724.jpg', role: 'Secretary', bio: 'Sophie ensures our operations run smoothly and communications are clear.' },
    { name: 'Kathlyn Zhang', image: '0541.jpg', role: 'Social Media Team', bio: 'Kathlyn shares our impact and stories across social platforms.' },
    { name: 'Vedant Padhi', role: 'Website Manager', bio: 'Vedant builds our digital presence and keeps our community connected online.', linkedin: 'https://www.linkedin.com/in/vedant-padhi-51621a320' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <HeroOverlay />
        <HeroContent
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeroTitle>2025-2026 Team</HeroTitle>
          <HeroSubtitle>
            Meet our team of student leaders that make Art4Hearts possible.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Grid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {allTeamMembers.map((member, index) => (
            <MemberCard
              key={index}
              variants={itemVariants}
            >
              {member.image && (
                <ImagePlaceholder>
                  <img src={`/team/${member.image}`} alt={member.name} />
                </ImagePlaceholder>
              )}
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <MemberBio>{member.bio}</MemberBio>
              {member.linkedin && (
                <SocialLinks>
                  <SocialLink
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.84v8.37h2.84v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.84M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </SocialLink>
                </SocialLinks>
              )}
            </MemberCard>
          ))}
        </Grid>
      </ContentSection>
    </PageContainer>
  );
};

export default Team;