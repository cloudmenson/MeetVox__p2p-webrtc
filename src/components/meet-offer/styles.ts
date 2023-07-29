import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) =>
    theme.responsive.isMobile &&
    css`
      flex-direction: column;
      justify-content: center;
    `};
`;

export const AboutMeetVox = styled.div`
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: start;

  ${({ theme }) =>
    theme.responsive.isMobile &&
    css`
      margin-left: 0;
      justify-content: center;
      text-align: center;
    `};
`;

export const Title = styled.h2`
  max-width: 500px;
  line-height: 45px;
  font-size: 40px;
  font-weight: 500;
`;

export const Content = styled.h3`
  max-width: 480px;
  margin-top: 25px;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
`;

export const CreateRoom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  ${({ theme }) =>
    theme.responsive.isMobile &&
    css`
      margin-top: 200px;
    `};
`;

export const RoomsTitle = styled.h2`
  line-height: 50px;
  font-size: 40px;
  font-weight: 500;
`;

export const RoomsList = styled.ul`
  margin: 20px 0;
  list-style-type: none;
`;

export const Room = styled.li`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RoomId = styled.span`
  margin-right: 20px;
`;

export const ParticlesPosition = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
