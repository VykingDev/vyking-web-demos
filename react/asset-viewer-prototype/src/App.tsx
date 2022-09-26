import React from "react";

import { ShoeContextProvider } from "./context/ShoeContext";

import { RouteComponent as Routes } from "./Routes";

function App() {
  return (
    <ShoeContextProvider>
      <Routes />
    </ShoeContextProvider>
  );
}

export default App;
