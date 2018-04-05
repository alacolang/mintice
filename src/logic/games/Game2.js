// @flow
import React from "react";
import Game1 from "./game1";
import Triangle from "../../Components/Shapes/Triangle";

const Game2 = {
  ...Game1,
  id: 2,
  blockToRun: 1,
  items: [
    {id: 1, render: () => <Triangle color="yellow" />},
    {id: 2, render: () => <Triangle color="green" />}
  ]
};

export default Game2;
