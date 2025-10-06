import React from 'react';
import styled from 'styled-components';

const MissionWrapper = styled.section`
  padding: 6rem 2rem;
  background: #000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  min-height: 50vh;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #FF1493, transparent);
  }
`;

const Title = styled.h2`
  font-size: 4rem;
  color: #fff;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  margin-bottom: 2rem;
  position: relative;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #fff;
  max-width: 900px;
  line-height: 1.8;
  margin: 0 auto;
  opacity: 0.9;
`;

const MissionStatement: React.FC = () => {
  return (
    <MissionWrapper>
      <Title>OUR MISSION</Title>
      <Description>
        Art4Hearts is a youth-led nonprofit spreading creativity and comfort through crafting personalized art therapy kits, 
        leading art workshops, and handmaking bracelets with uplifting messages to brighten the lives of communities we serve.
      </Description>
    </MissionWrapper>
  );
};

export default MissionStatement;