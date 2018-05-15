// @flow
import React from "react";
import Game1 from "./Game1";
import type {IGame} from "./Game";
import RectangleH from "../../Components/Shapes/RectangleH";
import Container from "../../Components/Shapes/Container";

const Game: IGame = {
  ...Game1,
  id: "8",
  blockToRun: 1,
  items: [
    {
      id: 1,
      Component: () => (
        <Container>
          <RectangleH color="#204976" />
        </Container>
      )
    },
    {
      id: 2,
      Component: () => (
        <Container>
          <RectangleH color="#6C2732" />
        </Container>
      )
    }
  ]
};

export default Game;
