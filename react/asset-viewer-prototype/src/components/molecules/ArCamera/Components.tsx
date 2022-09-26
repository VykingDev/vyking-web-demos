import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Close from "@mui/icons-material/Close";
import Share from "@mui/icons-material/ShareOutlined";

export const SnakerWindow = styled.div`
  & .vyking-sneaker-window {
    width: 100vw;
    height: 100vh;

    overflow: hidden;
    z-index: 15;
  }
`;

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;

  margin: -2px;

  -ms-overflow-style: none;
  scrollbar-width: none;
  scrollbar-width: none;
`;

export const Loader = styled.div`
  z-index: 100;
  width: 100vh;
  height: 100vh;
`;

export const CapturedPhoto = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;

  z-index: ${({ imageTaken }: { imageTaken: boolean }) =>
    imageTaken ? "16" : "-1"};

  display: ${({ imageTaken }: { imageTaken: boolean }) =>
    imageTaken ? "flex" : "none"};

  & img {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

export const BackIcon = styled(ArrowBackIosNewIcon)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 32px;
  height: 32px;
  color: white;
  z-index: 20;
  filter: drop-shadow(1px 1px 1px #232323);
`;

export const CloseIcon = styled(Close)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 48px;
  height: 48px;
  color: white;
  z-index: 20;
  filter: drop-shadow(1px 1px 1px #232323);
`;

export const ShareIcon = styled(Share)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 48px;
  height: 48px;
  color: white;
  z-index: 20;
  filter: drop-shadow(1px 1px 1px #232323);
`;

const flashAnimation = keyframes`
  from {
    opacity: 0.75;
  }

  to {
    opacity: 0;
  }
`;

export const Flash = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  background-color: #ffffff;
  z-index: 17;

  ${({ flash }: { flash?: boolean }) => {
    if (flash) {
      return css`
        animation: ${flashAnimation} 750ms ease-out;
      `;
    }
  }}
`;
