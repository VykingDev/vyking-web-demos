import React from "react";
import styled from "@emotion/styled";
import { useSwiper } from "swiper/react";
import { css, keyframes } from "@emotion/react";

export const Container = styled.div`
  position: absolute;

  width: 100vw;
  height: 240px;

  display: flex;
  padding-bottom: 40px;

  z-index: 18;
  bottom: 0;

  display: ${({ shoePhoto }: { shoePhoto?: boolean }) =>
    shoePhoto ? "none" : "flex"};
`;

const fadeIn = keyframes`
	0%, 100% {
	  opacity: 0;
    display: none;
  }
  25% {
    opacity: 1;
  }
`;

export const PhotoTooltip = styled.div`
  background-color: white;
  padding: 7.5px;
  position: absolute;
  text-align: center;
  border-radius: 5px;
  background-color: rgba(35, 35, 35, 0.6);
  color: white;
  font-family: Graphik;
  font-size: 12px;
  line-height: 15px;

  animation: ${fadeIn} 6s linear forwards;
  -webkit-animation: ${fadeIn} 6s linear forwards;
  -moz-animation: ${fadeIn} 6s linear forwards;
  -o-animation: ${fadeIn} 6s linear forwards;
  -ms-animation: ${fadeIn} 6s linear forwards;

  display: ${({ selected }: { selected: boolean }) =>
    selected ? "flex" : "none"};
`;

export const AssetHolder = styled.div`
  width: 80px;
  height: 80px;

  margin-top: 60px;

  border: ${({ selected }: { selected: boolean }) =>
    selected ? "6px solid #FF6800" : "3px solid #232323"};

  border-radius: 80px;
  display: flex;
  align-items: center;

  background-color: white;
`;

const Icon = styled.img`
  object-fit: contain;
  width: 80px;
  height: 30px;
`;

export const AssetIcon = ({
  src,
  id,
  shoeIndex,
  onClick,
}: {
  src: string;
  id: string;
  shoeIndex: number;
  onClick: () => void;
}): JSX.Element => {
  const swiper = useSwiper();

  return (
    <Icon
      src={src}
      id={id}
      onClick={() => {
        swiper.slideTo(shoeIndex);

        onClick();
      }}
    />
  );
};
