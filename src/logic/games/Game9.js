// @flow
import React from "react";
import Game1 from "./Game1";
import type {IGame} from "./Game";
import Square from "../../Components/Shapes/Square";
import Container from "../../Components/Shapes/Container";

const Game: IGame = {
  ...Game1,
  id: "9",
  blockToRun: 1,
  items: [
    {
      id: 1,
      Component: () => (
        <Container>
          <Square color="#2E6AF3" />
        </Container>
      )
    },
    {
      id: 2,
      Component: () => (
        <Container>
          <Square color="#B4EF91" />
        </Container>
      )
    }
  ]
};

export default Game;
