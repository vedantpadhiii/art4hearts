import React from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from './AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

interface BannerProps {
  title: string;
  subtitle?: string;
  background?: string;
  overlay?: boolean;
  children?: React.ReactNode;
  height?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const BannerWrapper = styled.div<{ $height?: string; $background?: string }>`
  position: relative;
  width: 100%;
  height: ${props => props.$height || '60vh'};
  min-height: 400px;
  background: ${props => props.$background ? `url(${props.$background})` : props.theme.colors.background.darker};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.header};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.5)
  );
`;

const Content = styled.div<{ $textAlign?: 'left' | 'center' | 'right' }>`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
  text-align: ${props => props.$textAlign || 'center'};
  color: ${props => props.theme.colors.text.light};
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-family: ${props => props.theme.fonts.title};
  margin-bottom: ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.primary};
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  max-width: 800px;
  margin: ${props => props.theme.spacing.medium} auto;
  line-height: 1.6;
  opacity: 0.9;
`;

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  background,
  overlay = true,
  children,
  height,
  textAlign = 'center'
}) => {
  return (
    <BannerWrapper $height={height} $background={background}>
      {overlay && <Overlay />}
      <Content $textAlign={textAlign}>
        <AnimatedSection animation="fadeUp" delay={0.2}>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {children}
        </AnimatedSection>
      </Content>
    </BannerWrapper>
  );
};

export default Banner;