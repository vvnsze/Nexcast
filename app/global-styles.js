import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body,

  * {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Lato', 'sans-serif';

  }

  body.fontLoaded {
    font-family: 'Lato', 'sans-serif';
  }

  #app {
    background-color: #ffffff;
    min-width: 100vh;
  }

  p,
  label {
    font-family: 'Lato', sans-serif;
    line-height: 1.5em;
  }
`;
