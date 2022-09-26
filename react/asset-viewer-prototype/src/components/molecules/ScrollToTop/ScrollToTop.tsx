import React from "react";
import { useLocation } from "react-router";

export const ScrollToTop = ({ ...props }) => {
  const location = useLocation();

  React.useEffect(() => {
    document.getElementById("root")?.scrollTo(-10, 0);
  }, [location]);

  return <>{props.children}</>;
};
