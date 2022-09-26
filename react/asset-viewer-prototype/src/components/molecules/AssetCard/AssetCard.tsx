import React from "react";
import { Grid } from "@mui/material";
import { Shoe } from "../../../context/interfaces";
import { ShoeContext } from "../../../context/ShoeContext";
import { Container, HeaderText, InfoText, ShoeImage } from "./Components";

export const AssetCard = ({
  shoe,
  id,
}: {
  shoe: Shoe;
  id: string;
}): JSX.Element => {
  const { currentShoe, setCurrentShoe } = React.useContext(ShoeContext);

  return (
    <Container
      id={id}
      onClick={() => setCurrentShoe(shoe)}
      selected={shoe === currentShoe}
    >
      <Grid
        style={{ height: "100%" }}
        container
        justifyContent="space-between"
        direction="column"
        alignItems="center"
      >
        <Grid
          container
          item
          xs={7}
          justifyContent="center"
          sx={{ padding: "10px" }}
        >
          <ShoeImage src={shoe.image_url} />
        </Grid>
        <Grid
          sx={{
            width: "100%",
            borderTop: "3px solid #b4b4b4",
            padding: "10px",
          }}
          item
          xs={4}
        >
          <HeaderText flexWrap="wrap">{shoe.name}</HeaderText>
          <InfoText flexWrap="wrap">{shoe.brand}</InfoText>
        </Grid>
      </Grid>
    </Container>
  );
};
