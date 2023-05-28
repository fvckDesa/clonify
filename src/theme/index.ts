import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      primaryBtn: string;
      secondaryBtn: string;
      accent: string;
    };
    playBtn: {
      sm: string;
      lg: string;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    primary: "#e8cfb1",
    secondary: "#151314",
    primaryBtn: "#f1be70",
    secondaryBtn: "#e7ceb0",
    accent: "#e07534",
  },
  playBtn: {
    sm: "48px",
    lg: "56px",
  },
};
