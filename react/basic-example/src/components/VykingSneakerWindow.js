import { useCallback, useEffect, useRef, useState } from "react";
import CameraActions from "./CameraActions";
import Catalogue from "./Catalogue";
import "./VykingSneakerWindow.css";

function VykingSneakerWindow({ config, targetOrigin, targetPath }) {
  const initialAccessoryUrl = "https://vykingsneakerkitnative.s3.amazonaws.com/SneakerStudio/may_android_ios/coach_citysole/offsets.json"
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingPreview, setShowingPreview] = useState(false);

  const vykingSneakerWindowRef = useRef(null);
  const imgPreviewRef = useRef(null);

  const postInitialConfig = useCallback(
    (clientWidth, clientHeight) => {
      let cameraWidth = 360;
      let cameraHeight = 640;
      if (clientWidth > clientHeight) {
        cameraWidth = 640;
        cameraHeight = 360;
      }

      if (vykingSneakerWindowRef.current !== null) {
        vykingSneakerWindowRef.current.contentWindow.postMessage(
          {
            type: "VYKING_SNEAKER_WINDOW_CONFIG",
            config,
            key: window.configKey,
            cameraWidth: cameraWidth,
            cameraHeight: cameraHeight,
            autoPlay: true,
            accessoryDescriptionUrl: initialAccessoryUrl
      }, targetOrigin);
    }
    },
    [config, vykingSneakerWindowRef,initialAccessoryUrl, targetOrigin]
  );

  const messageEventHandler = useCallback(
    (event) => {
      const eventData = event.data;
      const eventType = eventData && event.data.type;

      switch (eventType) {
        case "VYKING_SNEAKER_WINDOW_WAITING_FOR_CONFIG":
          postInitialConfig(640, 360);
          break;

        case "VYKING_SNEAKER_WINDOW_READY":
          setIsLoading(false);
          setIsReady(true);

          break;

        case "VYKING_SNEAKER_WINDOW_REPLACE_ACCESSORIES":
          if (eventData.complete === 1) {
            setIsLoading(false);
          }
          break;

        case "VYKING_SNEAKER_WINDOW_ARE_FEET_DETECTED":
          console.log(`Are feet detected: ${eventData.value}`);
          break;

        case "VYKING_SNEAKER_WINDOW_TAKE_PHOTO":
          setShowingPreview(true);
          if (imgPreviewRef.current) {
            imgPreviewRef.current.src = eventData.value.dataURL;
            imgPreviewRef.current.style.width = `${
              eventData.value.width / 4
            }px`;
            imgPreviewRef.current.style.height = `${
              eventData.value.height / 4
            }px`;
          }
          break;

        case "VYKING_SNEAKER_WINDOW_EXPIRY_TIME":
          console.info(
            `Licence expiry date: ${eventData.expiryTime.toString()}`
          );
          break;

        case "VYKING_SNEAKER_WINDOW_BUSY_ERROR":
          setIsLoading(false);
          break;

        // An error has occurred
        case "VYKING_SNEAKER_WINDOW_ERROR":
          setIsLoading(false);
          alert(`${eventData.requestType} ${eventData.value}`);
          break;

        default:
          break;
      }
    },
    [postInitialConfig]
  );

  useEffect(() => {
    function showPreview() {
      setTimeout(() => {
        setShowingPreview(false);
      }, 3000);
    }

    if (isShowingPreview) {
      showPreview();
    }
  }, [isShowingPreview]);

  useEffect(() => {
    window.addEventListener("message", messageEventHandler);
    return () => {
      window.removeEventListener("message", messageEventHandler);
    };
  }, [messageEventHandler]);

  const replaceAccessories = (accessoryDescriptionUrl) => {
    setIsLoading(true);
    if (vykingSneakerWindowRef.current !== null) {
      vykingSneakerWindowRef.current.contentWindow.postMessage(
        {
          type: "VYKING_SNEAKER_WINDOW_REPLACE_ACCESSORIES",
          accessoryDescriptionUrl,
        },
        targetOrigin
      );
    }
  };

  const takePhoto = () => {
    if (vykingSneakerWindowRef.current) {
      vykingSneakerWindowRef.current.contentWindow.postMessage(
        {
          type: "VYKING_SNEAKER_WINDOW_TAKE_PHOTO",
          toDataURL: {
            type: "image/jpeg",
            encoderOptions: 0.5,
          },
        },
        targetOrigin
      );
    }
  };

  const onPlay = () => {
    if (vykingSneakerWindowRef.current !== null) {
      vykingSneakerWindowRef.current.contentWindow.postMessage(
        {
          type: "VYKING_SNEAKER_WINDOW_PLAY",
        },
        targetOrigin
      );
    }
  };

  const onPause = () => {
    if (vykingSneakerWindowRef.current !== null) {
      vykingSneakerWindowRef.current.contentWindow.postMessage(
        {
          type: "VYKING_SNEAKER_WINDOW_PAUSE",
        },
        targetOrigin
      );
    }
  };

  return (
    <>
      <section className="feature">
        <CameraActions
          onPause={onPause}
          onPlay={onPlay}
          isReady={isReady}
          onReplaceAccessories={replaceAccessories}
        />
        <div className="vyking-sneaker-window-wrapper">
          {isLoading && (
            <div className="loader-image h-full">
              <img src={require("../assets/loader.gif")} alt="Loading..." />
            </div>
          )}
          <div
            className="vyking-sneaker-window-contents"
            style={{ visibility: isReady && !isLoading ? "visible" : "hidden" }}
          >
            <img
              ref={imgPreviewRef}
              className="photobtn"
              alt="preview"
              style={{ display: isShowingPreview ? "block" : "none" }}
            />
            <img
              onClick={takePhoto}
              className="photobtn"
              style={{
                display: isReady && !isShowingPreview ? "block" : "none",
              }}
              src={require("../assets/takePhoto.png")}
              alt="Take a pic"
              title="Take picture"
            />
            <iframe
              className="vyking-sneaker-window"
              name="vykingSneakerWindow"
              src={encodeURI(targetOrigin + targetPath)}
              ref={vykingSneakerWindowRef}
              title="Vyking Sneakerkit Window"
              allow="camera"
            >
              Try-on with webcam
            </iframe>
          </div>
        </div>
      </section>
      <Catalogue onCatalogueClick={replaceAccessories} />
    </>
  );
}

export default VykingSneakerWindow;
