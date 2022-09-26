import React from "react";
import "@google/model-viewer/dist/model-viewer";
import { ShoeContext } from "../../../context/ShoeContext";
import { isLeftFoot } from "../../../utils/footCheck";

export const ModelViewer = (): JSX.Element => {
  const [modelUrl, setModelUrl] = React.useState<string>("");
  const { currentShoe } = React.useContext(ShoeContext);

  React.useEffect(() => {
    const fetchOffsets = async () => {
      const isALeftFoot = await isLeftFoot({ url: currentShoe.assets_url });

      if (isALeftFoot) {
        setModelUrl(currentShoe.model_url);
      } else {
        setModelUrl(currentShoe.model_url.replace("model_l", "model_r"));
      }
    };

    fetchOffsets();
  }, [currentShoe]);

  return (
    <div
      style={{ borderLeft: "4px solid white", borderRight: "4px solid white" }}
    >
      <model-viewer
        src={modelUrl}
        style={{ width: "100%", height: "200px" }}
        alt="Sneaker"
        camera-controls
        auto-
      />
    </div>
  );
};
