import styled from "@emotion/styled";
import { Typography, Button, Grid } from "@mui/material";

export const Root = styled(Grid)`
  height: 94px;
  width: 100%;
  padding: 20px;
  border-left: 4px solid white;
  border-right: 4px solid white;
`;

export const HeaderText = styled(Typography)`
  font-family: Graphik;
  color: white;
  font-weight: 700;
`;

export const InfoText = styled(Typography)`
  font-family: Graphik;
  color: #b4b4b4;
  text-transform: uppercase;
  font-weight: 700;
`;

export const TryOnButton = styled(Button)`
  background-color: #ff6800;
  height: 46px;
  width: 100px;
  border-radius: 0;
`;

export const ButtonText = styled(Typography)`
  text-transform: uppercase;
  font-family: Graphik;
  font-size: 14px;
  color: black;
  font-weight: 700;
`;
