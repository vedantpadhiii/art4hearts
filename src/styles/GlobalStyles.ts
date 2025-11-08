import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Kollektif';
    src: url('../assets/fonts/Kollektif.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Kollektif';
    src: url('../assets/fonts/Kollektif-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Kollektif';
    src: url('../assets/fonts/Kollektif-Italic.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
  }
  @font-face {
    font-family: 'Kollektif';
    src: url('../assets/fonts/Kollektif-BoldItalic.ttf') format('truetype');
    font-weight: bold;
    font-style: italic;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${props => props.theme.fonts.body} !important; /* Force Kollektif everywhere */
  }

  body, html, #root {
    font-family: ${props => props.theme.fonts.body} !important; /* Force Kollektif everywhere */
    background: ${props => props.theme.colors.background.dark};
    color: ${props => props.theme.colors.text.light};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.title}; /* Keep TAN Nimbus for headers */
  }

  p, span, li, td, th, label, input, textarea, button, a, div, article, section, nav {
    font-family: ${props => props.theme.fonts.body}; /* Kollektif for everything else */
  }
`;

export default GlobalStyles;
