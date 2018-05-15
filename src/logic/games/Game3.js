// @flow
import React from "react";
import Game1 from "./Game1";
import type {IGame} from "./Game";
import Triangle from "../../Components/Shapes/Triangle";
import Circle from "../../Components/Shapes/Circle";
import Container from "../../Components/Shapes/Container";

const Game: IGame = {
  ...Game1,
  id: "3",
  blockToRun: 1,
  items: [
    {
      id: 1,
      Component: () => (
        <Container>
          <Circle color="#FFE2A8" />
        </Container>
      )
    },
    {
      id: 2,
      Component: () => (
        <Container>
          <Triangle color="#A1AECB" />
        </Container>
      )
    }
  ]
};

export default Game;
