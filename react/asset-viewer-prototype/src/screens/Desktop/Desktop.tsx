import React from "react";
import { Stack, Typography } from "@mui/material";
import QRCode from "../../shared/images/qr_code.png";

export const Desktop = (): JSX.Element => {
  return (
    <Stack
      sx={{ height: "100vh", marginTop: "2.5%", width: "100vw", overflowY: "scroll" }}
      alignItems="center"
      direction="column"
      spacing={1}
    >
      <Typography
        sx={{
          color: "white",
          fontFamily: "Graphik",
          fontSize: "32px",
          fontWeight: 600,
        }}
      >
        Scan the code
      </Typography>
      <Typography
        sx={{
          color: "white",
          fontFamily: "Graphik",
          fontSize: "20px",
          fontWeight: 400,
          paddingBottom: "65px",
        }}
      >
        With your smartphone to experience our WebAR product
      </Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "6px",
            backgroundColor: "white",
            width: "100%",
            top: 200,
            position: "absolute",
          }}
        />
        <img
          src={QRCode}
          alt="scan this QR code on your mobile to get access to Vyking WebAR"
          style={{ position: "absolute", paddingBottom: "199px" }}
        />
      </div>
    </Stack>
  );
};
