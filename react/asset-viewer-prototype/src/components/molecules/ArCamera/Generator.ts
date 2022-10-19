import { imposeWatermarkOnImage } from "../../../utils/imposer";
import VykingLogo from "../../../shared/images/vyking-logo.png";
import { PhotoData } from "../../../context/interfaces";

export const GenerateShoeImage = async ({
  shoePhoto,
}: {
  shoePhoto?: PhotoData;
}) => {
  if (!shoePhoto) {
    return;
  }

  const baseImageBlob = await fetch(shoePhoto.dataURL).then((res) =>
    res.blob()
  );

  const overlayImageBlob = await fetch(VykingLogo).then((res) => res.blob());

  imposeWatermarkOnImage({
    baseImageBlob,
    overlayImageBlob,
    dimensions: {
      width: shoePhoto.width,
      height: shoePhoto.height,
    },
    callback: async (canvasString: string) => {
      if (!canvasString) {
        return;
      }

      const canvasBlob = await fetch(canvasString).then((res) => res.blob());

      const customImageFile = new File([canvasBlob], "sneakers.jpg", {
        type: "image/jpeg ",
      });

      if (
        navigator.share &&
        navigator.canShare({
          files: [customImageFile],
        })
      ) {
        navigator
          .share({
            files: [customImageFile],
          })
          .then((res) => console.log(res));
      } else {
        const documentLink = document.createElement("a");

        documentLink.download = "my_sneakers.jpg";
        documentLink.addEventListener("click", (e) => {
          setTimeout(() => URL.revokeObjectURL(documentLink.href), 30 * 1000);
        });
        documentLink.href = URL.createObjectURL(canvasBlob);

        documentLink.click();
      }
    },
  });
};
