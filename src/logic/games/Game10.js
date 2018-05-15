// @flow
import React from "react";
import Game1 from "./Game1";
import type {IGame} from "./Game";
import RectangleV from "../../Components/Shapes/RectangleV";
import Triangle from "../../Components/Shapes/Triangle";
import Container from "../../Components/Shapes/Container";

const Game: IGame = {
  ...Game1,
  id: "10",
  blockToRun: 1,
  items: [
    {
      id: 1,
      Component: () => (
        <Container>
          <RectangleV color="#78D7D0" />
        </Container>
      )
    },
    {
      id: 2,
      Component: () => (
        <Container>
          <Triangle color="#F16586" />
        </Container>
      )
    }
  ]
};

export default Game;
