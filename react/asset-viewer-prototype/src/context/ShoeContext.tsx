import React from "react";
import { STARTING_SHOE_INDEX } from "../utils/constants";
import { shoes } from "./data";
import { PhotoData, Shoe } from "./interfaces";

const initialState = (): {
  shoes: Shoe[];
  currentShoe: Shoe;
  setCurrentShoe: React.Dispatch<React.SetStateAction<Shoe>>;
  shoePhoto?: PhotoData;
  setShoePhoto: React.Dispatch<React.SetStateAction<PhotoData | undefined>>;
} => ({
  shoes,
  currentShoe: shoes[STARTING_SHOE_INDEX],
  setCurrentShoe: () => {},
  shoePhoto: undefined,
  setShoePhoto: () => {},
});

export const ShoeContext = React.createContext<{
  shoes: Shoe[];
  currentShoe: Shoe;
  setCurrentShoe: React.Dispatch<React.SetStateAction<Shoe>>;
  shoePhoto?: PhotoData;
  setShoePhoto: React.Dispatch<React.SetStateAction<PhotoData | undefined>>;
}>(initialState());

interface ProviderProps {
  children: React.ReactNode;
}

export const ShoeContextProvider = (props: ProviderProps): JSX.Element => {
  const [currentShoe, setCurrentShoe] = React.useState<Shoe>(
    shoes[STARTING_SHOE_INDEX]
  );
  const [shoePhoto, setShoePhoto] = React.useState<PhotoData | undefined>(
    undefined
  );

  return (
    <ShoeContext.Provider
      value={{ shoes, currentShoe, setCurrentShoe, shoePhoto, setShoePhoto }}
    >
      {props.children}
    </ShoeContext.Provider>
  );
};
