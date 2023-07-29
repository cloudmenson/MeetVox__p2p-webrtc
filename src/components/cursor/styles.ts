import styled from "styled-components";

export const CustomCursor = styled.div`
  position: fixed;
  width: 16px;
  height: 16px;
  background-color: #000;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
`;
