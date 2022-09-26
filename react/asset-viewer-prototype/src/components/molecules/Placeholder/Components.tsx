import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
	0% {
	opacity: 0;
  }
  100% {
	opacity: 1;
  }
`;

export const FeetPlaceholder = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 9;
  display: flex;
  justify-content: center;

  & .place-feet {
    position: relative;

    animation: ${fadeIn} 3s;
    -webkit-animation: ${fadeIn} 3s;
    -moz-animation: ${fadeIn} 3s;
    -o-animation: ${fadeIn} 3s;
    -ms-animation: ${fadeIn} 3s;
    margin-top: 25%;
    width: 250px;
    height: 400px;
    z-index: 10;
  }

  & .is-loading {
    position: relative;
    animation: ${fadeIn} 3s;
    -webkit-animation: ${fadeIn} 3s;
    -moz-animation: ${fadeIn} 3s;
    -o-animation: ${fadeIn} 3s;
    -ms-animation: ${fadeIn} 3s;

    z-index: 10;
    margin-top: 300px;
    height: 50px;
    width: 50px;
  }
`;
