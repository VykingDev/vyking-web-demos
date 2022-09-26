import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const Container = styled(Grid)`
  position: absolute;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding-left: 40px;
  padding-right: 20px;
  padding-bottom: 60px;

  margin-bottom: 40px;

  overflow-x: scroll;
  overflow-y: hidden;

  border-left: 4px solid white;
  border-right: 4px solid white;
  border-bottom: 4px solid white;

  z-index: 10;
  height: 300px;
`;
