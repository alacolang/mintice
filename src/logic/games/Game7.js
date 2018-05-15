// @flow
import React from "react";
import Game1 from "./Game1";
import type {IGame} from "./Game";
import Heart from "../../Components/Shapes/Heart";
import Container from "../../Components/Shapes/Container";

const Game: IGame = {
  ...Game1,
  id: "7",
  blockToRun: 1,
  items: [
    {
      id: 1,
      Component: () => (
        <Container>
          <Heart color="#98E0D2" />
        </Container>
      )
    },
    {
      id: 2,
      Component: () => (
        <Container>
          <Heart color="#FFCDAD" />
        </Container>
      )
    }
  ]
};

export default Game;
