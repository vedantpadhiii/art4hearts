import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'TAN Nimbus';
    src: url('../assets/fonts/TAN-Nimbus.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @import url('https://fonts.googleapis.com/css2?family=Kollektif:wght@400&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    background: ${props => props.theme.colors.background.dark};
    color: ${props => props.theme.colors.text.light};
    font-family: ${props => props.theme.fonts.body};
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    line-height: 1.5;
    overflow-x: hidden;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p, span, li, td, th, label, input, textarea, button, a, div, article, section, nav {
    font-family: ${props => props.theme.fonts.body};
    font-weight: normal;
    font-style: normal;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.title};
    font-weight: normal;
    font-style: normal;
    letter-spacing: -0.02em;
    line-height: 0.9;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;