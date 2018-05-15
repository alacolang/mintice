// @flow
import React from "react";
import Game1 from "./Game1";
import type { IGame } from "./Game";
import RectangleH from "../../Components/Shapes/RectangleH";
import Square from "../../Components/Shapes/Square";
import Container from "../../Components/Shapes/Container";

const Game: IGame = {
  ...Game1,
  id: "5",
  blockToRun: 1,
  items: [
    {
      id: 1,
      Component: () => (
        <Container>
          <Square color="#8E9AB4" />
        </Container>
      )
    },
    {
      id: 2,
      Component: () => (
        <Container>
          <RectangleH color="#FFC34C" />
        </Container>
      )
    }
  ]
};

export default Game;
