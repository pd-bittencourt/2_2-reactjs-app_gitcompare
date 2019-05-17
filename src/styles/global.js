import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    &::after,
    &::before {
      box-sizing: border-box;
    }
  }
  body {
    color: #1d2129;
    background: #e9ebee;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
  }

`;

export default GlobalStyle;
