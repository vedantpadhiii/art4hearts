import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface AnnouncementBannerProps {
  onDismiss: () => void;
}

const Banner = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 3.25rem;
  padding: 0.55rem 3.5rem 0.55rem 1.25rem;
  background: #111827;
  color: #ffffff;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.18);
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.35;

  @media (max-width: 768px) {
    min-height: 4rem;
    padding: 0.55rem 3rem 0.55rem 0.85rem;
    font-size: 0.82rem;
  }
`;

const BannerLink = styled(Link)`
  color: #ffffff;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover,
  &:focus-visible {
    color: #c6dddc;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  transform: translateY(-50%);
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.18);
  }
`;

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onDismiss }) => (
  <Banner role="status" aria-label="Important announcement">
    <span>
      We are no longer accepting <strong>BRACELETS</strong> in our P.O. Box as of July 31, 2026.{' '}
      <BannerLink to="/faqs#po-box-faqs">More information in our FAQs →</BannerLink>
    </span>
    <CloseButton type="button" onClick={onDismiss} aria-label="Dismiss announcement">×</CloseButton>
  </Banner>
);

export default AnnouncementBanner;
