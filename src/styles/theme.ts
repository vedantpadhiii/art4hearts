import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#FF9FB6',    // Soft Pink
    primaryLight: '#FFCCD5', // Lighter Pink
    primaryDark: '#FF8BA7', // Slightly Darker Pink
    secondary: '#C6DBDA',  // Mint Green (from logo)
    secondaryLight: '#E3EEEE', // Lighter Mint
    secondaryDark: '#A8C7C5', // Darker Mint
    success: '#98D8B4',    // Soft Green
    successLight: '#BFE5D0',
    successDark: '#75C49B',
    error: '#FFB5B5',      // Soft Red
    errorLight: '#FFD1D1',
    errorDark: '#FF9B9B',
    warning: '#FFE1B5',    // Soft Orange
    info: '#B5E2FF',       // Soft Blue
    background: {
      dark: '#F7F9F9',     // Very Light Mint
      darker: '#E8EFEF',   // Slightly Darker Light Mint
      light: '#FFFFFF',
      glass: 'rgba(255, 255, 255, 0.9)', // Light glass effect
      overlay: 'rgba(198, 219, 218, 0.7)', // Mint overlay
      card: '#FFFFFF'      // White cards
    },
    text: {
      light: '#FFFFFF',
      dark: '#4A5D5C',     // Deep Mint
      muted: '#8AA6A5',    // Muted Mint
      accent: '#FF9FB6',   // Soft Pink
      lightMuted: 'rgba(74, 93, 92, 0.7)' // Transparent Deep Mint
    },
    border: '#E3EEEE',     // Light Mint Border
    divider: 'rgba(198, 219, 218, 0.3)', // Transparent Mint
    shadow: 'rgba(166, 189, 188, 0.15)', // Soft Mint Shadow
    highlight: 'rgba(255, 159, 182, 0.1)' // Soft Pink Highlight
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
    large: '4rem',
    xlarge: '6rem',
    xxlarge: '8rem',
    xxxlarge: '10rem',
    header: '64px'
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
    xxxlarge: '3rem'
  },
  borderRadii: {
    small: '4px',
    medium: '8px',
    large: '16px',
    full: '9999px'
  }
};

export default theme;