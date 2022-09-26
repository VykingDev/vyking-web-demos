import React from "react";
import { Grid } from "@mui/material";
import { ShoeContext } from "../../../context/ShoeContext";
import { useNavigate } from "react-router";
import {
  ButtonText,
  HeaderText,
  InfoText,
  Root,
  TryOnButton,
} from "./Components";

export const ShoeInfo = (): JSX.Element => {
  const { currentShoe } = React.useContext(ShoeContext);
  const navigate = useNavigate();

  return (
    <Root container justifyContent="center" alignItems="center">
      <Grid item xs={8}>
        <HeaderText>{currentShoe.name}</HeaderText>
        <InfoText>{currentShoe.brand}</InfoText>
      </Grid>
      <Grid item xs={4}>
        <TryOnButton>
          <ButtonText onClick={() => navigate(`/vyking-web-demo/camera`)}>Try On</ButtonText>
        </TryOnButton>
      </Grid>
    </Root>
  );
};
