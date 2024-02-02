import { extendTheme } from "@chakra-ui/react";

export const lightTheme = extendTheme({
  colors: {
    Primary: {
      $100: "#EBF1FF",
      $200: "#3373CC",
      $300: "#264673",
    },
    Secondary: {
      $100: "#D9F2F2",
      $200: "#66CCCC",
    },
    Gray: {
      $100: "#FFFFFF",
      $200: "#F9FAFB",
      $300: "#F0F2F4",
      $400: "#E3E6E9",
      $500: "#C4CBD4",
      $600: "#8F97A3",
      $700: "#576375",
      $800: "#16191D",
    },
    Red: {
      $100: "#FCEEEE",
      $200: "#F7D4D4",
      $300: "#FF3333",
      $400: "#8A0F0F",
    },
    Yellow: {
      $100: "#FFFCEB",
      $200: "#FFF7CC",
      $300: "#FFD500",
      $400: "#977E00",
    },
    Green: {
      $100: "#EFFBF2",
      $200: "#D6F5DE",
      $300: "#33CC5A",
      $400: "#1F7A36",
    },
    Blue: {
      $100: "#EBF5FF",
      $200: "#CCE6FF",
      $300: "#0080FF",
      $400: "#004D99",
    },
  },

  fonts: {
    body: `'Inter', sans-serif`,
    heading: `'Inter', sans-serif`,
    mono: "Inter, sans-serif",
  },

  fontSizes: {
    D_lg: "96px",
    D_md: "64px",
    D_sm: "55px",
    D_xs: "44px",
    H_xxl: "40px",
    H_xl: "36px",
    H_lg: "32px",
    H_md: "28px",
    H_sm: "24px",
    H_xs: "20px",
    L_lg: "18px",
    L_md: "16px",
    L_sm: "14px",
    L_xs: "12px",
  },

  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },

  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  components: {
    Button: {},
  },
});

export const breakpoints = {
  desktop: 1440,
  notebook: 1280,
  tablet: 768,
  mobile: 320,
};
