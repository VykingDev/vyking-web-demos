import { useEffect, useState } from "react";
import "./App.css";
import VykingSneakerWindow from "./components/VykingSneakerWindow";

function App() {
  const [vykingConfig, setVykingConfig] = useState(null);

  const targetOrigin = "https://d1ux9mupljc68q.cloudfront.net";
  const targetPath = "/1/index.html";

  useEffect(() => {
    async function loadVykingConfig() {
      try {
        const config = await window.loadVykingConfig;
        setVykingConfig(config);
      } catch (err) {
        alert(err);
      }
    }

    loadVykingConfig();
  }, []);

  return (
    <div className="App">
      {vykingConfig && (
        <VykingSneakerWindow
          config={vykingConfig}
          targetOrigin={targetOrigin}
          targetPath={targetPath}
        />
      )}
    </div>
  );
}

export default App;
