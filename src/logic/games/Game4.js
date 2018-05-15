// @flow
import React from "react";
import Game1 from "./Game1";
import type {IGame} from "./Game";
import RectangleV from "../../Components/Shapes/RectangleV";
import RectangleH from "../../Components/Shapes/RectangleH";
import Container from "../../Components/Shapes/Container";

const Game: IGame = {
  ...Game1,
  id: "4",
  blockToRun: 1,
  items: [
    {
      id: 1,
      Component: () => (
        <Container>
          <RectangleV color='#CAF4F0' />
        </Container>
      )
    },
    {
      id: 2,
      Component: () => (
        <Container>
          <RectangleH color='#FC989F' />
        </Container>
      )
    }
  ]
};

export default Game;
