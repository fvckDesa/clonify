import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, Noto, Oxygen-Sans,
      Ubuntu, Cantrell, "Helvetica Neue", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol";
  }

  html,
  body,
  #root {
    width: 100vw;
    height: 100vh;
  }
`;
