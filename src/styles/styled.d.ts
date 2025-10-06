import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      error: string;
      background: {
        dark: string;
        darker: string;
        light: string;
      };
      text: {
        light: string;
        dark: string;
        accent: string;
      };
    };
    fonts: {
      title: string;
      body: string;
    };
    transitions: {
      slow: string;
      medium: string;
      fast: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
  }
}