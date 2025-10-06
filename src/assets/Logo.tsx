import React from 'react';
import styled from 'styled-components';

const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoText = styled.span`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.5rem;
  color: currentColor;
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.text.light}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Logo: React.FC = () => (
  <LogoWrapper>
    <LogoImage src="/Art4Hearts logo.png" alt="Art4Hearts" />
    <LogoText>Art4Hearts</LogoText>
  </LogoWrapper>
);

export default Logo;