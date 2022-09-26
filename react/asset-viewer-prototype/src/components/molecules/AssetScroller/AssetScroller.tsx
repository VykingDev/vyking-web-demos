import * as React from "react";
import { elementScrollIntoViewPolyfill } from "seamless-scroll-polyfill";
import { scrollIntoView } from "seamless-scroll-polyfill";
import { ShoeContext } from "../../../context/ShoeContext";
import { AssetCard } from "..";
import { Container } from "./Components";

export const AssetScroller = (): JSX.Element => {
  elementScrollIntoViewPolyfill();

  const { shoes, currentShoe } = React.useContext(ShoeContext);

  React.useEffect(() => {
    const shoeIcon = document.getElementById(`asset-${currentShoe.id}`);

    if (shoeIcon) {
      scrollIntoView(shoeIcon, {
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentShoe]);

  return (
    <Container>
      {shoes.map((shoe, index) => {
        return <AssetCard key={index} shoe={shoe} id={`asset-${shoe.id}`} />;
      })}
    </Container>
  );
};
