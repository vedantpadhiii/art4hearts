import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#ff73c5',    // Pink
    secondary: '#51aba7',  // Teal
    success: '#4CAF50',    // Green
    error: '#f44336',      // Red
    background: {
      dark: '#000000',
      darker: '#0A0A0A',
      light: '#ffffff'
    },
    text: {
      light: '#ffffff',
      dark: '#000000',
      accent: '#ff73c5'
    }
  },
  fonts: {
    title: 'TAN Nimbus, serif',
    body: 'Helvetica Neue, sans-serif'
  },
  transitions: {
    slow: '0.6s ease-in-out',
    medium: '0.4s ease-in-out',
    fast: '0.2s ease-in-out'
  },
  spacing: {
    small: '1rem',
    medium: '2rem',
    large: '4rem'
  }
};

export default theme;