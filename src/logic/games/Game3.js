// @flow
import React from "react";
import Game1 from "./Game1";
import type {IGame} from "./Game";
import Triangle from "../../Components/Shapes/Triangle";
import Circle from "../../Components/Shapes/Circle";

const Game3: IGame = {
  ...Game1,
  id: "3",
  blockToRun: 3,
  items: [
    {id: 1, Component: () => <Circle color="green" />},
    {id: 2, Component: () => <Triangle color="blue" />}
  ]
};

export default Game3;
