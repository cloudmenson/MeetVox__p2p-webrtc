import { css, createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 15px;

    ${({ theme }) => css`
      color: ${theme.colors.white};
      background: ${theme.colors.black};
    `}
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }

  button {
    background: none;
    color: ${({ theme }) => theme.colors.white};
    border: none;
    text-transform: uppercase;
    cursor: pointer
  }
`;
