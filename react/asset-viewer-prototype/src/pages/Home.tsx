import React from "react";
import {
  AssetScroller,
  Header,
  ModelViewer,
  ScrollToTop,
  ShoeInfo,
} from "../components";
import { Desktop } from "../screens";

const MEDIUM_SCREEN_BREAKPOINT = 900;

export const Home = () => {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(
    window.innerWidth > MEDIUM_SCREEN_BREAKPOINT
  );

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setIsDesktop(window.innerWidth > MEDIUM_SCREEN_BREAKPOINT);
    });
  }, [isDesktop]);

  if (isDesktop) {
    return <Desktop />;
  }

  return (
    <React.Fragment>
      <div style={{ height: "100vh", width: "100vw", overflowX: "scroll" }}>
        <ScrollToTop />
        <Header />
        <ModelViewer />
        <ShoeInfo />
        <AssetScroller />
      </div>
    </React.Fragment>
  );
};
