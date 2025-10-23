import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import AppRoutes from './AppRoutes';
import { ScrollProvider } from './context/ScrollContext';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ScrollProvider>
          <ScrollToTop />
          <AppRoutes />
        </ScrollProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;