import styled from "@emotion/styled";
import { Card, Typography } from "@mui/material";

export const Container = styled(Card)`
  background-color: white;
  height: 200px;
  min-width: 150px;
  margin-right: 40px;
  border: 3px solid #b4b4b4;

  transition: transform 0.3s;
  transform: ${({ selected }: { selected: boolean }) =>
    selected ? "scale(1.1)" : "scale(1.0)"};
`;

export const ShoeImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const HeaderText = styled(Typography)`
  font-family: Graphik;
  color: #232323;
  margin-bottom: 0px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
`;

export const InfoText = styled(Typography)`
  font-family: Graphik;
  color: #8e796b;
  text-transform: uppercase;
  margin-top: 0px;
  text-align: center;
  font-weight: 700;
  font-size: 9px;
`;
