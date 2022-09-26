import React from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const Root = styled(Grid)`
  height: 70px;
  width: 100%;
`;

const HeaderItem = styled(Grid)`
  border: 4px solid white;
`;

export const Header = (): JSX.Element => {
  const LogoUrl =
    "https://vyking-assets.s3.eu-central-1.amazonaws.com/viking_logo_white_RGB+1.png";

  return (
    <Root container>
      <HeaderItem item xs={2}></HeaderItem>
      <HeaderItem
        item
        xs={8}
        container
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: "5px" }}
      >
        <img src={LogoUrl} alt="Vyking Logo" />
      </HeaderItem>
      <HeaderItem item xs={2}></HeaderItem>
    </Root>
  );
};
