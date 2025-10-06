import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Footer from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutContainer>
      <Navigation />
      <Main>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;