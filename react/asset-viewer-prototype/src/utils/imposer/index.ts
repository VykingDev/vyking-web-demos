import { createCanvas } from "canvas";

interface Props {
  baseImageBlob: Blob;
  overlayImageBlob: Blob;
  dimensions: {
    width: number;
    height: number;
  };

  callback: (param: string) => void;
}

export const imposeWatermarkOnImage = ({
  baseImageBlob,
  overlayImageBlob,
  dimensions: { width, height },
  callback,
}: Props): string | undefined => {
  const canvas = createCanvas(width, height, "svg");
  const canvasContext = canvas.getContext("2d");

  if (!canvasContext) {
    return "";
  }

  const baseImage = new Image();
  baseImage.src = URL.createObjectURL(baseImageBlob);

  baseImage.onload = () => {
    canvasContext.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    const rawImage = new Image();
    rawImage.src = URL.createObjectURL(overlayImageBlob);

    rawImage.onload = () => {
      canvasContext.drawImage(
        rawImage,
        canvas.width - 210,
        canvas.height - 100,
        200,
        90
      );

      return callback(canvas.toDataURL("image/png"));
    };
  };
};
