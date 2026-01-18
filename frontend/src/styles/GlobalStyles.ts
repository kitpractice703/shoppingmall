import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Helvetica Neue', 'Arial', sans-serif;
    background-color: #fff;
    color: #333;
    line-height: 1.6;
  }

  a { text-decoration: none; color: inherit; }
  ul { list-style: none; }
`;

// 반응형 기준점 (Mobile, Tablet)
export const device = {
  mobile: `(max-width: 768px)`,
  tablet: `(max-width: 1024px)`,
};
