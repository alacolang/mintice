// @flow
import React from "react";
import Game1 from "./Game1";
import type { IGame } from "./Game";
import Heart from "../../Components/Shapes/Heart";
import Circle from "../../Components/Shapes/Circle";
import Container from "../../Components/Shapes/Container";

const Game: IGame = {
  ...Game1,
  id: "6",
  blockToRun: 1,
  items: [
    {
      id: 1,
      Component: () => (
        <Container>
          <Circle color="#718674" />
        </Container>
      )
    },
    {
      id: 2,
      Component: () => (
        <Container>
          <Heart color="#806A69" />
        </Container>
      )
    }
  ]
};

export default Game;
