import { TARGET_ORIGIN } from "../../config";

/* eslint-disable no-console */
export type vykingArOptions = {
  handleFeetDetection?: (feetDetected: boolean) => void;
  pictureIframe?: boolean;
  cameraIframe?: boolean;
};

interface vykingArArgs {
  iframe: any;
  loader: any;
  imgFile: any;
  targetPath: string;
  options: vykingArOptions;
  selectedAccessories: string;
}

const configUri =
  "https://vykingsneakerkitnative.s3.amazonaws.com/vyking-bin/modeld.bin";

const configKey = "io.vyking";

const targetOrigin = TARGET_ORIGIN;

async function initializeVykingAR({
  iframe,
  imgFile,
  loader,
  targetPath,
  options,
  selectedAccessories,
}: vykingArArgs): Promise<void> {
  const { handleFeetDetection, pictureIframe, cameraIframe } = options;
  let feetDetected = false;

  async function getConfig(uri: string) {
    const response = await fetch(encodeURI(uri));
    if (!response.ok) {
      throw new Error(
        `Failed to load configuration from ${configUri}. Status: ${response.status}`
      );
    }

    return response.arrayBuffer();
  }

  function showLoader(): void {
    loader.style.visibility = "visible";
  }

  function hideLoader(): void {
    loader.style.visibility = "hidden";
  }

  function postConfig(
    config: ArrayBuffer,
    clientWidth: number,
    clientHeight: number
  ) {
    let cameraWidth = 360;
    let cameraHeight = 640;
    if (clientWidth > clientHeight) {
      cameraWidth = 640;
      cameraHeight = 360;
    }

    iframe.contentWindow.postMessage(
      {
        type: "VYKING_SNEAKER_WINDOW_CONFIG",
        config: config,
        key: configKey,
        cameraWidth: cameraWidth,
        cameraHeight: cameraHeight,
        autoPlay: true,
      },
      targetOrigin
    );
  }

  function replaceAccessories(uri: string) {
    iframe.contentWindow.postMessage(
      {
        type: "VYKING_SNEAKER_WINDOW_REPLACE_ACCESSORIES",
        accessoryDescriptionUrl: uri,
      },
      targetOrigin
    );
  }

  function postIframeMessage(message: any, transfer?: any) {
    iframe.contentWindow.postMessage(message, targetOrigin, transfer);
  }

  function startImage() {
    showLoader();
    createImageBitmap(imgFile as File).then((imageBitmap: any) => {
      postIframeMessage(
        {
          type: "VYKING_SNEAKER_WINDOW_START",
          imageBitmap: imageBitmap,
        },
        [imageBitmap]
      );

      imageBitmap.close();
    });
  }

  function pictureMessageHandler(event: MessageEvent, config: ArrayBuffer) {
    const { data } = event;

    switch (data.type) {
      case "VYKING_SNEAKER_WINDOW_WAITING_FOR_CONFIG":
        postConfig(config, window.innerWidth, window.innerHeight);
        break;
      case "VYKING_SNEAKER_WINDOW_EXPIRY_TIME":
        console.info(`Licence expiry date: ${data.expiryTime.toString()}`);
        if (
          data.expiryTime.getTime() - new Date().getTime() <
          1 * 24 * 60 * 60 * 1000
        ) {
          console.error(`Expired on ${data.expiryTime.toString()}`);
          fetch(configUri, {
            method: "GET",
            cache: "reload",
          });
        }
        break;
      case "VYKING_SNEAKER_WINDOW_READY":
        startImage();
        break;
      case "VYKING_SNEAKER_WINDOW_START":
        replaceAccessories(selectedAccessories);
        break;
      case "VYKING_SNEAKER_WINDOW_FINISH":
        hideLoader();
        break;
      case "VYKING_SNEAKER_WINDOW_REPLACE_ACCESSORY_TEXTURES":
        if (data.complete === 1) {
          hideLoader();
        }
        break;
      case "VYKING_SNEAKER_WINDOW_ARE_FEET_DETECTED":
        feetDetected = true;
        handleFeetDetection && handleFeetDetection(feetDetected);
        break;
      case "VYKING_SNEAKER_WINDOW_BUSY_ERROR":
        hideLoader();
        break;
      case "VYKING_SNEAKER_WINDOW_ERROR":
        hideLoader();
        console.error(`${data.requestType} ${data.value}`);
        break;
    }
  }

  function cameraMessageHandler(event: MessageEvent, config: ArrayBuffer) {
    const { data } = event;

    switch (data.type) {
      case "VYKING_SNEAKER_WINDOW_WAITING_FOR_CONFIG":
        postConfig(config, window.innerWidth, window.innerHeight);
        break;
      case "VYKING_SNEAKER_WINDOW_EXPIRY_TIME":
        console.info(`Licence expiry date: ${data.expiryTime.toString()}`);
        if (
          data.expiryTime.getTime() - new Date().getTime() <
          1 * 24 * 60 * 60 * 1000
        ) {
          console.error(`Expired on ${data.expiryTime.toString()}`);
          fetch(configUri, {
            method: "GET",
            cache: "reload",
          });
        }
        break;
      case "VYKING_SNEAKER_WINDOW_READY":
        replaceAccessories(selectedAccessories);
        break;
      case "VYKING_SNEAKER_WINDOW_REPLACE_ACCESSORIES":
        if (data.complete === 1) {
          hideLoader();
        }
        break;
      case "VYKING_SNEAKER_WINDOW_BUSY_ERROR":
        hideLoader();
        break;
      case "VYKING_SNEAKER_WINDOW_ERROR":
        hideLoader();
        console.error(`${data.requestType} ${data.value}`);
        break;
    }
  }

  function main(config: ArrayBuffer) {
    const targetUri = targetOrigin + targetPath;
    window.onmessage = null;

    if (pictureIframe) {
      window.onmessage = (e: MessageEvent) => {
        pictureMessageHandler(e, config);
      };
    }
    if (cameraIframe) {
      window.onblur = () => {
        pause();
      };
      window.onfocus = () => {
        play();
      };
      replaceAccessories(selectedAccessories);
      window.onmessage = (e: MessageEvent) => {
        cameraMessageHandler(e, config);
      };
    }

    iframe.src = encodeURI(targetUri);
  }

  // Safari doesn't reload the page when navigating to it and its in the bfcache, so instead
  // we explicitly reload the page to force the camera to be reactivated.
  try {
    window.onmessage = null;
    showLoader();
    const config = await getConfig(configUri);
    main(config);
  } catch (e) {
    console.error(e);
    hideLoader();
  }
}

function play(): void {
  const iframe: any = document.getElementById("vyking-sneaker-window");

  iframe.contentWindow.postMessage(
    {
      type: "VYKING_SNEAKER_WINDOW_PLAY",
    },
    targetOrigin
  );
}

function pause(): void {
  const iframe: any = document.getElementById("vyking-sneaker-window");

  iframe.contentWindow.postMessage(
    {
      type: "VYKING_SNEAKER_WINDOW_PAUSE",
    },
    targetOrigin
  );
}

export { initializeVykingAR, play, pause };
