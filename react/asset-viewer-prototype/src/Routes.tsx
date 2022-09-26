import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArCamera } from "./components";
import { Home } from "./pages/Home";

export const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/vyking-web-demo"} element={<Home />} />
        <Route
          path={`/vyking-web-demo/camera`}
          element={<ArCamera options={{ cameraIframe: true }} />}
        />
       <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
