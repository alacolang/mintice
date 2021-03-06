// @flow
import React from "react";
import Game1 from "./Game1";
import type {IGame} from "./Game";
import Container from "../../Components/Shapes/Container";
import Triangle from "../../Components/Shapes/Triangle";

const Game: IGame = {
  ...Game1,
  id: "2",
  blockToRun: 1,
  items: [
    {
      id: 1,
      Component: () => (
        <Container>
          <Triangle color="#5D719E" />
        </Container>
      )
    },
    {
      id: 2,
      Component: () => (
        <Container>
          <Triangle color="#62B570" />
        </Container>
      )
    }
  ]
};

export default Game;
