import { useState } from "react";
import "./CameraActions.css";

function CameraActions({ onReplaceAccessories, onPlay, onPause, isReady }) {
  const [accessoryUrl, setAccessoryUrl] = useState(
    "https://vykingsneakerkitnative.s3.amazonaws.com/SneakerStudio/may_android_ios/coach_citysole/offsets.json"
  );

  return (
    <div className="flex flex-col camera-actions">
      <div className="flex flex-row">
        <input
          type="text"
          className="w-full mr-2"
          value={accessoryUrl}
          onChange={(e) => setAccessoryUrl(e.target.value)}
        />
        <button
          onClick={() => onReplaceAccessories(accessoryUrl)}
          disabled={!isReady}
        >
          Change shoes
        </button>
      </div>
      <div className="flex flex-row mt-4 items-center justify-center w-full">
        <button className="mr-2" onClick={onPlay} disabled={!isReady}>
          Play
        </button>
        <button onClick={onPause} disabled={!isReady}>
          Pause
        </button>
      </div>
    </div>
  );
}

export default CameraActions;
