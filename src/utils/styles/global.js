import { createGlobalStyle } from 'styled-components'
import { rem } from 'polished'

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
    line-height: 1.5;
    word-break: break-word;
    scroll-behavior: smooth;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    min-height: 100vh;
    overscroll-behavior: contain;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.bg};
  }

  body,
  svg {
    transition: all 400ms ease;
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
    padding: ${rem('20px')};
    max-width: ${rem('1280px')};
  }
`
