// @flow
import React from "react";
import Game1 from "./Game1";
import type {IGame} from "./Game";
import Triangle from "../../Components/Shapes/Triangle";

const Game2: IGame = {
  ...Game1,
  id: "2",
  blockToRun: 2,
  items: [
    {id: 1, Component: () => <Triangle color="green" />},
    {id: 2, Component: () => <Triangle color="blue" />}
  ]
};

export default Game2;
