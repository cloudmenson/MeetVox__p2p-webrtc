import { css, createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    ${({ theme }) => css`
      color: ${theme.colors.black};
      background: ${theme.colors.white};
    `}
  }
`;
