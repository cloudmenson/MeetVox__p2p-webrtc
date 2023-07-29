import styled from "styled-components";

export const Button = styled.button`
  padding: 15px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 5px;
`;

export const Icon = styled.span`
  width: 20px;
  height: 20px;
`;
