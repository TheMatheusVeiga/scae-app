import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* overflow-x: hidden; */
}

  body{
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
    font-family: 'Roboto', sans-serif !important;
    line-height: 1.6;
  }

  #root{
    height: 100vh;
  }
`;
export default GlobalStyles;
