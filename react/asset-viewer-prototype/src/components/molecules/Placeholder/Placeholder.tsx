import React from "react";
import PointAtYourFeetImage from "../../../shared/images/point_at_your_feet.png";
import LoadingRotator from "../../../shared/images/loading.gif";
import { FeetPlaceholder } from "./Components";
export const Placeholder = ({
  feetDetected,
  isLoading,
}: {
  feetDetected?: boolean;
  isLoading?: boolean;
}): JSX.Element => {
  return (
    <FeetPlaceholder>
      {!feetDetected && !isLoading && (
        <img
          className="place-feet"
          src={PointAtYourFeetImage}
          alt="place your feet in the camera"
        />
      )}
      {isLoading && (
        <img className="is-loading" src={LoadingRotator} alt="Loading" />
      )}
    </FeetPlaceholder>
  );
};
