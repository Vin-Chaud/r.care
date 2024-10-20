import { css } from "styled-components";

export const fadeIn = css`
  opacity: 0;
  animation: fadeIn 0.2s ease-in forwards;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
