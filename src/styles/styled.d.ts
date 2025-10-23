import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;
      primaryDark: string;
      secondary: string;
      secondaryLight: string;
      secondaryDark: string;
      success: string;
      successLight: string;
      successDark: string;
      error: string;
      errorLight: string;
      errorDark: string;
      warning: string;
      info: string;
      background: {
        dark: string;
        darker: string;
        light: string;
        glass: string;
        overlay: string;
        card: string;
      };
      text: {
        light: string;
        dark: string;
        muted: string;
        accent: string;
        lightMuted: string;
      };
      border: string;
      divider: string;
      shadow: string;
      highlight: string;
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
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
      header: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
    };
    borderRadii: {
      small: string;
      medium: string;
      large: string;
      full: string;
    };
  }
}