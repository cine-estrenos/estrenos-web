import { createGlobalStyle } from 'styled-components';
import { rem } from 'polished';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-repeat: no-repeat;
  }

  html {
    word-break: break-word;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    min-height: 100vh;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    transition: all 400ms ease;
    background-color: ${(props) => props.theme.bg};
  }

  ul {
    list-style: none;
  }

  iframe {
    border: none;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  img {
    border: none;
    height: auto;
    max-width: 100%;
  }

  a,
  a:active,
  a:focus {
    text-decoration: none;
  }

  [hidden] {
    display: none;
  }

  [disabled] {
    cursor: not-allowed;
    pointer-events: none;
  }

  .container {
    width: 100%;
    margin: 0 auto;
    padding: 0 ${rem('20px')};
    max-width: ${rem('1240px')};
  }
`;
