import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ShoeContext } from "../../../context/ShoeContext";
import { TARGET_ORIGIN } from "../../../config";
import { WindowMessage } from "../../../utils/vyking-ar/types";
import { PhotoData } from "../../../context/interfaces";
import { Container, AssetHolder, AssetIcon, PhotoTooltip } from "./Components";
import { Stack } from "@mui/material";

export const IconScroller = ({
  iframe,
  feetDetected,
}: {
  iframe: React.RefObject<HTMLIFrameElement>;
  feetDetected?: boolean;
}): JSX.Element => {
  const { shoes, currentShoe, setCurrentShoe, setShoePhoto, shoePhoto } =
    React.useContext(ShoeContext);

  React.useEffect(() => {
    window.addEventListener(
      "message",
      (
        event: MessageEvent<{
          type: WindowMessage;
          value?: PhotoData;
        }>
      ) => {
        if (event.data.type === WindowMessage.TakePhoto) {
          if (event.data.value?.dataURL) setShoePhoto(event.data.value);
        }
      }
    );
  }, [setShoePhoto]);

  React.useEffect(() => {
    iframe?.current?.contentWindow?.postMessage(
      {
        type: WindowMessage.ReplaceAccessories,
        accessoryDescriptionUrl: currentShoe.assets_url,
      },
      TARGET_ORIGIN
    );
  }, [currentShoe, iframe]);

  return (
    <Container shoePhoto={shoePhoto !== undefined}>
      <Swiper
        style={{ overflowY: "hidden" }}
        slidesPerView={3}
        centeredSlides={true}
        initialSlide={shoes.indexOf(currentShoe)}
        scrollbar={{ draggable: true }}
        onSlideChange={(e) => {
          setCurrentShoe(shoes[e.activeIndex]);
        }}
      >
        {shoes.map((shoe, index) => {
          const { image_url, id } = shoe;
          const selected = shoes.indexOf(currentShoe) === index;
          return (
            <SwiperSlide key={index}>
              <Stack alignItems="center">
                <PhotoTooltip selected={selected}>
                  Tap and take a picture
                </PhotoTooltip>
                <AssetHolder selected={selected}>
                  <AssetIcon
                    src={image_url}
                    shoeIndex={index}
                    id={`asset-${id}`}
                    onClick={() => {
                      if (selected) {
                        if (!feetDetected) {
                          return;
                        }

                        iframe.current?.contentWindow?.postMessage(
                          {
                            type: WindowMessage.TakePhoto,
                            toDataURL: {
                              type: "image/jpeg",
                              encoderOptions: 0.5,
                            },
                          },
                          TARGET_ORIGIN
                        );
                      } else {
                        if (
                          !iframe ||
                          !iframe.current ||
                          !iframe.current.contentWindow
                        ) {
                          console.error("no iframe");
                          return;
                        }

                        setShoePhoto(undefined);
                      }
                    }}
                  />
                </AssetHolder>
              </Stack>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};
