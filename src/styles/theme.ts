import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#FF69B4',    // Hot Pink
    primaryLight: '#FF8DC7', // Lighter Pink
    primaryDark: '#D4578F', // Darker Pink
    secondary: '#51ABA7',  // Teal
    secondaryLight: '#6FC2BE',
    secondaryDark: '#3D817E',
    success: '#4CAF50',
    successLight: '#66BB6A',
    successDark: '#388E3C',
    error: '#F44336',
    errorLight: '#EF5350',
    errorDark: '#D32F2F',
    warning: '#FFA726',
    info: '#29B6F6',
    background: {
      dark: '#1A1A1A',      // Slightly softer black
      darker: '#121212',    // Dark background
      light: '#FFFFFF',
      glass: 'rgba(26, 26, 26, 0.8)', // For glass effect
      overlay: 'rgba(0, 0, 0, 0.7)',
      card: '#242424'       // Slightly lighter than dark
    },
    text: {
      light: '#FFFFFF',
      dark: '#1A1A1A',
      muted: '#9E9E9E',     // Muted text
      accent: '#FF69B4',    // Same as primary
      lightMuted: 'rgba(255, 255, 255, 0.7)'
    },
    border: '#2A2A2A',      // Subtle border color
    divider: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.2)',
    highlight: 'rgba(255, 105, 180, 0.1)' // Primary color with low opacity
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
    header: '64px'  // Added header spacing
  }
};

export default theme;