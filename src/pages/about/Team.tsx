import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background: #fdf2f8;
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
  background: #fce7f3;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #fbcfe833 0%, #f472b633 50%, #ec4899 33 100%);
    z-index: 0;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.9) 100%
  );
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  color: #be185d;
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
    background: linear-gradient(90deg, #f472b6, #ec4899);
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #be185d;
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
  font-size: 1.6rem;
  font-weight: 600;
  color: #be185d;
  margin-bottom: 2rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(244, 114, 182, 0.2);

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
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

  &:hover {
    transform: translateY(-8px);
  }
`;

const ImagePlaceholder = styled.div`
  width: 220px;
  height: 280px;
  background: linear-gradient(135deg, #fbcfe8 0%, #fce7f3 100%);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(244, 114, 182, 0.12);
  border: 2px solid rgba(244, 114, 182, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;

  ${MemberCard}:hover & {
    box-shadow: 0 16px 40px rgba(244, 114, 182, 0.2);
    border-color: rgba(244, 114, 182, 0.3);
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
  color: #be185d;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NamesList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const NameItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.08);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);

  &:hover {
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
    transform: translateY(-4px);
  }
`;

const NameItemText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #be185d;
  margin-bottom: 0.3rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MemberRole = styled.p`
  font-size: 0.95rem;
  color: #f472b6;
  font-weight: 500;

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
  background: linear-gradient(135deg, #f0fdfa 0%, #f0fdf4 100%);
`;

const AltSectionTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #059669;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const AltSectionDescription = styled.p`
  font-size: 1.1rem;
  color: #10b981;
  max-width: 600px;
  margin: 0 auto 0;
  line-height: 1.6;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AltHeadingUnderline = styled.div`
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, #6ee7b7 0%, #10b981 50%, #059669 100%);
  border-radius: 2px;
  margin: 1.5rem auto 0;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
`;

const AltTeamSectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: #059669;
  margin-bottom: 2rem;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(16, 185, 129, 0.2);

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const AltNameItem = styled(NameItem)`
  background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.08);

  &:hover {
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15);
  }
`;

const AltName = styled(Name)`
  color: #059669;
`;

const AltRole = styled(MemberRole)`
  color: #10b981;
`;

const Team: React.FC = () => {
  const executiveDirectors = [
    { name: 'Grace Lin', image: '0684.jpg' },
    { name: 'Ruiyan Zhu', image: '0820.jpg' }
  ];

  const chapterDirectors = [
    { name: 'Aidan Liu', image: '0382.jpg' },
    { name: 'Vedant Sinha', image: '0239.jpg' }
  ];

  const socialMediaTeam = [
    { name: 'Sophie Qi', image: '0151.jpg' },
    { name: 'Sophie Qin', image: '0724.jpg' },
    { name: 'Kathlyn Zhang', image: '0541.jpg' }
  ];

  const websiteManager = [
    { name: 'Vedant Padhi', image: '0709.jpg', linkedin: 'https://www.linkedin.com/in/vedant-padhi-51621a320' }
  ];

  const officers = [
    { name: 'Grace Lin', role: 'Co-President' },
    { name: 'Ruiyan Zhu', role: 'Co-President' },
    { name: 'Aidan Liu', role: 'Co-Vice President' },
    { name: 'Vedant Sinha', role: 'Co-Vice President' },
    { name: 'Sophie Qin', role: 'Secretary' },
    { name: 'Soumya Katkere', role: 'Treasurer' }
  ];

  const outreachTeam = [
    { name: 'Arian Loftizadeh', role: 'Outreach Team' },
    { name: 'Carter Wilson', role: 'Outreach Team' }
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

        {/* Executive Directors */}
        <TeamSection>
          <TeamSectionTitle>Executive Directors</TeamSectionTitle>
          <Grid
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {executiveDirectors.map((member, index) => (
              <MemberCard
                key={index}
                variants={itemVariants}
              >
                <ImagePlaceholder>
                  {member.image ? (
                    <img src={`/team/${member.image}`} alt={member.name} />
                  ) : (
                    <PlaceholderText>Image</PlaceholderText>
                  )}
                </ImagePlaceholder>
                <MemberName>{member.name}</MemberName>
              </MemberCard>
            ))}
          </Grid>
        </TeamSection>

        {/* Chapter Directors */}
        <TeamSection>
          <TeamSectionTitle>Chapter Directors</TeamSectionTitle>
          <Grid
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {chapterDirectors.map((member, index) => (
              <MemberCard
                key={index}
                variants={itemVariants}
              >
                <ImagePlaceholder>
                  {member.image ? (
                    <img src={`/team/${member.image}`} alt={member.name} />
                  ) : (
                    <PlaceholderText>Image</PlaceholderText>
                  )}
                </ImagePlaceholder>
                <MemberName>{member.name}</MemberName>
              </MemberCard>
            ))}
          </Grid>
        </TeamSection>

        {/* Social Media Team */}
        <TeamSection>
          <TeamSectionTitle>Social Media Team</TeamSectionTitle>
          <Grid
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {socialMediaTeam.map((member, index) => (
              <MemberCard
                key={index}
                variants={itemVariants}
              >
                <ImagePlaceholder>
                  {member.image ? (
                    <img src={`/team/${member.image}`} alt={member.name} />
                  ) : (
                    <PlaceholderText>Image</PlaceholderText>
                  )}
                </ImagePlaceholder>
                <MemberName>{member.name}</MemberName>
              </MemberCard>
            ))}
          </Grid>
        </TeamSection>

        {/* Website Manager */}
        <TeamSection>
          <TeamSectionTitle>Website Manager</TeamSectionTitle>
          <Grid
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {websiteManager.map((member, index) => (
              <MemberCard
                key={index}
                variants={itemVariants}
              >
                <ImagePlaceholder>
                  {member.image ? (
                    <img src={`/team/${member.image}`} alt={member.name} />
                  ) : (
                    <PlaceholderText>Image</PlaceholderText>
                  )}
                </ImagePlaceholder>
                <MemberName>{member.name}</MemberName>
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
        </TeamSection>
      </ContentSection>

      {/* Saratoga Chapter Section */}
      <AltColorSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <AltSectionTitle>2025-2026 Saratoga High School Chapter Team</AltSectionTitle>
          <AltHeadingUnderline style={{ margin: '1.5rem auto 0' }} />
          <AltSectionDescription style={{ marginTop: '2rem' }}>
            Meet the officers for the Art4Hearts Saratoga High School chapter, the first Art4Hearts chapter.
          </AltSectionDescription>
        </div>

        {/* Officers */}
        <TeamSection>
          <AltTeamSectionTitle>Officers</AltTeamSectionTitle>
          <NamesList
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {officers.map((member, index) => (
              <AltNameItem
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
              >
                <NameItemText>
                  <AltName>{member.name}</AltName>
                  <AltRole>{member.role}</AltRole>
                </NameItemText>
              </AltNameItem>
            ))}
          </NamesList>
        </TeamSection>

        {/* Outreach Team */}
        <TeamSection>
          <AltTeamSectionTitle>Outreach Team</AltTeamSectionTitle>
          <NamesList
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {outreachTeam.map((member, index) => (
              <AltNameItem
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
              >
                <NameItemText>
                  <AltName>{member.name}</AltName>
                  <AltRole>{member.role}</AltRole>
                </NameItemText>
              </AltNameItem>
            ))}
          </NamesList>
        </TeamSection>
      </AltColorSection>
    </PageContainer>
  );
};

export default Team;