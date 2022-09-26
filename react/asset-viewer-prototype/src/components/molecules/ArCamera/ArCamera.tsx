import React from "react";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import { IconScroller } from "../IconScroller";
import { initializeVykingAR, vykingArOptions } from "../../../utils/vyking-ar";
import { WindowMessage } from "../../../utils/vyking-ar/types";
import { ShoeContext } from "../../../context/ShoeContext";
import VykingLogo from "../../../shared/images/vyking-logo.png";
import { Placeholder } from "../";
import {
  BackIcon,
  CapturedPhoto,
  CloseIcon,
  Container,
  Flash,
  Loader,
  ShareIcon,
  SnakerWindow,
} from "./Components";
import { GenerateShoeImage } from "./Generator";

type ArCameraProps = {
  options: vykingArOptions;
};

export const ArCamera = ({ options }: ArCameraProps): JSX.Element => {
  const { shoes, currentShoe, shoePhoto, setShoePhoto } =
    React.useContext(ShoeContext);
  const [feetDetected, setFeetDetected] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const iframe = React.useRef<HTMLIFrameElement>(null);
  const loader = React.useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { cameraIframe } = options;

  React.useEffect(() => {
    if (!currentShoe) {
      navigate("/");
      return;
    }

    initializeVykingAR({
      loader: loader.current,
      iframe: iframe.current,
      targetPath: cameraIframe
        ? "/1/index.html"
        : "/flex/2/v2.0.0-23-g228f80d/index.html",
      selectedAccessories: currentShoe.assets_url,
      imgFile: "",
      options: {
        cameraIframe,
      },
    });

    window.addEventListener(
      "message",
      (event: MessageEvent<{ type: WindowMessage; value: boolean }>) => {
        if (event.data.type === WindowMessage.FeetDetected) {
          setFeetDetected(event.data.value);
        }

        if (event.data.type === WindowMessage.WindowReady) {
          setIsLoading(false);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraIframe, navigate, options, shoes]);

  return (
    <Container>
      <Flash flash={shoePhoto !== undefined} />
      {shoePhoto ? (
        <>
          <CloseIcon
            onClick={() => setShoePhoto(undefined)}
            sx={{ textShadow: 3 }}
          />
          <ShareIcon
            onClick={async () => await GenerateShoeImage({ shoePhoto })}
          />
        </>
      ) : (
        <BackIcon onClick={() => navigate("/")} />
      )}

      <Placeholder feetDetected={feetDetected} isLoading={isLoading} />

      <CapturedPhoto imageTaken={shoePhoto !== undefined}>
        {shoePhoto && (
          <>
            <img src={shoePhoto.dataURL} alt="the shoe currently being worn" />
            <img
              src={VykingLogo}
              alt="Vyking logo"
              style={{
                zIndex: 999,
                position: "absolute",
                bottom: 0,
                right: 10,
                height: 90,
                width: 200,
              }}
            />
          </>
        )}
      </CapturedPhoto>
      <SnakerWindow>
        <iframe
          ref={iframe}
          className="vyking-sneaker-window"
          id="vyking-sneaker-window"
          title="Sneakerkit Window"
          allow="camera"
        ></iframe>
      </SnakerWindow>
      <Loader ref={loader} className="loader">
        <Typography sx={{ color: "white" }}>Loader</Typography>
      </Loader>

      <IconScroller feetDetected={feetDetected} iframe={iframe} />
    </Container>
  );
};
