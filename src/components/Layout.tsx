import React, { useState } from 'react';
import styled from 'styled-components';
import { Navigation } from './Navigation';
import Footer from './Footer';
import AnnouncementBanner from './AnnouncementBanner';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main<{ $hasAnnouncement: boolean }>`
  flex: 1;
  padding-top: ${props => props.$hasAnnouncement ? '3.25rem' : '0'};

  @media (max-width: 768px) {
    padding-top: ${props => props.$hasAnnouncement ? '4rem' : '0'};
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <LayoutContainer>
      {showAnnouncement && <AnnouncementBanner onDismiss={() => setShowAnnouncement(false)} />}
      <Navigation hasAnnouncement={showAnnouncement} />
      <Main $hasAnnouncement={showAnnouncement}>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
